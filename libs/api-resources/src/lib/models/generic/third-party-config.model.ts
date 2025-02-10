import { ActiveOrInactive, IThirdPartyConfig, KycProvider, ThirdPartyService } from "@scalex-api/sdk";
import { SchemaDefinition } from "mongoose";
import { RequiredEnum, ScxCollection } from "../../constants";
import { createModel } from "../../functions";

export const thirdParyConfigSchemaDef: SchemaDefinition<IThirdPartyConfig> = {
	service: RequiredEnum( ThirdPartyService ),
	provider: RequiredEnum( KycProvider ),
	subServices: [ String ],
	forceSubServiceUsage: Boolean,
	status: RequiredEnum( ActiveOrInactive )
};

export const ThirdPartyConfig = createModel<IThirdPartyConfig>(
	thirdParyConfigSchemaDef,
	ScxCollection.thirdParyConfig
);
