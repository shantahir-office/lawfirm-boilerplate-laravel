import React, { useEffect, useRef, useState } from "react";
import SequenceLayout from "../../Layouts/SequenceLayout";
import { Sidebar, SidebarCard } from "../../components/AllComponents";
// import { useCreditCardValidator, images } from 'react-creditcard-validator';
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../axios";
import { ApiRequest } from "../../ApiRequest";
import { Helmet } from "react-helmet-async";
import SidebarCardOld from "../../components/SidebarCardOld";
const Step6 = () => {
    const [stepName, setStepName] = useState("");
    const AuthToken = import.meta.env.VITE_TOKEN;
    const [formValues, setFormValues] = useState({
        cardHolderName: "",
        cardNumber: undefined,
        // expirationDate: "",
        // cvv: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
    });
    // const inputRef = useRef(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cardData, setCartData] = useState(null);
    // const retrievedStep4Data = JSON.parse(localStorage.getItem("step4"));
    // const retrievedStep4Dataprice = JSON.parse(
    //     localStorage.getItem("step4")
    // ).find((item) => item.lead_key === "Total Price");
    // const totalPriceValue = retrievedStep4Dataprice
    //     ? retrievedStep4Dataprice.lead_value
    //     : 1;
    const retrievedStep1Data2 = JSON.parse(localStorage.getItem("step1.2"));
    const quantityData = retrievedStep1Data2.data.find(
        (item) => item.lead_key === "Quantity"
    );
    const quantityValue = quantityData ? quantityData.lead_value : 1;
    // const retrievedStep5Data = JSON.parse(localStorage.getItem("step5"));
    // const jsonString = JSON.parse(retrievedStep5Data[0].lead_value);
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const lead_id = params.get("id");
    // console.log(jsonString.Package_name)
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

    //   const {
    //     getCardNumberProps,
    //     getCardImageProps,
    //     getCVCProps,
    //     getExpiryDateProps,
    //     meta: { erroredInputs }
    //   } = useCreditCardValidator({ expiryDateValidator: expDateValidate });
    const {
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        wrapperProps,
        getCardImageProps,
    } = usePaymentInputs();
    // const validateExpirationDate = (expirationDate) => {
    //     const [month, year] = expirationDate.split("/");

    //     if (!month || !year || month.length !== 2 || year.length !== 2) {
    //         return false;
    //     }

    //     const currentYear = new Date().getFullYear() % 100;
    //     const currentMonth = new Date().getMonth() + 1;

    //     if (Number(month) < 1 || Number(month) > 12) {
    //         return false;
    //     }

    //     if (
    //         Number(year) < currentYear ||
    //         (Number(year) === currentYear && Number(month) < currentMonth)
    //     ) {
    //         return false;
    //     }

    //     return true;
    // };
    // const cardNumberProps = getCardNumberProps({
    //     onChange: (event) => {
    //       // Call both the card validator's onChange and your custom onChange
    //       handleInputChange(event);

    //     // const { name, value } = event.target;
    //     //         console.log(value)
    //   }
    //   });
    // const cvcProps = getCVCProps({
    //     onChange: (event) => {
    //       // Call both the card validator's onChange and your custom onChange
    //       handleInputChange(event);

    //     // const { name, value } = event.target;
    //     //         console.log(value)
    //   }
    //   });
    // const expiryProps = getExpiryDateProps({
    //     onChange: (event) => {
    //       // Call both the card validator's onChange and your custom onChange
    //       handleInputChange(event);

    //     // const { name, value } = event.target;
    //     //         console.log(value)
    //   }
    //   });
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
        if (!formValues.state.trim()) {
            toast.error("Please enter Your State");
            errors.state = true;
        }
        if (!formValues.city.trim()) {
            toast.error("Please enter Your City");
            errors.city = true;
        }
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
            formValues.cardNumber.replace(/\s/g, "").length
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
        // if (!expDateValidate(formValues.expiryDate)) {
        //     errors.expirationDate = true;
        // }

        // Validate CVV (3 to 4 digits)
        // if (
        //     !formValues.cvv ||
        //     formValues.cvv.length < 3 ||
        //     formValues.cvv.length > 4 ||
        //     !/^\d+$/.test(formValues.cvv)
        // ) {
        //     errors.cvv = true;
        // }
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
    useEffect(() => {
        const fetchCart = async () => {
            try {
                // window.alert("Fetching packages...");
                const CartData = await axios.post(
                    `${ApiRequest.getCart}`,
                    {
                        lead_id: lead_id,
                    },
                    {
                        headers: {
                            Authorization: AuthToken,
                        },
                    }
                );

                if (CartData && CartData.data) {
                    console.warn("Cart Fetched:", CartData.data);
                    setCartData(CartData.data);
                } else {
                    console.log("No cart found.");
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
                // window.alert("Failed to get packages");
            }
        };

        fetchCart();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();

        // toast.error(
        //     "There was an error submitting the form. Please try again."
        // );
        // If no errors, submit the form
        try {
            const errors = validate();
            setFormErrors(errors);
            console.log(formErrors);
            setIsSubmitting(true);
            if (Object.keys(errors).length === 0) {
                // console.log("Form submitted successfully", formValues);
                // toast.success("Form submitted successfully");
                // return;
                const response = await axios.post(
                    ApiRequest.leadPayment, // Replace with your actual API URL
                    {
                        lead_id: lead_id, // Include lead_id
                        lead_step: 6,
                        amount: cardData.total, // Include total_amount
                        card_num: formValues.cardNumber,
                        card_expiry_month: formValues.expiry__month,
                        card_expiry_year: formValues.expiry__year,
                        card_cvv: formValues.cvc || formValues.cvv,
                        card_address: formValues.address,
                        card_city: formValues.city,
                        card_state: formValues.state,
                        card_zip: formValues.zipCode,
                        card_name: formValues.cardHolderName,
                        // Spread the form values into the same object
                    },
                    {
                        headers: {
                            Authorization: AuthToken,
                            // "Content-Type": "application/json",
                        },
                    }
                );

                if (response.data.status === "success") {
                    console.log("Payment done successfully", formValues);
                    toast.success("Payment done successfully");
                    window.location.href = `/thank-you?id=${lead_id}`;
                } else {
                    console.log(response.data.status);
                    // console.log("Payment failed", formValues);
                    toast.error("Payment failed!");
                    setIsSubmitting(false);
                }
            } else {
                setIsSubmitting(false);
            }
        } catch (error) {
            toast.error("Payment failed!");
            setIsSubmitting(false);
        }
    };

    const [progressnumber, setProgressnumber] = useState({
        percent: "90%",
        topBarName: "Payment Details",
    });
    useEffect(() => {
        if (typeof window !== "undefined") {
            const fullPath = window.location.pathname;
            const segments = fullPath.split("/");
            const lastSegment = segments[segments.length - 1];

            const match = lastSegment.match(/^([a-zA-Z]+)(\d+)$/);

            let formatted = "";

            if (match) {
                const prefix = match[1];
                const numberPart = match[2];

                const capitalizedPrefix =
                    prefix.charAt(0).toUpperCase() +
                    prefix.slice(1).toLowerCase();

                formatted = `${capitalizedPrefix} ${numberPart}`;
            } else {
                formatted =
                    lastSegment.charAt(0).toUpperCase() +
                    lastSegment.slice(1).toLowerCase();
            }

            setStepName(formatted);
        }
    }, []);
    return (
        <>
            <SequenceLayout>
                <Helmet>
                    <title>Sequence {stepName} | (brandname)</title>
                </Helmet>
                <section>
                    <div className="container">
                        <Toaster position="top-right" reverseOrder={false} />
                        <Sidebar progressnumber={progressnumber} steps={false} />
                        <div className="row g-3">
                            <div className="col-12">
                                <div
                                    class="p-3 mb-4 rounded-3"
                                    role="alert"
                                    style={{
                                        background: "#fff3cd",
                                        color: "#664d03",
                                        border: "1px solid #ffecb5",
                                    }}
                                >
                                    <strong>Note:</strong> Please do not refresh
                                    or close this page while your payment is
                                    processing. Doing so may result in double
                                    charges or incomplete transactions. Your
                                    patience is appreciated as we securely
                                    process your payment.&nbsp;Thank&nbsp;you.
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className=" bg-white p-4 p-lg-5 rounded-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h2 className=" fw-semibold  font-xxs-25px font-md-40px mb-4 ">
                                            <span className=" text-primary">
                                                Payment
                                            </span>{" "}
                                            Details
                                        </h2>
                                        <span className="fw-bold  font-xxs-40px font-md-50px fst-italic ">
                                            {/* ${jsonString.Total_Price} */}
                                            {cardData?.total
                                                ? "$" + cardData.total
                                                : "...loading"}
                                        </span>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                {/* <img
                                                src="/assets-updated/img/payment.png"
                                                alt="payment image"
                                                width="234"
                                                height="35"
                                                className="object-fit-contain ms-auto mb-3"
                                            /> */}
                                                <input
                                                    type="text"
                                                    name="cardHolderName"
                                                    value={
                                                        formValues.cardHolderName
                                                    }
                                                    onChange={handleInputChange}
                                                    className={`form-control rounded-3 ps-4 font-xxxl-20px default-input ${
                                                        formErrors.cardHolderName
                                                            ? "border-danger"
                                                            : ""
                                                    }`}
                                                    placeholder="Card Holder Name"
                                                />
                                            </div>

                                            <div className="col-lg-3">
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formValues.address}
                                                    onChange={handleInputChange}
                                                    className={`form-control rounded-3 ps-4 font-xxxl-20px default-input ${
                                                        formErrors.address
                                                            ? "border-danger"
                                                            : ""
                                                    }`}
                                                    placeholder="Address"
                                                />
                                            </div>
                                            <div className="col-lg-3">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formValues.city}
                                                    onChange={handleInputChange}
                                                    className={`form-control rounded-3 ps-4 font-xxxl-20px default-input ${
                                                        formErrors.city
                                                            ? "border-danger"
                                                            : ""
                                                    }`}
                                                    placeholder="City"
                                                />
                                            </div>
                                            <div className="col-lg-3">
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={formValues.state}
                                                    onChange={handleInputChange}
                                                    className={`form-control rounded-3 ps-4 font-xxxl-20px default-input ${
                                                        formErrors.state
                                                            ? "border-danger"
                                                            : ""
                                                    }`}
                                                    placeholder="State"
                                                />
                                            </div>
                                            <div className="col-lg-3">
                                                <input
                                                    type="text"
                                                    name="zipCode"
                                                    value={formValues.zipCode}
                                                    onChange={handleInputChange}
                                                    className={`form-control rounded-3 ps-4 font-xxxl-20px default-input ${
                                                        formErrors.zipCode
                                                            ? "border-danger"
                                                            : ""
                                                    }`}
                                                    placeholder="Zip Code"
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <div
                                                    className={`form-control rounded-3 ps-4 font-xxxl-20px paymentcard-number py-0 d-flex gap-2 align-items-center ${
                                                        formErrors.cardNumber &&
                                                        formErrors.cardNumber
                                                            ? "border-danger"
                                                            : ""
                                                    }`}
                                                >
                                                    <svg
                                                        {...getCardImageProps({
                                                            images,
                                                        })}
                                                    />
                                                    <input
                                                        // type="number"

                                                        // className={`form-control rounded-3 ps-4 font-xxxl-20px paymentcard-number ${
                                                        //     formErrors.cardNumber
                                                        //         ? "border-danger"
                                                        //         : ""
                                                        // }`}
                                                        //   onChange={handleInputChange}
                                                        style={{
                                                            border: "0px",
                                                            padding: "0px",
                                                        }}
                                                        //   ref={inputRef}
                                                        //   {...cardNumberProps}
                                                        {...getCardNumberProps({
                                                            onChange: (e) =>
                                                                handleInputChange(
                                                                    e
                                                                ),
                                                        })}
                                                        // name="cardNumber"
                                                        // value={formValues.cardNumber}

                                                        // placeholder="xxxxxxxxxxxxxx"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div
                                                    className={`rounded-3 px-3 bg-white d-flex align-items-center justify-content-between form-control ${
                                                        formErrors.expiryDate ||
                                                        (formErrors.cvv &&
                                                            formErrors.cvc)
                                                            ? "border border-1 border-danger"
                                                            : ""
                                                    }`}
                                                >
                                                    <input
                                                        // type="text"
                                                        // name="expirationDate"
                                                        // value={
                                                        //     formValues.expirationDate
                                                        // }
                                                        // onChange={handleInputChange}
                                                        style={{
                                                            width: "100px",
                                                            minHeight: "auto",
                                                        }}
                                                        // placeholder="MM/YY"
                                                        // {...getExpiryDateProps()}
                                                        {...getExpiryDateProps({
                                                            onChange: (e) =>
                                                                handleInputChange(
                                                                    e
                                                                ),
                                                        })}
                                                        className={`border-0 bg-transparent payment-expiration-date ${
                                                            formErrors.expiryDate
                                                                ? "border-1 border-danger"
                                                                : ""
                                                        }`}
                                                    />
                                                    <div
                                                        className="bg-dark opacity-25"
                                                        style={{
                                                            width: "1px",
                                                            height: "29px",
                                                        }}
                                                    ></div>
                                                    <input
                                                        // type="text"
                                                        // name="cvv"
                                                        // value={formValues.cvv}
                                                        // onChange={handleInputChange}
                                                        className={`border-0 bg-transparent payment-cvv-code ${
                                                            formErrors.cvv
                                                                ? "border-danger"
                                                                : ""
                                                        }`}
                                                        style={{
                                                            minHeight: "auto",
                                                        }}
                                                        // placeholder="CVV"
                                                        // {...getCVCProps()}
                                                        {...getCVCProps({
                                                            onChange: (e) =>
                                                                handleInputChange(
                                                                    e
                                                                ),
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <button
                                                    type="submit"
                                                    className={`btn btn-secondary py-3 px-4 fw-semibold font-md-17px  lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-between text-uppercase paymentFormValidation ${
                                                        isSubmitting
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                    onClick={handleSubmit}
                                                    aria-disabled={isSubmitting}
                                                >
                                                    Pay Now
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <SidebarCardOld
                                    // title={retrievedStep4Data[0].lead_key}
                                    // price={totalPriceValue}
                                    timesmultiplied={quantityValue}
                                    step={6}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </SequenceLayout>
        </>
    );
};

export default Step6;
