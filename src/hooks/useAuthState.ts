import { useIdToken } from "react-firebase-hooks/auth";
import { type Auth, type User } from "firebase/auth";
import { useCallback, useEffect } from "react";

type AuthUser = User & {
	accessToken: string;
	stsTokenManager: {
		expirationTime: number;
	};
};

type AuthStateHook = [
	AuthUser | null | undefined,
	() => void,
	boolean,
	Error | undefined,
];

export const useAuthState = (auth: Auth): AuthStateHook => {
	const [user, loading, error] = useIdToken(auth);
	const authUser = user as AuthUser | null;

	// https://github.com/CSFrequency/react-firebase-hooks/issues/299
	const setupRefreshTimer = (authUser: AuthUser) => {
		const tokenLife = authUser.stsTokenManager.expirationTime - Date.now();
		const timer = setTimeout(() => {
			authUser.getIdToken(true).catch(console.error);
		}, tokenLife);
		return () => clearTimeout(timer);
	};

	useEffect(() => {
		if (authUser) {
			return setupRefreshTimer(authUser);
		}
	}, [authUser?.accessToken]);

	const refreshNow = useCallback(() => {
		authUser?.getIdToken(true).catch(console.error);
	}, [authUser]);

	return [authUser, refreshNow, loading, error];
};
