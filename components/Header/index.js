import Link from "next/link";
import Logo from "./Logo";
import { getSession, useSession, signOut } from "next-auth/react";
import {
	Avatar,
	Popover,
	PopoverArrow,
	PopoverTrigger,
	Button,
	PopoverContent,
	PopoverCloseButton,
	PopoverHeader,
	PopoverBody,
	StatDownArrow,
} from "@chakra-ui/react";
import { useRouter } from "next/router";


export default function Header() {
	const { data: session  } = useSession();
	const { pathname } = useRouter();
	return (
		<header className="w-full bg-white sticky p-4 top-0 z-20 shadow-md flex justify-between">
			<Link href="/" className="flex items-center text-justify">
				<Logo
					height={35}
					width={35}
					textClass="ml-3 isotipe title text-black text-xl"
				/>
			</Link>

			{session && session.user ? (
				<Popover>
					<PopoverTrigger>
						<Button
							className="bg-white cursor-pointer"
							style={{ background: "white" }}
						>
							<div className="details text-xs flex">
								<Avatar
									size="sm"
									name={session.user.name}
									src={session.user.image}
								/>
								<div className="ml-2 text-left">
									<h5>{session.user.name}</h5>
									<h5>{session.user.email}</h5>
								</div>
							</div>
							<div>
								<StatDownArrow
									color="gray"
									className="text-black"
								/>
							</div>
						</Button>
					</PopoverTrigger>
					<PopoverContent textAlign="center" width={200}>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverBody>
							<ul>
								<li>
									<Link legacyBehavior href="/dashboard">
										Dashboard
									</Link>
								</li>
								<li>
									<button onClick={()=>signOut()}>
										Sign Out
									</button>
								</li>
							</ul>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			) : (
				<div className="flex items-center">
					{pathname === "/onboarding" ? (
						<>
							¿Ya tienes una cuenta?
							<Link legacyBehavior href="/login">
								<a className="text-black text-sm font-medium mr-4">
									Inicia sesión
								</a>
							</Link>
						</>
					) : (
						<>
							<Link legacyBehavior href="/login">
								<a className="text-black text-sm font-medium mr-4">
									Login
								</a>
							</Link>
							<Link legacyBehavior href="/register">
								<a className="text-black text-sm font-medium mr-4">
									Register
								</a>
							</Link>
						</>
					)}
				</div>
			)}

		</header>
	);
}
