import React from "react";
import { Footer, Header } from "../components/AllComponents";
import LiveChat from "../components/LiveChat";
import { Helmet, HelmetProvider } from "react-helmet-async";
export default function SequenceLayout({ children, title }) {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Sequence Steps | (brandname)</title>
                </Helmet>
                <Header />
                <main style={{ minHeight: "calc(100dvh - 104px)" }}>{children}</main>
                {/* <LiveChat /> */}
                <Footer />
            </HelmetProvider>
        </>
    );
}
