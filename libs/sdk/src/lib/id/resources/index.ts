import { ScxEndpoints } from '../../generic';
import { AuthEndpoints, AuthResourceKeys } from './auth.resources';
import { KycEndpoints, KycResourceKeys } from './kyc-stage.resources';

export * from './paths.config';
export * from './auth.resources';
export * from './kyc-stage.resources';
export * from './kyc.resources';

export const IdEndpoints: ScxEndpoints<
AuthResourceKeys & KycResourceKeys
> = {
	...AuthEndpoints,
	...KycEndpoints
};
