// interfaces/auth-service.interface.ts
type socialUser = {
	uid: string;
	name: string;
	email: string;
};

export interface IAuthService {
	signIn(email: string, password: string): Promise<string>; // returns userId

	signUp(email: string, password: string): Promise<{ email: string; uid: string }>;

	socialSignIn(id: string): Promise<socialUser>;

	forgotPassword(email: string): Promise<boolean>;
}
