import Header from '../components/Header';
//import Footer from '../components/Footer';
import { useRouter } from 'next/router'


export default function DashboardLayout({ children } : { children: React.ReactNode }) {
	const { pathname } = useRouter()
    return (
        <div className="w-full inline-flex flex-col">
            <Header />
            <main>
                {children}
            </main>
            {/* {pathname !=='/login' && pathname !=='/onboarding' ? <Footer /> : ''} */}
        </div>
    )
}
