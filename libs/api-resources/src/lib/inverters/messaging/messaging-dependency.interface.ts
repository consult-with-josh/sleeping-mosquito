import { OtpContext } from "@scalex-api/sdk";

export enum MessagingChannel {
	sms = 'sms',
	whatsApp = 'whatsapp',
	email = 'email'
}

export type GenericEmailTemplateData = {
	title: string;
	content: string;
	cta: string
}

export interface OutgoingEmailPayload {
    to: string;
	template: EmailTemplates;
	subject?: string;
    data: Record<string, string>;
}

export interface OutgoingSingleMessagePayload {
	recipient: string;
	message?: string;
	meta?: {
		customerId: string;
	};
	apiKey: string;
	templateData?:Record<string, string>;
	subject?: string;
	templateDesign?: string;
    templateId?: string;
	channel?: MessagingChannel,
	context?: OtpContext,
}

export interface EmailPayload<T = Record<string, string>> {
	destination: string,
	template?: EmailTemplates,
	data: T
}

export enum EmailTemplates {
    Default = 'Default',
    Welcome = 'Welcome Email',
	Otp = 'OTP'
}

export interface MessagingDependency {
    sendSingleMessage: (
		payload: OutgoingSingleMessagePayload
	) => void | Promise<void>;
}