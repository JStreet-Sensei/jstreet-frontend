import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import { Layout } from "../components/layouts";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
export default MyApp;
