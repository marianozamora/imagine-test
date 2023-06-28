
import withAuth from "next-auth/middleware"

export default withAuth({
//   jwt: { decode: authOptions.jwt },
	callbacks: {
		authorized: ({token}) => {
			return !!token
		},
	},


})

export const config = { matcher: ["/events/","/event/:path*","/admin", "/me",] }
// "/api/:function*"
