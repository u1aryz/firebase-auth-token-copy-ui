import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
	const [user, loading, error] = useAuthState(auth);

	console.log("user", user);
	console.log("loading", loading);
	console.log("error", error);

	return <div>Hello World</div>;
}

export default App;
