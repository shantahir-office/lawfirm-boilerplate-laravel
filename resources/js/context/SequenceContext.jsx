import React, { createContext, useState } from "react";

// Create the context
export const SequenceContext = createContext();

// Create a provider component
export const SequenceProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        servicesName: false,
        servicesSlogan: false,
        servicesLogo: false,
        nameToProtect: "",
        sloganToProtect: "",
        logoToProtect: "",
        userName: "",
        email: "",
        phone: "",
    });

    return (
        <SequenceContext.Provider value={{ formData, setFormData }}>
            {children}
        </SequenceContext.Provider>
    );
};
