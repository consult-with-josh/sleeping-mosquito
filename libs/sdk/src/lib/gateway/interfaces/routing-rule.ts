import { UserRole } from "../../id";

export interface IRoutingRule {
  requiresAuth: boolean;
  userType: Array<UserRole>;
  // kyc?: string;
  rejectIfServiceDenied?: boolean;
}

export interface IRouteConfig {
  [path: string]: IRoutingRule;
}

export const msRoutes = {
	id: {
		genericPath: '/id/*',
		basePath: '/id'
	},
	utils: {
		genericPath: '/utils/*',
		basePath: '/utils'
	},
	ramp: {
		genericPath: '/ramp/*',
		basePath: '/ramp'
	},
	transactions: {
		genericPath: '/transactions/*',
		basePath: '/transactions'
	}
};

export const utilRoutes = {
	webhooks: {
		genericPath: '/webhooks/:provider',
		basePath: '/webhooks'
	}
};
