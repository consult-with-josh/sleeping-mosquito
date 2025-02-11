import { throwScalexError, KycApi, SmileIdApi, KycProviderAuthTypes, ScalexLinks, notifyClientOfSuccess } from "@scalex-api/api-resources";
import { InitiateKycDto, InitiateKycResource, IUser, KycProvider } from "@scalex-api/sdk";

type InitiateKycArgs = {
	payload: InitiateKycDto;
	user: Partial<IUser>;
	kycProviderCreds: KycProviderAuthTypes;
	links: ScalexLinks;
}

export async function initiateKyc( args: InitiateKycArgs ): Promise<typeof InitiateKycResource.response> {
	try {
		const kycProviderMap: Record<KycProvider, KycApi> = {
			[ KycProvider.smileIdentity ]: new SmileIdApi( args.kycProviderCreds.smileIdentity, args.links )
		};

		const activeKycProvider = KycProvider.smileIdentity;
		const kycApi = kycProviderMap[ activeKycProvider ];
		return notifyClientOfSuccess( {
			data: {
				fields: await kycApi.startApplication( args.payload.doc, args.user )
			}
		} );
	} catch ( e ) {
		throwScalexError( e );
	}
}