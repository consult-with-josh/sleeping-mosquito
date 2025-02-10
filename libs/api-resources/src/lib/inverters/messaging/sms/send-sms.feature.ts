import { OutgoingSingleMessagePayload } from "../messaging-dependency.interface";
import { SendchampDependency } from "./dependencies";

export function sendSms( payload: OutgoingSingleMessagePayload ) {
	const thirdPartyDependency = new SendchampDependency( payload.apiKey );
	thirdPartyDependency.sendSingleMessage( payload );
}