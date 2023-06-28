
// import styles from '../styles/Layout.module.css';
import Header from '../components/Header';
//import Footer from '../components/Footer';
import { useRouter } from 'next/router'
import { Container } from '@chakra-ui/react';

export default function DashboardLayout({ children }) {
	const { pathname } = useRouter()
    return (
        <div className="w-full inline-flex flex-col">
            <Header />
            <Container maxW={'2xl'}>
                {children}
            </Container>
            {pathname !=='/login' && pathname !=='/onboarding' ? <div /> : ''}
        </div>
    )
}
