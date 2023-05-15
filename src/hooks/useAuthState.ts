import { useIdToken } from "react-firebase-hooks/auth";
import { type Auth, type User } from "firebase/auth";
import { useCallback, useEffect } from "react";

type AuthUser = User & {
	accessToken: string;
	stsTokenManager: {
		expirationTime: number;
	};
};

export const useAuthState = (
	auth: Auth,
): [AuthUser | undefined, () => void, boolean, Error | undefined] => {
	const [user, loading, error] = useIdToken(auth);

	// https://github.com/CSFrequency/react-firebase-hooks/issues/299
	const refreshToken = (authUser: AuthUser) => {
		const tokenLife = authUser.stsTokenManager.expirationTime - Date.now();
		const timer = setTimeout(() => {
			authUser.getIdToken(true).catch(console.error);
		}, tokenLife);
		return () => clearTimeout(timer);
	};

	useEffect(() => {
		if (user) {
			const authUser = user as AuthUser;
			return refreshToken(authUser);
		}
	}, [user]);

	const refreshNow = useCallback(() => {
		user?.getIdToken(true).catch(console.error);
	}, [user]);

	return [user as AuthUser, refreshNow, loading, error];
};
