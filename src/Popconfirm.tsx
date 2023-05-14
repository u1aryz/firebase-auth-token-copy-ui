import React, { ReactElement } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Flex, Popover, Text } from "@mantine/core";

type Props = {
	children: ReactElement;
	title: string;
	onOk?: () => void;
	onCancel?: () => void;
};

function Popconfirm({ children, title, onOk, onCancel }: Props) {
	const [opened, { close, open }] = useDisclosure(false);

	const handleConfirm = () => {
		close();
		onOk?.();
	};

	const handleCancel = () => {
		close();
		onCancel?.();
	};

	return (
		<Popover
			opened={opened}
			onClose={close}
			position="bottom"
			shadow="md"
			withArrow
		>
			<Popover.Target>
				{React.cloneElement(children, { onClick: open })}
			</Popover.Target>
			<Popover.Dropdown>
				<Flex direction="column" gap="sm">
					<Text size="sm">{title}</Text>
					<Flex gap="xs" justify="end">
						<Button miw={54} variant="outline" onClick={handleCancel} size="xs">
							No
						</Button>
						<Button miw={54} onClick={handleConfirm} size="xs">
							Yes
						</Button>
					</Flex>
				</Flex>
			</Popover.Dropdown>
		</Popover>
	);
}

export default Popconfirm;
