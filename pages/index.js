//import "../styles/globals.css";
import Table from '../components/Table'
import { Container, Button, Heading } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const headerCompanies = [
	'NIT', 'Name', 'Address', 'Phone', 'Actions'];

export default function Home() {
	const [companies, setCompanies] = useState([]);
	const router = useRouter();

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
			<Button className='mb-4'
				onClick={() => {
					router.push('/company/form?type=create');
				}}
			>
				Create Company
			</Button>
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
