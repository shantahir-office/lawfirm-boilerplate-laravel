import React, { useEffect, useState } from "react";
import SequenceLayout from "../../Layouts/SequenceLayout";
import { Sidebar, SidebarCard } from "../../components/AllComponents";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import { ApiRequest } from "../../ApiRequest";
import images from "react-payment-inputs/images";
import { usePaymentInputs } from "react-payment-inputs";
import axios from "../../axios";
import { Helmet } from "react-helmet-async";
import { useStepper } from "../../context/SequenceContextNew";
import StepperProgress from "../../components/StepperProgress";
const Step12 = () => {
    const AuthToken = import.meta.env.VITE_TOKEN;
    const [formValues, setFormValues] = useState({
        cardHolderName: "",
        cardNumber: undefined,
        address: "",
        city: "",
        state: "",
        zipCode: "",
        expiryDate: "",
        cvc: "",
        expiry__month: "",
        expiry__year: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [filingError, setFilingError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cardData, setCartData] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [rushFilingSelected, setRushFilingSelected] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [selectedPackagePrice, setSelectedPackagePrice] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({ package: "", terms: "" });
    const [errors2, setErrors2] = useState(false);
    const [failedPayment, setfailedPayment] = useState(false);
    const [timesService, settimesService] = useState(1);

    const [retrievedStep1Data2, setretrievedstep1Data2] = useState([]);
    const [step5Data, setStep5PackagesData] = useState(null);
    const quantityData = retrievedStep1Data2?.find(
        (item) => item.lead_key === "Quantity",
    );
    // console.log(retrievedStep1Data2, "quantityData");
    // console.log(cardData, "cardData");
    const {
        cartPackages,
        setstep5Package,
        step5Package,
        setAmazonBrand,
        setAmazonBrandPrice,
        setrushFilling,
        rushFilling,
    } = useStepper();
    const quantityValue = quantityData ? quantityData?.lead_value : 1;
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // For loading state
    // const [rushFiling, setRushFiling] = useState(null);
    // const [rushFilingPrice, setRushFilingPrice] = useState(null);
    const [AmazonBrandRegistryData, setAmazonBrandRegistryData] =
        useState(null);
    // const [rushFillingID, setrushFillingID] = useState(null);
    const [amaznbrndreg, setAmaznbrndreg] = useState(null);
    const retrievedData = JSON.parse(localStorage.getItem("leadData"));
    const [retrievedStep1Data, setretrievedstep1Data] = useState({});
    const [isChecked, setIsChecked] = useState(rushFilling);
    // const [rushFill, setrushFill] = useState(false);

    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const lead_id = params.get("id");
    const isAmazonBrandInCart = () =>
        cardData?.items?.some(
            (item) => item.package_type === "amazon-brand-registry",
        );

    const handleInputChange2 = (e) => {
        const { name, value } = e.target;

        // Clear specific validation error if the input is not empty
        if (name === "nameToProtect") {
            if (value) {
                setValidationNameError(false);
                setFormDataProtect((prev) => ({ ...prev, [name]: value }));
            }
        } else if (name === "sloganToProtect") {
            if (value) {
                setValidationSloganError(false);
                setFormDataProtect((prev) => ({ ...prev, [name]: value }));
            }
        } else if (name === "logoToProtect2") {
            if (value) {
                setValidationLogoError2(false);
                setFormDataProtect((prev) => ({ ...prev, [name]: value }));
            }
        }
        // handleSubmitInternal(); // Call handleSubmit here
        setFormDataProtect((prev) => ({ ...prev, [name]: value }));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Create a temporary form object to store new values
        let updatedValues = { ...formValues, [name]: value };

        if (name === "expiryDate") {
            const [month, year] = value.split("/").map((str) => str.trim());

            // Update the expiry month and year in one go along with the main form field
            updatedValues = {
                ...updatedValues,
                expiry__month: month,
                expiry__year: year,
            };
        }

        if (name === "cardNumber") {
            // Replace all spaces in the card number
            updatedValues = {
                ...updatedValues,
                [name]: value.replace(/\s/g, ""),
            };
        }

        // Finally, set all values in a single setState call
        setFormValues(updatedValues);
    };
    const handlePayment = async (e) => {
        e.preventDefault();

        // Check for filing package in cart
        const hasFilingPackage = cardData?.items?.some(
            (item) => item.package_type === "filing-packages",
        );
        if (!hasFilingPackage) {
            toast.error(
                "Please select a filing package before proceeding to payment.",
            );
            setFilingError(true); // 🔴 border trigger
            scrollToFirstError();
            setIsSubmitting(false);
            return;
        }

        const errors = validate();
        setFormErrors(errors);
        setIsSubmitting(true);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post(
                    ApiRequest.leadPayment,
                    {
                        lead_id: lead_id,
                        lead_step: 2,
                        amount: cardData.total,
                        card_num: formValues.cardNumber,
                        card_expiry_month: formValues.expiry__month,
                        card_expiry_year: formValues.expiry__year,
                        card_cvv: formValues.cvc || formValues.cvv,
                        card_address: formValues.address,
                        card_city: formValues.city,
                        card_state: formValues.state,
                        card_zip: formValues.zipCode,
                        card_name: formValues.cardHolderName,
                        step: 2,
                    },
                    {
                        headers: {
                            Authorization: AuthToken,
                        },
                    },
                );

                if (response.data.status === "success") {
                    toast.success("Payment done successfully");
                    setfailedPayment(false);
                    await clearCart();

                    window.location.href = `/lp-4/sequence/step3?id=${lead_id}`;
                } else {
                    toast.error("Payment failed!");
                    setfailedPayment(true);
                    setIsSubmitting(false);
                }
            } catch (error) {
                toast.error("Payment failed!");
                setfailedPayment(true);
                setIsSubmitting(false);
            }
        } else {
            // setfailedPayment(true);
            setIsSubmitting(false);
        }
    };
    function expDateValidate(expDate) {
        const [month, year] = expDate.split("/").map((str) => str.trim()); // Split and remove spaces

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JS, so we add 1.

        const expiryYear = Number(`20${year}`); // Assuming year format is YY, so prefix '20'
        const expiryMonth = Number(month);

        // Check if the year is greater than 2035
        if (expiryYear > 2035) {
            return "Expiry Date Year cannot be greater than 2035";
        }

        // Check if the card is already expired
        if (
            expiryYear < currentYear ||
            (expiryYear === currentYear && expiryMonth < currentMonth)
        ) {
            return "Card is expired";
        }

        // If no validation error, return null or undefined
        return;
    }
    const clearCart = async () => {
        if (cardData?.items?.length) {
            try {
                // await Promise.all(
                //     cardData.items.map(item =>
                //         axios.post(
                //             ApiRequest.deleteFromCart,
                //             { lead_id, cart_id: item.cart_id },
                //             { headers: { Authorization: AuthToken } }
                //         )
                //     )
                // );
                axios.post(
                    ApiRequest.deleteCartByLead,
                    { lead_id },
                    { headers: { Authorization: AuthToken } },
                );
                await fetchCart();
            } catch (error) {
                // Optionally handle error
            }
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await getRetrievedData(lead_id, AuthToken);
                // const res2 = await getLeadData(lead_id, AuthToken);
                // console.log(res1, res2, "res1 and res2");
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // Call the async function inside useEffect
    }, []);

    const {
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        wrapperProps,
        getCardImageProps,
    } = usePaymentInputs();
    const validate = () => {
        let errors = {};

        // Validate Card Holder Name
        if (!formValues.cardHolderName.trim()) {
            errors.cardHolderName = true;
            toast.error("Please enter Card Holder Name");
        }
        if (!formValues.address.trim()) {
            toast.error("Please enter Your Address");
            errors.address = true;
        }
        // if (!formValues.state.trim()) {
        //     toast.error("Please enter Your State");
        //     errors.state = true;
        // }
        // if (!formValues.city.trim()) {
        //     toast.error("Please enter Your City");
        //     errors.city = true;
        // }
        // Validate Card Number (16 digits)
        if (
            !formValues.cardNumber ||
            formValues.cardNumber.replace(/\s/g, "").length < 15 ||
            formValues.cardNumber.replace(/\s/g, "").length > 19
        ) {
            errors.cardNumber = true;
            toast.error("Please enter Card Number Correctly");
        }
        console.log(
            formValues.cardNumber,
            formValues.cardNumber.replace(/\s/g, "").length,
        );
        console.log(formValues);
        const validationMessage = expDateValidate(formValues.expiryDate);

        // Validate Expiration Date (MM/YY)
        if (validationMessage) {
            errors.expiryDate = true;
            toast.error(validationMessage);
            console.log(validationMessage); // Error message if invalid
        } else {
            console.log("Expiration date is valid");
        }

        if (!formValues.cvv && !formValues.cvc) {
            toast.error("Please enter Your CVC");
            errors.cvv = true;
        }
        // Validate Address

        // Validate Zip Code (5 digits)
        if (!formValues.zipCode) {
            toast.error("Please enter Your Zipcode");
            errors.zipCode = true;
        }
        // console.log(errors)
        return errors;
    };
    const fetchCart = async () => {
        try {
            const CartData = await axios.post(
                `${ApiRequest.getCart}`,
                { lead_id: lead_id },
                { headers: { Authorization: AuthToken } },
            );
            if (CartData?.data) {
                setCartData(CartData.data);

                // Find selected package from cart
                const filingItem = CartData.data.items?.find(
                    (item) => item.package_type === "filing-packages",
                );
                setSelectedPackage(filingItem?.item_name || null);

                // Find rush filing from cart
                const rushItem = CartData.data.items?.find(
                    (item) => item.package_type === "rush-filing",
                );
                setRushFilingSelected(!!rushItem);
            } else {
                setCartData(null);
                setSelectedPackage(null);
                setRushFilingSelected(false);
            }
        } catch (error) {
            setCartData(null);
            setSelectedPackage(null);
            setRushFilingSelected(false);
            console.error("Error fetching cart:", error);
        }
    };
    useEffect(() => {
        fetchCart();
    }, [step5Data, cartPackages]);

    async function getRetrievedData(id, AuthToken) {
        try {
            const retrievedData1 = await axios.post(
                ApiRequest.getStepData,
                {
                    lead_id: id,
                    step: 1,
                },
                {
                    headers: {
                        Authorization: AuthToken,
                    },
                },
            );
            setretrievedstep1Data2(retrievedData1.data.leadData);
            // console.log(retrievedData1.data.leadData, "retrievedData");
        } catch (error) {
            console.error("Error fetching retrieved data:", error);
        }
    }
    const handleAmazonBrandChange = async () => {
        const amazonItem = cardData?.items?.find(
            (item) => item.package_type === "amazon-brand-registry",
        );
        try {
            if (isAmazonBrandInCart()) {
                // Remove from cart
                await axios.post(
                    ApiRequest.deleteFromCart,
                    { lead_id, cart_id: amazonItem.cart_id },
                    { headers: { Authorization: AuthToken } },
                );
            } else {
                // Add to cart
                await axios.post(
                    ApiRequest.addToCart,
                    {
                        lead_id,
                        item_price: AmazonBrandRegistryData.AmazonPrice,
                        item_name: AmazonBrandRegistryData.AmazonName,
                        package_id: AmazonBrandRegistryData.id,
                        item_quantity: 1,
                    },
                    { headers: { Authorization: AuthToken } },
                );
            }
            await fetchCart();
        } catch (error) {
            toast.error("Failed to update Amazon Brand Registry");
        }
    };
    async function getLeadData(id, AuthToken) {
        try {
            const response = await axios.get(`api/leads/${id}`, {
                headers: {
                    Authorization: AuthToken,
                },
            });

            // Access the data as needed
            setretrievedstep1Data(response.data);
            console.log(response.data, "retrievedData2");
        } catch (error) {
            console.error("Error fetching retrieved data:", error);
        }
    }
    const selectedPackageName = cardData?.items?.find(
        (item) => item.package_type === "filing-packages",
    )?.item_name;

    const handlePackageSelect = async (e, pkg) => {
        e.preventDefault();
        setSelectedPackage(pkg.name);
        setstep5Package(pkg);
        //  ERROR RESET
        setFilingError(false);
        setErrors2(false);

        // Remove previous filing package and rush filing from cart before adding new
        try {
            setIsLoading(true);
            // Remove all filing-packages and rush-filing from cart
            // if (cardData?.items) {
            //     const removePromises = cardData.items
            //         .filter(item =>
            //             item.package_type === "filing-packages" ||
            //             item.package_type === "rush-filing"
            //         )
            //         .map(item =>
            //             axios.post(ApiRequest.deleteFromCart, {
            //                 lead_id:lead_id,
            //                 cart_id: item.cart_id
            //             }, {
            //                 headers: { Authorization: AuthToken }
            //             })
            //         );
            //     await Promise.all(removePromises);
            // }
            // Add new package
            await axios.post(
                ApiRequest.addToCart,
                {
                    lead_id: lead_id,
                    item_price: pkg.price,
                    item_name: pkg.name,
                    package_id: pkg.id,
                    item_quantity: quantityValue,
                },
                {
                    headers: { Authorization: AuthToken },
                },
            );
            toast.success("Package Added");
            setErrors({ ...errors, package: "" });
            setErrors2(false);
            setIsSubmitClicked(true);
            await fetchCart();
        } catch (error) {
            toast.error("Failed to update cart");
        } finally {
            setIsLoading(false);
        }
    };
    const handleBrandChange = () => {
        setSelectedBrand((prevSelectedBrand) => {
            const newSelectedBrand = !prevSelectedBrand;
            setAmazonBrand(newSelectedBrand ? true : null);
            return newSelectedBrand;
        });
    };
    const handleTermsChange = (event) => {
        setTermsAccepted(event.target.checked);
        setErrors({ ...errors, terms: "" }); // Clear terms error
    };

    const isRushFilingInCart = () => {
        return cardData?.items?.some(
            (item) => item.package_type === "rush-filing",
        );
    };

    // In your rushFillChange:
    const rushFillChange = async (pkg) => {
        if (!selectedPackage || selectedPackage !== pkg.name) {
            toast.error("Select a package first");
            setRushFilingSelected(false);
            return;
        }
        if (!pkg.rushFiling?.enabled) {
            toast.error("Rush Filing not available for this package");
            setRushFilingSelected(false);
            return;
        }
        setIsLoading(true);
        try {
            const rushItem = cardData?.items?.find(
                (item) => item.package_type === "rush-filing",
            );
            if (isRushFilingInCart()) {
                // Checkbox is being unchecked, so remove rush-filing
                if (rushItem) {
                    await axios.post(
                        ApiRequest.deleteFromCart,
                        { lead_id: lead_id, cart_id: rushItem.cart_id },
                        { headers: { Authorization: AuthToken } },
                    );
                    setRushFilingSelected(false);
                }
            } else {
                // Checkbox is being checked, so add rush-filing
                await axios.post(
                    ApiRequest.addToCart,
                    {
                        lead_id: lead_id,
                        item_price: pkg.rushFiling.price,
                        item_name: "Rush Filing",
                        package_id: pkg.rushFiling.id,
                        item_quantity: quantityValue,
                    },
                    {
                        headers: { Authorization: AuthToken },
                    },
                );
                setRushFilingSelected(true);
            }
            await fetchCart();
        } catch (error) {
            toast.error("Failed to update rush filing");
        } finally {
            setIsLoading(false);
        }
    };

    // Empty dependency array means this runs only once when the component mounts.

    const handleSubmitInternal = async () => {
        // event.preventDefault();

        const hasFilingPackage =
            Array.isArray(cardData?.items) &&
            cardData.items.some(
                (item) => item.package_type === "filing-packages",
            );
        // Validate selected package
        if (!hasFilingPackage) {
            setIsSubmitClicked(true);

            let validationErrors = { package: "" };
            if (step5Package == null || undefined) {
                // validationErrors.package = "Please select a service package.";
                // setError(true);
                toast.error("Select A Package Please");
                setErrors(validationErrors);
                setErrors2(true);
                return;
            }

            // Set errors and prevent submission if there are any validation errors
            // if (validationErrors.package) {
            //     setErrors(validationErrors);
            //     setErrors2(true);
            //     return;
            // }

            try {
                setIsLoading(true); // Set loading state to true
                const items = [
                    {
                        lead_id: lead_id,
                        item_price: step5Package?.price,
                        item_name: step5Package?.name,
                        package_id: step5Package?.id,
                        item_quantity: quantityValue,
                    },
                    ...(selectedBrand
                        ? [
                              {
                                  lead_id: lead_id,
                                  item_price:
                                      AmazonBrandRegistryData?.AmazonPrice,
                                  item_name: "Amazon Brand Registry",
                                  package_id: AmazonBrandRegistryData?.id,
                                  item_quantity: quantityValue,
                              },
                          ]
                        : []),
                    ...(rushFilingSelected && step5Package?.rushFiling?.enabled
                        ? [
                              {
                                  lead_id: lead_id,
                                  item_price: step5Package.rushFiling.price,
                                  item_name: "Rush Filing",
                                  package_id: step5Package.rushFiling.id,
                                  item_quantity: quantityValue,
                              },
                          ]
                        : []),
                ];

                // Send all requests concurrently
                await Promise.all(
                    items.map((item) =>
                        axios.post(ApiRequest.addToCart, item, {
                            headers: { Authorization: AuthToken },
                        }),
                    ),
                );

                toast.success("Form submitted successfully");
                await fetchCart();
            } catch (error) {
                console.error("Error submitting lead data:", error);

                toast.error(
                    "There was an error submitting the form. Please try again.",
                );
            } finally {
                setIsLoading(false); // Reset loading state
            }
        } else {
            // toast.success("Proceeding To next Step");
            // window.location.href = `/sequence/step7?id=${lead_id}`;
        }
    };
    const [progressnumber, setProgressnumber] = useState({
        percent: "40%",
        topBarName: "Trademark Application Process",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await getRetrievedData(lead_id, AuthToken);
                const res2 = await getLeadData(lead_id, AuthToken);
                console.log(res1, res2, "res1 and res2");
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // Call the async function inside useEffect
    }, []);
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                // window.alert("Fetching packages...");
                const PackagesData = await axios.get(
                    `${ApiRequest.Packages}/filing-packages`,
                    {
                        headers: {
                            Authorization: AuthToken,
                        },
                    },
                );
                const AMZNBrandRegisterData = await axios.get(
                    `${ApiRequest.Packages}/amazon-brand-registry`,
                    {
                        headers: {
                            Authorization: AuthToken,
                        },
                    },
                );

                if (PackagesData && PackagesData.data) {
                    console.warn("Packages Fetched:", PackagesData.data);
                    setStep5PackagesData(PackagesData.data);
                } else {
                    console.log("No packages found.");
                }
                if (AMZNBrandRegisterData && AMZNBrandRegisterData.data) {
                    console.warn(
                        "Amazon Package Fetched:",
                        AMZNBrandRegisterData.data,
                    );
                    setAmazonBrandRegistryData(AMZNBrandRegisterData.data);
                    setAmazonBrandPrice(
                        AMZNBrandRegisterData.data?.AmazonPrice,
                    );
                } else {
                    console.log("No packages found.");
                }
            } catch (error) {
                console.error("Error fetching packages:", error);
                // window.alert("Failed to get packages");
            }
        };

        fetchPackages();
    }, []);

    const scrollToFirstError = () => {
        setTimeout(() => {
            const fieldError = document.querySelector(
                ".border-danger, .scrollIntoView",
            );
            if (fieldError) {
                fieldError.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
                fieldError.focus();
            }
        }, 0);
    };

    return (
        <>
            <SequenceLayout>
                <Helmet>
                    <title>Sequence Step 2 | (brandname)</title>
                </Helmet>
                <section className="pt-5">
                    <div className="container">
                        <StepperProgress currentStep={2} totalSteps={4} />
                        <Toaster position="top-right" reverseOrder={false} />

                        <div className="row g-3">
                            <div className="col-lg-9">
                                <form
                                    className=" pt-lg-0 pt-3"
                                    onSubmit={handlePayment}
                                >
                                    <div className="p-3 p-lg-5 rounded-2 mt-n5">
                                        <div
                                            className=" mb-0 "
                                            style={{
                                                zIndex: "",
                                                position: "relative",
                                                top: "0",
                                            }}
                                        >
                                            {failedPayment ? (
                                                <>
                                                    {" "}
                                                    <div
                                                        className="mx-auto bg-white mb-4 d-lg-none d-block"
                                                        style={{
                                                            maxWidth: "660px",
                                                            position: "sticky",
                                                            top: "0",
                                                            zIndex: "9999",
                                                        }}
                                                    >
                                                        <span className=" bg-danger text-white fw-semibold p-1 d-inline-block">
                                                            Attention!
                                                        </span>
                                                        <div className=" d-flex align-items-center gap-2 border border-danger px-3">
                                                            <img
                                                                src="/sequence-assets/img/icons/warning.png"
                                                                alt="warninig"
                                                                width={20}
                                                                height={20}
                                                            />
                                                            <span className=" font-xxs-12px font-md-15px text-uppercase fw-medium">
                                                                Your Payment for
                                                                Trademark Filing
                                                                Was
                                                                Unsuccessful.
                                                                Please Try Again!
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : null}

                                            <span className="h5 d-block">
                                                Dear{" "}
                                                {retrievedStep1Data.name ? (
                                                    retrievedStep1Data?.name
                                                ) : (
                                                    <>Client Name</>
                                                )}
                                            </span>
                                            <p className="font-xxs-15px">
                                                Thank you for submitting your
                                                trademark details. Please select
                                                the service package below that
                                                best meets your needs so, we can
                                                proceed with filing your
                                                trademark application.
                                            </p>
                                            <p className="font-xxs-15px">
                                                <b>Note:</b> If you intend to
                                                trademark more than one element
                                                (e.g., a name and a logo), each
                                                will be counted as a separate
                                                application. The total number of
                                                applications will correspond to
                                                the elements you choose to
                                                trademark.
                                            </p>

                                            <div
                                                className="p-3 pt-4 rounded-lg"
                                                style={{
                                                    background: "#f6f6f6",
                                                    overflowX: "hidden",
                                                }}
                                            >
                                                <h2 className=" fw-bold  font-xxs-22px font-md-36px mb-5 pb-4 border-1 border-bottom">
                                                    Filing Packages
                                                </h2>
                                                <div className="row g-13 g-md-4">
                                                    {step5Data !== null &&
                                                        step5Data.map((pkg) => (
                                                            <div
                                                                className={`col-md-6 col-xl-4 col-xxxl-4`}
                                                                key={pkg.name}
                                                            >
                                                                <div
                                                                    className={`bg-white rounded-20px border border-1 position-relative ${filingError ? "border-danger scrollIntoView" : ""}`}
                                                                >
                                                                    {pkg.badge && (
                                                                        <div
                                                                            className={`price-badge px-3 pb-1 text-white rounded position-absolute start-50 translate-middle-x ${pkg.badge}`}
                                                                            style={{
                                                                                top: "-25px",
                                                                                zIndex: "-1",
                                                                                backgroundColor:
                                                                                    pkg.badge ===
                                                                                    "Recommended"
                                                                                        ? "#917204"
                                                                                        : "red",
                                                                            }}
                                                                        >
                                                                            {
                                                                                pkg.badge
                                                                            }
                                                                        </div>
                                                                    )}

                                                                    <div className="border-1 border-bottom">
                                                                        <span
                                                                            className="font-xxs-28px font-md-30px d-block fw-semibold text-center p-3 bg-light lh-1"
                                                                            style={{
                                                                                borderTopLeftRadius:
                                                                                    "20px",
                                                                                borderTopRightRadius:
                                                                                    "20px",
                                                                            }}
                                                                        >
                                                                            {
                                                                                pkg.name
                                                                            }
                                                                        </span>
                                                                        <div className="d-block fw-semibold text-center p-3 border-1 border-top">
                                                                            <span
                                                                                className="lh-1"
                                                                                style={{
                                                                                    fontSize:
                                                                                        "clamp(30px, 5vw, 50px)",
                                                                                }}
                                                                            >
                                                                                $
                                                                                {
                                                                                    pkg.price
                                                                                }
                                                                            </span>
                                                                            <p className="font-xxs-15px m-0">
                                                                                {
                                                                                    pkg.description
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="p-3 bg-light"
                                                                        style={{
                                                                            borderBottomLeftRadius:
                                                                                "20px",
                                                                            borderBottomRightRadius:
                                                                                "20px",
                                                                        }}
                                                                    >
                                                                        <span
                                                                            className=" d-block text-center font-xxs-14px"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: pkg.beforeContent,
                                                                            }}
                                                                        />

                                                                        <ul className="overflow-hidden overflow-y-auto d-flex flex-column gap-2 ps-3 mt-2">
                                                                            {pkg.features.map(
                                                                                (
                                                                                    feature,
                                                                                ) => (
                                                                                    <li
                                                                                        key={
                                                                                            feature
                                                                                        }
                                                                                        className="d-flex align-items-baseline gap-2 fw-semibold lh-base font-xxs-15px"
                                                                                    >
                                                                                        <img
                                                                                            src="/sequence-assets/assets-updated/img/icons/check.svg"
                                                                                            className="static-color object-fit-contain"
                                                                                            alt="check icon"
                                                                                            width="15"
                                                                                            height="15"
                                                                                        />
                                                                                        {
                                                                                            feature
                                                                                        }
                                                                                    </li>
                                                                                ),
                                                                            )}
                                                                        </ul>
                                                                        {pkg.rushFiling &&
                                                                        pkg
                                                                            .rushFiling
                                                                            .enabled ? (
                                                                            <div className="form-check d-flex align-items-center p-0 gap-2 mt-9">
                                                                                <input
                                                                                    className="form-check-input m-0 p-0"
                                                                                    type="checkbox"
                                                                                    onChange={() =>
                                                                                        rushFillChange(
                                                                                            pkg,
                                                                                        )
                                                                                    }
                                                                                    checked={
                                                                                        isRushFilingInCart() &&
                                                                                        selectedPackage ===
                                                                                            pkg.name
                                                                                    }
                                                                                    id={`RushFiling${pkg.name}`}
                                                                                    style={{
                                                                                        width: "22px",
                                                                                        height: "22px",
                                                                                    }}
                                                                                />
                                                                                <label
                                                                                    className="form-check-label font-xxs-15px"
                                                                                    htmlFor={`RushFiling${pkg.name}`}
                                                                                    role="button"
                                                                                >
                                                                                    24
                                                                                    Hours
                                                                                    Rush
                                                                                    Filing
                                                                                    -{" "}
                                                                                    <span className="fw-bold">
                                                                                        $
                                                                                        {
                                                                                            pkg
                                                                                                .rushFiling
                                                                                                .price
                                                                                        }
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        ) : null}
                                                                        <ul className="mt-5">
                                                                            <li className="flex-grow-1">
                                                                                <button
                                                                                    type="button"
                                                                                    className={`btn btn-primary py-3 px-4 fw-semibold font-md-17px lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-center text-uppercase w-100 border border-black ${
                                                                                        selectedPackageName ===
                                                                                        pkg.name
                                                                                            ? "active"
                                                                                            : ""
                                                                                    }`}
                                                                                    // Only disable the button for the selected package, not all others
                                                                                    disabled={
                                                                                        isLoading ||
                                                                                        selectedPackageName ===
                                                                                            pkg.name
                                                                                    }
                                                                                    onClick={(
                                                                                        e,
                                                                                    ) => {
                                                                                        handlePackageSelect(
                                                                                            e,
                                                                                            pkg,
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    {selectedPackageName ===
                                                                                    pkg.name
                                                                                        ? "Selected"
                                                                                        : "Add To Cart"}
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>

                                                {/* Amazon Brand Registry Section */}
                                                {AmazonBrandRegistryData !==
                                                null ? (
                                                    <>
                                                        <div className="mt-3">
                                                            <h3
                                                                className="fw-bold h2 d-block"
                                                                style={{
                                                                    color: "#032554",
                                                                }}
                                                            >
                                                                Add-on
                                                            </h3>
                                                            <div
                                                                className="p-3 rounded-3 border mb-3 overflow-hidden"
                                                                style={{
                                                                    "--cstm-border-color":
                                                                        "#032554",
                                                                }}
                                                            >
                                                                <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                                                                    <div>
                                                                        <h2 className="font-xxs-23px fw-semibold m-0 amazong-bg-shade text-white p-2">
                                                                            {
                                                                                AmazonBrandRegistryData?.AmazonName
                                                                            }
                                                                            <span className="mb-n1 text-white fw-bold">
                                                                                {" "}
                                                                                $
                                                                                {
                                                                                    AmazonBrandRegistryData?.AmazonPrice
                                                                                }
                                                                            </span>
                                                                        </h2>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        class="btn btn-primary py-2 px-4 fw-semibold font-md-15px lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-center text-uppercase  border border-black "
                                                                        onClick={
                                                                            handleAmazonBrandChange
                                                                        }
                                                                    >
                                                                        {isAmazonBrandInCart()
                                                                            ? "Remove from Cart"
                                                                            : "Add To Cart"}
                                                                    </button>
                                                                </div>
                                                                <p className=" font-xxs-15px">
                                                                    {
                                                                        AmazonBrandRegistryData?.AmazonDescription
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <span className="">
                                                        Loading..
                                                    </span>
                                                )}
                                                <br />
                                                {failedPayment ? (
                                                    <>
                                                        {" "}
                                                        <div
                                                            className="mx-auto mb-4 d-lg-block d-none"
                                                            style={{
                                                                maxWidth:
                                                                    "660px",
                                                            }}
                                                        >
                                                            <span className=" bg-danger text-white fw-semibold p-1 d-inline-block">
                                                                Attention!
                                                            </span>
                                                            <div className=" d-flex align-items-center gap-2 border border-danger px-3">
                                                                <img
                                                                    src="/sequence-assets/img/icons/warning.png"
                                                                    alt="warninig"
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                                <span className=" font-xxs-12px font-md-15px text-uppercase fw-medium">
                                                                    Your Payment
                                                                    for
                                                                    Trademark
                                                                    Filing Was
                                                                    Unsuccessful.
                                                                    Please Try Again!
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : null}

                                                <div
                                                    className=" mx-auto"
                                                    style={{
                                                        maxWidth: "400px",
                                                    }}
                                                >
                                                    <h2 className="fw-bold d-block text-center mb-3">
                                                        Payment Details
                                                    </h2>
                                                    <div className="border border-1 border-dark rounded-3 overflow-hidden">
                                                        <div className="bg-primary p-2">
                                                            <h2 className="d-flex justify-content-between align-items-center text-white fw-bold h4 text-uppercase d-block text-center m-0 lh-base">
                                                                <span>
                                                                    Total
                                                                    Invoice
                                                                    Amount:
                                                                </span>
                                                                {cardData?.total !==
                                                                    undefined ||
                                                                null ? (
                                                                    <span>
                                                                        {"$" +
                                                                            cardData?.total}
                                                                    </span>
                                                                ) : (
                                                                    <span>
                                                                        <LoaderIcon />
                                                                    </span>
                                                                )}
                                                            </h2>
                                                        </div>
                                                        <div className="p-3">
                                                            <div className="row g-2">
                                                                <div className="col-12">
                                                                    <label
                                                                        htmlFor=""
                                                                        className="font-xxs-14px"
                                                                        style={{
                                                                            color: "#032554",
                                                                        }}
                                                                    >
                                                                        Name On
                                                                        Card
                                                                    </label>
                                                                    <div className=" position-relative">
                                                                        <img
                                                                            src="/sequence-assets/assets-updated/img/icons/user.png"
                                                                            alt="use"
                                                                            width={
                                                                                20
                                                                            }
                                                                            height={
                                                                                20
                                                                            }
                                                                            className="  object-fit-contain position-absolute top-50 state-0 translate-middle-y ms-3"
                                                                            style={{
                                                                                opacity: 0.4,
                                                                            }}
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            name="cardHolderName"
                                                                            value={
                                                                                formValues.cardHolderName
                                                                            }
                                                                            onChange={
                                                                                handleInputChange
                                                                            }
                                                                            className={`form-control rounded-3 ps-7 font-xxxl-20px default-input ${
                                                                                formErrors.cardHolderName
                                                                                    ? "border-danger"
                                                                                    : ""
                                                                            }`}
                                                                            placeholder="Card Holder Name"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <label
                                                                        htmlFor=""
                                                                        className="font-xxs-14px"
                                                                        style={{
                                                                            color: "#032554",
                                                                        }}
                                                                    >
                                                                        Card
                                                                        Number
                                                                    </label>
                                                                    <div
                                                                        className={`form-control rounded-3 ps-4 font-xxxl-20px paymentcard-number py-0 d-flex gap-2 align-items-center ${
                                                                            formErrors.cardNumber &&
                                                                            formErrors.cardNumber
                                                                                ? "border-danger"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <svg
                                                                            {...getCardImageProps(
                                                                                {
                                                                                    images,
                                                                                },
                                                                            )}
                                                                        />
                                                                        <input
                                                                            style={{
                                                                                border: "0px",
                                                                                padding:
                                                                                    "0px",
                                                                            }}
                                                                            {...getCardNumberProps(
                                                                                {
                                                                                    onChange:
                                                                                        (
                                                                                            e,
                                                                                        ) =>
                                                                                            handleInputChange(
                                                                                                e,
                                                                                            ),
                                                                                },
                                                                            )}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <label
                                                                        htmlFor=""
                                                                        className="font-xxs-14px"
                                                                        style={{
                                                                            color: "#032554",
                                                                        }}
                                                                    >
                                                                        Expiration
                                                                        Date
                                                                    </label>
                                                                    <div
                                                                        className={`rounded-3 px-3 bg-white d-flex align-items-center justify-content-between relative form-control py-0  ${
                                                                            formErrors.expiryDate
                                                                                ? "border border-1 border-danger"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <div className=" position-relative">
                                                                            <img
                                                                                src="/sequence-assets/assets-updated/img/icons/calendar.png"
                                                                                alt="use"
                                                                                width={
                                                                                    20
                                                                                }
                                                                                height={
                                                                                    20
                                                                                }
                                                                                className="object-fit-contain position-absolute top-50 state-0 translate-middle-y"
                                                                                style={{
                                                                                    opacity: 0.4,
                                                                                }}
                                                                            />
                                                                            <input
                                                                                {...getExpiryDateProps(
                                                                                    {
                                                                                        onChange:
                                                                                            (
                                                                                                e,
                                                                                            ) =>
                                                                                                handleInputChange(
                                                                                                    e,
                                                                                                ),
                                                                                    },
                                                                                )}
                                                                                className={`border-0 bg-transparent payment-expiration-date ps-5 w-100 ${
                                                                                    formErrors.expiryDate
                                                                                        ? "border-1 border-danger"
                                                                                        : ""
                                                                                }`}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <label
                                                                        htmlFor=""
                                                                        className="font-xxs-14px"
                                                                        style={{
                                                                            color: "#032554",
                                                                        }}
                                                                    >
                                                                        CVC
                                                                    </label>
                                                                    <div
                                                                        className={`rounded-3 px-3 bg-white d-flex align-items-center justify-content-between relative form-control py-0  ${
                                                                            formErrors.cvc
                                                                                ? "border-danger"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <div className=" position-relative">
                                                                            <img
                                                                                src="/sequence-assets/assets-updated/img/icons/cvv.png"
                                                                                alt="use"
                                                                                width={
                                                                                    20
                                                                                }
                                                                                height={
                                                                                    20
                                                                                }
                                                                                className="object-fit-contain position-absolute top-50 state-0 translate-middle-y"
                                                                                style={{
                                                                                    opacity: 0.4,
                                                                                }}
                                                                            />
                                                                            <input
                                                                                className={`border-0 bg-transparent payment-cvv-code ps-5 w-100`}
                                                                                {...getCVCProps(
                                                                                    {
                                                                                        onChange:
                                                                                            (
                                                                                                e,
                                                                                            ) =>
                                                                                                handleInputChange(
                                                                                                    e,
                                                                                                ),
                                                                                    },
                                                                                )}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <label
                                                                        htmlFor=""
                                                                        className="font-xxs-14px"
                                                                        style={{
                                                                            color: "#032554",
                                                                        }}
                                                                    >
                                                                        Address
                                                                    </label>
                                                                    <div className=" position-relative">
                                                                        <img
                                                                            src="/sequence-assets/assets-updated/img/icons/location.png"
                                                                            alt="use"
                                                                            width={
                                                                                20
                                                                            }
                                                                            height={
                                                                                20
                                                                            }
                                                                            className="object-fit-contain position-absolute top-50 state-0 translate-middle-y ms-3"
                                                                            style={{
                                                                                opacity: 0.4,
                                                                            }}
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            name="address"
                                                                            value={
                                                                                formValues.address
                                                                            }
                                                                            onChange={
                                                                                handleInputChange
                                                                            }
                                                                            className={`form-control rounded-3 ps-7 font-xxxl-20px default-input ${
                                                                                formErrors.address
                                                                                    ? "border-danger"
                                                                                    : ""
                                                                            }`}
                                                                            placeholder="Address"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <label
                                                                        htmlFor=""
                                                                        className="font-xxs-14px"
                                                                        style={{
                                                                            color: "#032554",
                                                                        }}
                                                                    >
                                                                        City
                                                                    </label>
                                                                    <div className=" position-relative">
                                                                        <img
                                                                            src="/sequence-assets/assets-updated/img/icons/city.png"
                                                                            alt="use"
                                                                            width={
                                                                                20
                                                                            }
                                                                            height={
                                                                                20
                                                                            }
                                                                            className="object-fit-contain position-absolute top-50 state-0 translate-middle-y ms-3"
                                                                            style={{
                                                                                opacity: 0.4,
                                                                            }}
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            name="city"
                                                                            value={
                                                                                formValues.city
                                                                            }
                                                                            onChange={
                                                                                handleInputChange
                                                                            }
                                                                            className={`form-control rounded-3 ps-4 font-xxxl-20px default-input ps-7 ${
                                                                                formErrors.city
                                                                                    ? "border-danger"
                                                                                    : ""
                                                                            }`}
                                                                            placeholder="City"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <label
                                                                        htmlFor=""
                                                                        className="font-xxs-14px"
                                                                        style={{
                                                                            color: "#032554",
                                                                        }}
                                                                    >
                                                                        State
                                                                    </label>
                                                                    <div className=" position-relative">
                                                                        <img
                                                                            src="/sequence-assets/assets-updated/img/icons/state.png"
                                                                            alt="use"
                                                                            width={
                                                                                20
                                                                            }
                                                                            height={
                                                                                20
                                                                            }
                                                                            className="object-fit-contain position-absolute top-50 state-0 translate-middle-y ms-3"
                                                                            style={{
                                                                                opacity: 0.4,
                                                                            }}
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            name="state"
                                                                            value={
                                                                                formValues.state
                                                                            }
                                                                            onChange={
                                                                                handleInputChange
                                                                            }
                                                                            className={`form-control rounded-3 ps-4 font-xxxl-20px default-input ps-7 ${
                                                                                formErrors.state
                                                                                    ? "border-danger"
                                                                                    : ""
                                                                            }`}
                                                                            placeholder="State"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <label
                                                                        htmlFor=""
                                                                        className="font-xxs-14px"
                                                                        style={{
                                                                            color: "#032554",
                                                                        }}
                                                                    >
                                                                        Zip
                                                                    </label>
                                                                    <div className=" position-relative">
                                                                        <img
                                                                            src="/sequence-assets/assets-updated/img/icons/zip.png"
                                                                            alt="use"
                                                                            width={
                                                                                20
                                                                            }
                                                                            height={
                                                                                20
                                                                            }
                                                                            className="object-fit-contain position-absolute top-50 state-0 translate-middle-y ms-3"
                                                                            style={{
                                                                                opacity: 0.4,
                                                                            }}
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            name="zipCode"
                                                                            value={
                                                                                formValues.zipCode
                                                                            }
                                                                            onChange={
                                                                                handleInputChange
                                                                            }
                                                                            className={`form-control rounded-3 ps-4 font-xxxl-20px default-input ps-7 ${
                                                                                formErrors.zipCode
                                                                                    ? "border-danger"
                                                                                    : ""
                                                                            }`}
                                                                            placeholder="Zip Code"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <button
                                                                        type="submit"
                                                                        className={`btn btn-primary py-2 px-7 fw-semibold font-md-17px lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-center text-uppercase w-100 border border-black  paymentFormValidation ${
                                                                            isSubmitting
                                                                                ? "disabled"
                                                                                : ""
                                                                        }`}
                                                                        disabled={
                                                                            isSubmitting
                                                                        }
                                                                        aria-disabled={
                                                                            isSubmitting
                                                                        }
                                                                    >
                                                                        Pay Now
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-3">
                                <SidebarCard
                                    cartData={cardData}
                                    refreshCart={fetchCart}
                                    step={5}
                                    lead_id={lead_id}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </SequenceLayout>
        </>
    );
};

export default Step12;
