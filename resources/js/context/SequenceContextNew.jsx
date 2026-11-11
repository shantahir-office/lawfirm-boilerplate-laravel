import React, { createContext, useContext, useState } from "react";

const SequenceContextNew = createContext();

export const SequenceProvider = ({ children }) => {
    // const [formData, setFormData] = useState({});
    // const [currentStep, setCurrentStep] = useState(1);

    // const nextStep = () => setCurrentStep((prev) => prev + 1);
    // const prevStep = () => setCurrentStep((prev) => prev - 1);
    // const updateFormData = (newData) => setFormData((prev) => ({ ...prev, ...newData }));
    const [cartPackages, setCartPackages] = useState({});
    const [MultipliedTimes, setMultipliedTimes] = useState(1);
    const [step4Package, setStep4Package] = useState(null);
    // const [step5PackageName, setStep5PackageName] = useState(null);
    // const [step4PackagePrice, setstep4PackagePrice] = useState(0);
    const [step5Package, setstep5Package] = useState(null);
    const [AmazonBrand, setAmazonBrand] = useState(null);
    const [rushFilling, setrushFilling] = useState(null);
    const [AmazonBrandPrice, setAmazonBrandPrice] = useState(0);
    const [rushFillingPrice, setrushFillingPrice] = useState(0);
    return (
        <SequenceContextNew.Provider
            value={{
                cartPackages,
                setCartPackages,
                MultipliedTimes,
                setMultipliedTimes,
                step4Package,
                setStep4Package,
                step5Package,
                setstep5Package,
                AmazonBrand,
                setAmazonBrand,
                rushFilling,
                setrushFilling,
                AmazonBrandPrice,
                setAmazonBrandPrice,
                rushFillingPrice,
                setrushFillingPrice,
            }}
        >
            {children}
        </SequenceContextNew.Provider>
    );
};

export const useStepper = () => useContext(SequenceContextNew);
