
import { EmailTemplates, OutgoingSingleMessagePayload } from "../messaging-dependency.interface";
import { ElasticEmailDependency } from "./dependencies";

export async function shootEmailViaDependency( payload: OutgoingSingleMessagePayload ) {
	try {
		const thirdPartyDependency = new ElasticEmailDependency( payload.apiKey );
		payload.templateId = payload.templateId ?? EmailTemplates.Default;
		await thirdPartyDependency.sendSingleMessage( payload );
	} catch ( e ) {
		console.log( e );
	}
}