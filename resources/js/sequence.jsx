import React, { Suspense } from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "./ThemeContext";
import { SequenceProvider } from "./context/SequenceContextNew.jsx"; // Note: .jsx extension is added

// Yahan lazily loading ka tareeqa update kiya gaya hai using import.meta.glob()
const pages = import.meta.glob("./Pages/**/*.jsx");

const resolvePageComponent = (name) => {
    const page = pages[`./Pages/${name}.jsx`];
    if (!page) {
        throw new Error(`Page not found: ./${name}.jsx`);
    }
    return page();
};

createInertiaApp({
    resolve: resolvePageComponent,
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <ThemeProvider>
                    <SequenceProvider>
                        <Suspense fallback={<div>Loading...</div>}>
                            <App {...props} />
                        </Suspense>
                    </SequenceProvider>
                </ThemeProvider>
            </>
        );
    },
});
