import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Icon,
} from "@chakra-ui/react";

import { v4 as uuidv4 } from "uuid";

import { DeleteIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const TableList = ({ list, headers, methods }: any) => {
	const router = useRouter();
	const handleClick = (id: any) => {
		router.push(`/company/${id}`);
	};
	const { data: session } : { data : any	} = useSession();
	return (
		<TableContainer>
			<Table variant="simple">
				<Thead>
					<Tr>
						{headers.map((header: any, i: any) => (
							<Th key={i}>{header}</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{list.map((item: any) => (
						<Tr key={uuidv4()}>
							<Td>{item.nit}</Td>
							<Td>{item.name}</Td>
							<Td>{item.address}</Td>
							<Td>{item.phone}</Td>
							<Td>
								{session && session.role === "ADMIN" ? (
									<>
										<a
											className="cursor-pointer"
											onClick={async () => {
												await methods.delete(item.nit);
												window.location.reload();
											}}
										>
											<DeleteIcon
												color="red.500"
												boxSize={6}
												fill="currentColor"
												aria-hidden="true"
												mr={2}
											/>
										</a>
										<a
											className="cursor-pointer"
											onClick={() => {
												methods.update(item.nit);
											}}
										>
											<EditIcon
												color="green.500"
												boxSize={6}
												fill="currentColor"
												aria-hidden="true"
												mr={2}
											/>
										</a>
									</>
								) : null}

								<a
									className="cursor-pointer"
									target="_blank"
									onClick={() => handleClick(item.nit)}
								>
									<ExternalLinkIcon
										color="blue.500"
										boxSize={6}
										fill="currentColor"
										aria-hidden="true"
									/>
								</a>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default TableList;
