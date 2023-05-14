import { auth, login, logout } from "@/firebase";
import {
	Button,
	Textarea,
	Flex,
	Container,
	CopyButton,
	Text,
} from "@mantine/core";
import { FaCheck, FaCopy, FaGoogle } from "react-icons/fa";
import { useAuthState } from "@/hooks/useAuthState";
import Popconfirm from "@/components/Popconfirm";
import GitHubCorner from "@/components/GitHubCorner";

function App() {
	const [user, loading] = useAuthState(auth);

	return (
		<Container py={30} size="sm">
			<Flex direction="column" gap="sm">
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
						<Textarea value={user.accessToken} readOnly={true} autosize />
						<Text c="dimmed" align="end">
							Expiration Time:{" "}
							{new Date(user.stsTokenManager.expirationTime).toLocaleString()}
						</Text>
						<Flex justify="flex-end" gap="sm">
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
							<Popconfirm
								title="Are you sure you want to log out?"
								onOk={logout}
							>
								<Button color="yellow">Logout</Button>
							</Popconfirm>
						</Flex>
					</>
				)}
			</Flex>
			<GitHubCorner />
		</Container>
	);
}

export default App;
