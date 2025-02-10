export enum AppNames {
	id = 'id',
	ramp = 'ramp',
	pool = 'pool',
	mobile = 'mobile',
	gateway = 'gateway',
	utils = 'utils',
	transaction = 'transaction',
}

export const Org = {
	publicName: 'Scalex Africa',
	legalName: 'Scalex Technologies',
	slug: 'scalexAfrica',
	logo: 'https://res.cloudinary.com/https-scalex-africa/image/upload/v1697120802/Extras/dashboard-logo.cca6d925_u4bpbb.svg',
	alias: 'scalex',
	nubans: {
		virtualName: 'James Babatunde',
		virtualEmail: 'jamesbabatunde@gmail.com',
		defaultDetails: {
			dob: "2000-05-13",
			gender: "M",
			title: "Mr",
			address_line_1: "23, Okon street, Ikeja",
			address_line_2: "Ikeja",
			city: "Mushin",
			state: "Lagos State",
			country: "Nigeria"
		}
	},
	socket:{
		apiKey: 'some-random-key-here-for-nw'
	},
	bankAccounts:[
		{
			bankName: 'Providus Bank',
			bankCode: '000023',
			accountNumber: '9995473712',
			accountName: 'PAYAZA(Scalex Africa)'
		}
	],
	phones: {
		default: '07018181202',
	},
	emails: {
		domain: 'mail.scalex.africa',
		default: 'info@scalex.africa',
		support: 'support@scalex.africa',
		postmaster: 'postmaster@mail.scalex.africa',
		promotions: 'sule@mailer.scalex.africa'
	}
};

export enum AppEnvironments {
	local = 'local',
	development = 'development',
	production = 'production',
	staging = 'staging'
}

const ports: {
	[key in AppNames]: number
} = {
	id: 9000,
	mobile: 9400,
	pool: 9500,
	ramp: 9600,
	gateway: 9700,
	utils: 9800,
	transaction: 9900,
};

export const getAppPort = ( environment: AppEnvironments, appName: AppNames ) => {
	if ( environment === AppEnvironments.production ) return 80;
	return ports[appName];
};
