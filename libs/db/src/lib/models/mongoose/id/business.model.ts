import { IBusiness, IntegrationStatus } from '@scalex-africa/types';
import { ScxCollection, RequiredString, createModel, RequiredStringWithDefault } from '../functions';
import { SchemaDefinition } from 'mongoose';

const businessSchemaDef: SchemaDefinition<IBusiness> = {
	name: RequiredString,
	tagline: String,
	address: String,
	email: RequiredString,
	status: RequiredStringWithDefault( IntegrationStatus.active, { enum: IntegrationStatus } ),
};

export const Business = createModel<IBusiness>( businessSchemaDef, ScxCollection.business );
