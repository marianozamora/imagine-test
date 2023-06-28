//import "../styles/globals.css";
import Table from '../components/Table'
import { Container, Button, Heading } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';

const headerCompanies = [
	'NIT', 'Name', 'Address', 'Phone', 'Actions'];

export default function Home() {
	const [companies, setCompanies] = useState([]);
	const router = useRouter();

	const { data: session } = useSession();

	useEffect(() => {
		const getCompanies = async () => {
			const response = await fetch('/api/companies');
			const data = await response.json();
			setCompanies(data.companies);
		};
		getCompanies();
	}, []);
	return (
		<Container maxW={'1024px'} className='mt-10'>
			<Heading className='mb-4'>
				Companies
			</Heading>
			{
				session?.role === 'ADMIN' ? (
					<Button className='mb-4'
					onClick={() => {
						router.push('/company/form?type=create');
					}}
				>
					Create Company
				</Button>

				) : null
			}

			<Table methods={
				{
					delete: async (id) => {
						const response = await fetch(`/api/companies/${id}`, {
							method: 'DELETE',
						});
						const data = await response.json();
						if (data.error) {
							alert(data.error);
						} else {
							const newCompanies = companies.filter(
								(company) => company.id !== id
							);
							setCompanies(newCompanies);
							router.push('/');
						}
					},
					update: (id) => {
						router.push(`/company/form?type=edit&id=${id}`);
					}
				}
				} headers={headerCompanies} list={companies} />
			</Container>
	)
}

export const getServerSideProps = async (context) => {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}
	return {
		props: { session },
	};
}
