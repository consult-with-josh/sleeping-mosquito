import { AppEnvironments, AppNames, getAppPort, KycProviderAuthTypes, OauthCreds } from "@scalex-api/api-resources";
import { env } from "process";

const redis: {
	password: string;
	socket: {
		host: string;
		port: number;
	};
} = {
	password: env.REDIS_PASSWORD,
	socket: {
		host: env.REDIS_HOST,
		port: Number( env.REDIS_PORT ),
	},
};

export const providerSecrets = {
	paystack: env.PAYSTACK_SECRET,
};

export const kycProviderCreds: KycProviderAuthTypes = {
	smileIdentity: {
		partnerId: process.env.SMILE_PARTNER_ID,
		apiKey: process.env.SMILE_API_KEY,
		server: process.env.SMILE_SID_SERVER,
		webhook: process.env.SMILE_ID_WEBHOOK
	}
};

export const configs = {
	port: getAppPort( env.NODE_ENV as AppEnvironments, AppNames.id ),
	env: env.NODE_ENV as AppEnvironments,
	dbUrl: env.MONGO_URL,
	pusher: {
		key: env.PUSHER_APP_KEY,
		cluster: env.PUSHER_APP_CLUSTER,
		secret: env.PUSHER_SECRET,
		appId: env.PUSHER_APP_ID,
		encryptionMasterKeyBase64: env.PUSHER_ENCRYPTION_KEY,
	},
	slackChannel: env.SLACK_NOTIFICATION_CHANNEL,
	redis,
	sentryDsn: env.SENTRY_DSN,
};

export const oauthConfig: OauthCreds = {
	google: {
		clientId: env.GOOGLE_CLIENT_ID,
		clientSecret: env.GOOGLE_CLIENT_SECRET,
		redirectUri: env.GOOGLE_REDIRECT_URI,
	},
};

export const secrets = {
	jwt: env.JWT_SECRET,
	elasticEmail: env.ELASTIC_EMAIL_API_KEY,
	adminAuthToken: env.ADMIN_AUTH_TOKEN,
	slack: env.SLACK_AUTH_TOKEN
};
