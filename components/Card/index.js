import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	IconButton,
	Image,
	Text,
	CardFooter,
	Card,
	CardBody,
	CardHeader,
	Stack,
} from "@chakra-ui/react";

import { BiChat, BiLike, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { dateFormat, textToCapitalize } from "../../utils/customFn";
import { useSession } from "next-auth/react";

const CardGeneral = ({ data, methods }) => {
	const { data: session } = useSession();
	return (
		<Card className="mt-4">
			<CardHeader marginBottom={0} paddingBottom={0}>
				<Flex spacing="4">
					<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
						<Box>
							<Heading size="sm">
								{textToCapitalize(data.name)}
							</Heading>
							<Text fontSize="xs">
								{dateFormat(data.updatedAt)}
							</Text>
						</Box>
					</Flex>
				</Flex>
			</CardHeader>
			<CardBody p={4}>
				<Stack spacing={3}>
					<Text fontSize="xs">{data.description}</Text>
				</Stack>
			</CardBody>
			<Image
				objectFit="cover"
				src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
				alt="Chakra UI"
			/>

				{session?.role === "ADMIN" ? (
					<CardFooter
					justify="space-between"
					flexWrap="wrap"
					sx={{
						"& > button": {
							minW: "100px",
							fontSize: "sm",
						},
					}}
				>
						<Button
							onClick={() => methods.update(data.id)}
							flex="1"
							variant="ghost"
							leftIcon={<BiLike />}
						>
							Update
						</Button>
						<Button
							onClick={() => methods.delete(data.id)}
							flex="1"
							variant="ghost"
							leftIcon={<BiChat />}
						>
							Delete
						</Button>
					</CardFooter>
				) : null}
		</Card>
	);
};

export default CardGeneral;
