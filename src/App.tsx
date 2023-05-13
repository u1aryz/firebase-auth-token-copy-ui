import { auth, login, logout } from "./firebase";
import {
	Button,
	Textarea,
	Flex,
	Container,
	CopyButton,
	Text,
} from "@mantine/core";
import { FaCheck, FaCopy, FaGoogle } from "react-icons/fa";
import { useAuthState } from "./useAuthState.ts";

function App() {
	const [user, loading] = useAuthState(auth);

	return (
		<Container py={30} size="sm">
			<Flex direction={{ base: "column" }} gap={{ base: "sm" }}>
				<Button
					loading={loading}
					onClick={login}
					color="red"
					leftIcon={<FaGoogle size="1rem" />}
				>
					Login by Google
				</Button>
				{user && (
					<>
						<Textarea value={user.accessToken} autosize />
						<Text align="end">
							Expiration Time:{" "}
							{new Date(user.stsTokenManager.expirationTime).toLocaleString()}
						</Text>
						<Flex justify="flex-end" gap={{ base: "sm" }}>
							<CopyButton value={user.accessToken}>
								{({ copied, copy }) => (
									<Button
										variant="light"
										color={copied ? "teal" : "blue"}
										onClick={copy}
										leftIcon={copied ? <FaCheck /> : <FaCopy />}
									>
										{copied ? "Copied" : "Copy"}
									</Button>
								)}
							</CopyButton>
							<Button onClick={logout} color="yellow">
								Logout
							</Button>
						</Flex>
					</>
				)}
			</Flex>
		</Container>
	);
}

export default App;
