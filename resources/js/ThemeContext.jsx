import React from "react";
import { ApiRequest } from "./ApiRequest";
import axios from "./axios";

import { createContext, useEffect, useState } from "react";
export const Themecontext = createContext();
export const ThemeProvider = (props) => {
    const [isData, setData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("sequenceLeadData");
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        if (isData) {
            localStorage.setItem("sequenceLeadData", JSON.stringify(isData));
        }
    }, [isData]);

    return (
        <Themecontext.Provider value={{ isData, setData }}>
            {props.children}
        </Themecontext.Provider>
    );
};
