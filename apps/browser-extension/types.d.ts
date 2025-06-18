export type Alias = {
	id: number;
	alias: string;
	forwardingAddress: string;
	emailsReceived: number;
	enabled: boolean;
	createdAt: string;
	domain: Domain;
};

export type Domain = {
	id: number;
	fqdn: string;
	verificationState: VerificationState;
	ownerId: string;
	isGlobal: boolean;
	createdAt: Date;
};

export type VerificationState = "unverified" | "verified";
