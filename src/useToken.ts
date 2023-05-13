import { useIdToken } from "react-firebase-hooks/auth";
import { Auth, User } from "firebase/auth";
import { useEffect } from "react";

type AuthUser = User & {
	accessToken: string;
	stsTokenManager: {
		expirationTime: number;
	};
};

export const useToken = (
	auth: Auth,
): [string | undefined, boolean, Error | undefined] => {
	const [user, loading, error] = useIdToken(auth);
	const token = (user as AuthUser)?.accessToken;

	useEffect(() => {
		// https://github.com/CSFrequency/react-firebase-hooks/issues/299
		if (user && token) {
			const authUser = user as AuthUser;
			const tokenLife = authUser.stsTokenManager.expirationTime - Date.now();
			const timer = setTimeout(() => {
				authUser.getIdToken(true).catch(console.error);
			}, tokenLife);
			return () => clearTimeout(timer);
		}
	}, [user, token]);

	return [token, loading, error];
};
