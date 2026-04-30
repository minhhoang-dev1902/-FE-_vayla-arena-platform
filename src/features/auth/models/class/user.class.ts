export class UserClass {
	id: string;
	userIdentity: string;
	email: string;
	displayName: string;
	avatarUrl: string | null;
	role: string;
	status: string;
	walletAddress: string;
	walletStatus: string;
	emailVerified: boolean;
	vaylaBalance: string;
	authSource: string;
	isNewUser: boolean;
	createdAt: string;

	constructor(params: Partial<UserClass>) {
		this.id = params.id ?? "";
		this.userIdentity = params.userIdentity ?? "";
		this.email = params.email ?? "";
		this.displayName = params.displayName ?? "";
		this.avatarUrl = params.avatarUrl ?? null;
		this.role = params.role ?? "";
		this.status = params.status ?? "";
		this.walletAddress = params.walletAddress ?? "";
		this.walletStatus = params.walletStatus ?? "";
		this.emailVerified = params.emailVerified ?? false;
		this.vaylaBalance = params.vaylaBalance ?? "";
		this.authSource = params.authSource ?? "";
		this.isNewUser = params.isNewUser ?? false;
		this.createdAt = params.createdAt ?? "";
	}
}

export class LoginResponseClass {
	success: boolean;
	data: {
		user: UserClass;
		accessToken: string;
		refreshToken: string;
	} = {
		user: new UserClass({}),
		accessToken: "",
		refreshToken: "",
	};

	constructor(data: Partial<LoginResponseClass>) {
		this.success = data.success ?? false;
		const { user, accessToken, refreshToken } = data.data ?? {};
		this.data = data.data ?? {
			user: user ? new UserClass(user) : new UserClass({}),
			accessToken: accessToken ?? "",
			refreshToken: refreshToken ?? "",
		};
	}
}
