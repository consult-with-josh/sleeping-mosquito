import { model, Model, Schema, SchemaDefinition } from "mongoose";
import { createSchema } from "./create-schema.function";
import { ScxCollection } from "./model-defaults.constants";

export function createModel<T, Methods = unknown>(
	definition: SchemaDefinition<T>,
	collectionName: ScxCollection,
	methods = undefined
): {
    model: Model<T, unknown, Methods>;
    schema: Schema<T>
} {
	const sch = createSchema( definition, methods );
	return {
		model: model<T, Model<T, unknown, Methods>>( collectionName, sch ),
		schema: sch
	};
}

export function createModelFromSchema<T, Methods = unknown>(
	sch: Schema<T>,
	collectionName: ScxCollection,
): {
    model: Model<T, unknown, Methods>;
    schema: Schema<T>
} {
	return {
		model: model<T, Model<T, unknown, Methods>>( collectionName, sch ),
		schema: sch
	};
}
