import axios from "axios";
import { getToken } from "next-auth/jwt";
import { getSession, useSession } from "next-auth/react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/";

export async function getUserDataWithToken() {
  const { data: session, status } = useSession({ required: true });
  try {
    const response = await axios({
      method: "get",
      url: BACKEND_URL + "api/auth/user/",
      headers: { Authorization: "Bearer " + session?.access_token },
    });
    return await JSON.stringify(response.data);
  } catch (error: any) {
    return {};
  }
}

export async function getUserSession() {
  const session = await getSession();

  return session;
}
