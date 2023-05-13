import { useIdToken } from "react-firebase-hooks/auth";
import { useAsync } from "react-use";
import { Auth } from "firebase/auth";

export const useToken = (
	auth: Auth,
): [string | undefined, boolean, Error | undefined] => {
	const [user, idTokenLoading, idTokenError] = useIdToken(auth);
	const { value, loading, error } = useAsync(async () => {
		return user?.getIdToken();
	}, [user]);
	return [value, idTokenLoading || loading, idTokenError || error];
};
