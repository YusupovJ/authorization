import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/index.css";
import { Header } from "@/components/Header";
import { SSRProvider } from "react-bootstrap";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SSRProvider>
            <Header />
            <Component {...pageProps} />
        </SSRProvider>
    );
}
