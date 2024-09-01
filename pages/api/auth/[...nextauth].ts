import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


let googleClientId = process.env.GOOGLE_CLIENT_ID
let googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
let frontOrigin = process.env.FRONT_BASE_URL
let afterLoginUrl = process.env.FRONT_URL_AFTER_LOGIN
let baseUrl = process.env.FRONT_BASE_URL
let url = process.env.FRONT_URL_AFTER_LOGIN

if (googleClientId === undefined) googleClientId = ""
if (googleClientSecret === undefined) googleClientSecret = ""
// if (baseUrl === undefined) baseUrl = ""
// if (url === undefined) url = ""
if (frontOrigin === undefined) frontOrigin = ""
if (afterLoginUrl === undefined) afterLoginUrl = ""

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
    // callbacks: {
    //     // async redirect({ url:afterLoginUrl, baseUrl:frontOrigin }: urlSets) {
    //     async redirect({ url, baseUrl }) {
    //         console.log(frontOrigin)
    //         console.log(afterLoginUrl)
    //         // Allows relative callback URLs
    //         if (afterLoginUrl.startsWith("/")) return `${frontOrigin}${afterLoginUrl}`
    //         // Allows callback URLs on the same origin
    //         else if (new URL(afterLoginUrl).origin === frontOrigin) return afterLoginUrl
    //         return frontOrigin
    //     }
    //     // async redirect({ afterLoginUrl, frontOrigin }:urlSets) {
    //     //     console.log(frontOrigin)
    //     //     console.log(afterLoginUrl)
    //     //     // Allows relative callback URLs
    //     //     if (afterLoginUrl.startsWith("/")) return `${frontOrigin}${afterLoginUrl}`
    //     //     // Allows callback URLs on the same origin
    //     //     else if (new URL(afterLoginUrl).origin === frontOrigin) return afterLoginUrl
    //     //     return frontOrigin
    //     // }
    // }
}

export default NextAuth(authOptions)