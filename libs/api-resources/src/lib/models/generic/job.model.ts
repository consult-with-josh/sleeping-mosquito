import { IJob, JobChanges, JobClientType, JobStatus, JobTask } from "@scalex-api/sdk";
import { RequiredEnum, RequiredString, RequiredStringWithDefault, ScxCollection } from "../../constants";
import { SchemaDefinition } from "mongoose";
import { createModelFromSchema, createSchema } from "../../functions";

const jobSchemaDef: SchemaDefinition<IJob> = {
	status: RequiredStringWithDefault( JobStatus.initiated, { enum: JobStatus } ),
	client: {
		type: RequiredStringWithDefault( JobClientType.user, { enum: JobClientType } ),
		id: String
	},
	reports: [ String ],
	description: RequiredString,
	task: RequiredEnum( JobTask ),
	metadata: Object
};

export const JobSchema = createSchema( jobSchemaDef );

JobSchema.pre( 'save', function( next ) {
	const changes: JobChanges = {};
	const oldValues: Partial<IJob> = this.isNew ? {} : this.toObject( { getters: true, virtuals: false } );

	if ( !this.isNew ) {
		const modifiedPaths = this.modifiedPaths();
		modifiedPaths.forEach( path => {
			if ( path !== 'events' )
				changes[path] = {
					oldValue: oldValues[path],
					newValue: this.get( path )
				};
		} );

		this.events.push( {
			timestamp: new Date(),
			action: modifiedPaths.includes( 'status' )
				? `Status changed from ${oldValues.status} to ${this.get( 'status' )}`
				: 'Document updated',
			changes
		} );
	} else {
		this.events.push( {
			timestamp: new Date(),
			action: 'Job was created',
			changes: {}
		} );
	}
	next();
} );

JobSchema.pre( 'updateOne', async function ( next ) {
	const update = this.getUpdate();
	const job = await this.model.findOne( this.getQuery() );

	if ( job ) {
		const oldValues = job.toObject( { getters: true, virtuals: false } );
		const changes: JobChanges = {};

		Object.keys( update ).forEach( ( key ) => {
			if ( key !== 'events' && update[key] !== oldValues[key] ) {
				changes[key] = {
					oldValue: oldValues[key],
					newValue: update[key]
				};
			}
		} );

		if ( Object.keys( changes ).length > 0 ) {
			await this.model.updateOne( this.getQuery(), {
				$push: {
					events: {
						timestamp: new Date(),
						action: 'Job was updated',
						changes
					}
				}
			} );
		}
	}

	next();
} );

export const Job = createModelFromSchema( JobSchema, ScxCollection.job );