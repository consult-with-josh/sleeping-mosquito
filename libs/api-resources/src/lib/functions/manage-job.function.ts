import { IJob, JobStatus, JobTask } from "@scalex-api/sdk";
import { Job } from "../models";
import { GenericErrors } from "../constants";

export async function createJob( payload: Partial<IJob> ) {
	const unfinishedJob = await Job.model.findOne( {
		'client.id': payload.client.id,
		'client.type': payload.client.type,
		task: payload.task,
		status: { $nin: [JobStatus.completed, JobStatus.failed] }
	} );

	if ( unfinishedJob ) {
		throw GenericErrors.unfinishedJob( payload.task );
	}
	return Job.model.create( payload );
}

export async function getJob( id: string ) {
	const job = await Job.model.findById( id );
	if ( !job ) {
		throw GenericErrors.resourceNotFound( 'Job' );
	}
	return job;
}

export async function updateJob( id: string, payload: Partial<IJob> ) {
	const job = await Job.model.findById( id );
	if ( !job ) {
		throw GenericErrors.resourceNotFound( 'Job' );
	}
	await job.updateOne( payload );
	return job;
}

export async function findJobsByStatus( tasks: Array<JobTask>, statuses: Array<JobStatus> ) {
	return Job.model.find( {
		task: { $in: tasks },
		status: { $in: statuses }
	} );
}