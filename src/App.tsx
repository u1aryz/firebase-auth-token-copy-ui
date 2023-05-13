import { auth, login } from "./firebase";
import { Button, Textarea, Flex, Container, CopyButton } from "@mantine/core";
import { FaCheck, FaCopy, FaGoogle } from "react-icons/fa";
import { useToken } from "./useToken";

function App() {
	const [token, loading] = useToken(auth);

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
				{token && (
					<>
						<Textarea value={token} autosize />
						<Flex justify="flex-end">
							<CopyButton value={token}>
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
						</Flex>
					</>
				)}
			</Flex>
		</Container>
	);
}

export default App;
