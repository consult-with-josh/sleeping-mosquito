import { EmailsApi, Configuration, EmailTransactionalMessageData } from '@elasticemail/elasticemail-client-ts-axios';
import { EmailTemplates, MessagingDependency, OutgoingSingleMessagePayload } from "../../../messaging-dependency.interface";
import { Org } from '../../../../../constants';

export class ElasticEmailDependency implements MessagingDependency {
	sender = {
		email: Org.emails.promotions,
		name: Org.publicName
	};

	emailApi: EmailsApi;
	constructor( private apiKey: string ) {
		const config = new Configuration( { apiKey: this.apiKey } );
		this.emailApi = new EmailsApi( config );
	}

	async sendSingleMessage( payload: OutgoingSingleMessagePayload ) {
		const emailPayload: EmailTransactionalMessageData = {
			Recipients: {
				To: [payload.recipient],
			},
			Content: {
				TemplateName: payload.templateId ?? EmailTemplates.Default,
				Merge: payload.templateData,
				From: `${this.sender.name}<${this.sender.email}>`,
				Subject: payload.subject
			},
		};
		await this.emailApi.emailsTransactionalPost( emailPayload ).catch( e => console.log( e.response.data ) );
	};
}