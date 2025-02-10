import { IEvmAddressPathIndex } from "../../../../interfaces";
import { SchemaDefinition } from "mongoose";
import { RequiredString, ScxCollection } from "../../../../constants";
import { createModel } from "../../../../functions";



export const EvmAddressPathIndexchemaDef: SchemaDefinition<IEvmAddressPathIndex> = {
	network: RequiredString,
	index: RequiredString,
};

export const EvmAddressPath = createModel<IEvmAddressPathIndex>(
	EvmAddressPathIndexchemaDef,
	ScxCollection.evmAddressPathIndex
);
