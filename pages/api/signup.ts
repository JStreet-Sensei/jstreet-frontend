// import Cookies from 'cookies'
// import clientPromise from "../../lib/mongodb";
import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '@/types/next';
import crypto from "crypto"
// const { createHash } = require('node:crypto');

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
    if (req.method == "POST") {
        const username = req.body['username']
        const password = req.body['password']
        //confirm the password
        const passwordagain = req.body['passwordagain']
        if (password != passwordagain) {
            res.redirect("/signup");
            return;
        }
        //connect the DB
        //check the existence of username
        // const client = await fetch(BACKEND_URL + "api/users/")
        // const db = client.db("Users");
        // const users = await db.collection("Profiles").find({ "Username": username }).toArray();
        // if (users.length > 0) {
        //     res.redirect("/signup?msg=A user already has this username");
        //     return;
        // }
        //go to register
        //should send a new password to register in the same way NextAuth and Rest-Django-Framework uses.

        const password_hash = crypto.createHash('sha256').update(password).digest('hex');
        const currentDate = new Date().toUTCString();
        const bodyObject = {
            Username: username,
            Password: password_hash,
            Created: currentDate
        }
        //set credentials and redirect to home page
        //can use nextjs authentication api.
        await db.collection("Profiles").insertOne(bodyObject);
        const cookies = new Cookies(req, res)
        cookies.set('username', username)
        res.redirect("/")
    } else {
        res.redirect("/")
    }
}