import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


let googleClientId = process.env.GOOGLE_CLIENT_ID
let googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
let baseUrl = process.env.FRONT_BASE_URL
let url = process.env.FRONT_URL_AFTER_LOGIN

if (googleClientId === undefined) googleClientId = ""
if (googleClientSecret === undefined) googleClientSecret = ""
if (baseUrl === undefined) baseUrl = ""
if (url === undefined) url = ""

interface urlSets {
    url: string
    baseUrl: string
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
    callbacks: {
        async redirect({ url, baseUrl }: urlSets) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    }
}

export default NextAuth(authOptions)