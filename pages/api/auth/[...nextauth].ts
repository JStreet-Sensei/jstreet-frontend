import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


let googleClientId = process.env.GOOGLE_CLIENT_ID
let googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

if (googleClientId === undefined) googleClientId = ""
if (googleClientSecret === undefined) googleClientSecret = ""

interface urlSets {
    afterLoginUrl: string
    frontOrigin: string
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
        }),
        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET,
    //add calbacks here.
}

export default NextAuth(authOptions)