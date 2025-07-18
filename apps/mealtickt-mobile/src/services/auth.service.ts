// services/FirebaseAuthService.ts
import { auth } from '../config/firebase.config';
import { IAuthService } from './interfaces/auth-service.interface.ts';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signInWithCredential,
	sendPasswordResetEmail,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AppleAuthProvider, GoogleAuthProvider } from '@react-native-firebase/auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useUserServiceAdapter } from './user.service.ts';

GoogleSignin.configure({
	webClientId: '948382471750-3e4o3v053724vb7rlsbgj6e5183r37uq.apps.googleusercontent.com',
});

export class AuthServices implements IAuthService {
	private userService: any;

	constructor(userService: any) {
		this.userService = userService;
	}
	async signIn(email: string, password: string): Promise<string> {
		let userInfo;
		const res = await signInWithEmailAndPassword(auth, email, password);
		if (res.user.uid) {
			const doc = await this.userService.getUserData(res.user.uid);
			if (doc.exists()) {
				if (doc.data()?.uid) {
					userInfo = {
						...doc.data(),
						uid: res.user.uid,
						email: email,
					};
				} else {
					userInfo = {
						...doc.data(),
						uid: res.user.uid,
						email: res.user.email,
					};
					this.userService.updateUserData(res.user.uid, {
						uid: res.user.uid,
						email: email,
					});
				}
			} else {
				userInfo = {
					uid: res.user.uid,
					email: email,
				};
				await this.userService.storeUserData(res.user.uid, {
					uid: res.user.uid,
					email: email,
				});
			}
		}
		return userInfo;
	}

	async signUp(email: string, password: string): Promise<{ uid: string; email: string }> {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		await this.userService.storeUserData(res.user.uid, {
			uid: res.user.uid,
			email: email,
		});
		return { uid: res.user.uid, email };
	}

	async socialSignIn(id: string): Promise<{ uid: string; name: string; email: string }> {
		let credential;
		let profilePic;
		if (id === 'google') {
			const cred = await GoogleSignin.signIn();
			profilePic = cred.data?.user?.photo;
			if (cred.data) {
				credential = GoogleAuthProvider.credential(cred.data.idToken);
			}
		} else {
			const cred = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});
			if (cred.identityToken) {
				credential = AppleAuthProvider.credential(cred.identityToken);
			}
		}
		const userCredential = await signInWithCredential(auth, credential);

		let userInfo;
		if (userCredential.user.uid) {
			const doc = await this.userService.getUserData(userCredential.user.uid);
			if (doc.exists()) {
				if (doc.data()?.uid) {
					userInfo = {
						...doc.data(),
						uid: userCredential.user.uid,
						email: userCredential.user.email,
					};
				} else {
					userInfo = {
						...doc.data(),
						uid: userCredential.user.uid,
						email: userCredential.user.email,
					};
					this.userService.updateUserData(userCredential.user.uid, {
						uid: userCredential.user.uid,
					});
				}
			} else {
				userInfo = {
					uid: userCredential.user.uid as string,
					email: userCredential.user.email as string,
					name: userCredential.user.displayName as string,
				};
				await this.userService.storeUserData(userCredential.user.uid, userInfo);
			}
		}
		return userInfo;
	}

	async forgotPassword(email: string): Promise<boolean> {
		await sendPasswordResetEmail(auth, email);
		return true;
	}
}
