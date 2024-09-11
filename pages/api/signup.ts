import { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        console.log(req.body)
        console.log(JSON.parse(req.body).username)
        const username = await JSON.parse(req.body).username
        const password = await JSON.parse(req.body).password
        const passwordagain = await JSON.parse(req.body).passwordagain
        console.log(username, "/", password)
        if (password != passwordagain) {
            res.status(400).send({ message: "confirm username" })
            return;
        }

        //check the existence of username
        await axios({
            method: "get",
            url: BACKEND_URL + `api/user/${username}/existence`
        }).catch(function (error) {
            if (error.response.status === 409)
                console.error(`User ${username} is already exists`)
            res.status(409).send({ message: "A user already has this username" })
        })

        //go to register
        //simply send a new password to register.
        //Both django and nextjs uses localhost, so it doesn't need encryption, 
        console.log("register to : ", BACKEND_URL + `api/users/create`)

        await axios.post(BACKEND_URL + `api/users/create`, {
            username: username, password: password
        }).catch(function (error) {
            console.error(error.response.status)
            console.error(error.response.data)
            console.error(error.response.headers)
            res.status(500).send({ message: "Serve cannot handle your request." })
        })
        console.log("Create user successfully")
        res.status(200).send({ message: "Register successed!" })
    } else {
        res.redirect("/")
    }
}