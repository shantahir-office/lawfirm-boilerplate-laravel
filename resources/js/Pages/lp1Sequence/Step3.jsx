import React, { useState, useContext, useEffect } from "react";

import StepperProgress from "../../components/StepperProgress";
import SequenceLayout from "../../Layouts/SequenceLayout";
import { Themecontext, ThemeProvider } from "../../ThemeContext";
import { ApiRequest } from "../../ApiRequest";
import axios from "../../axios";
import { fromJSON } from "postcss";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import countries from "./countries";
const Step3 = () => {
    const [stepName, setStepName] = useState("");
    const retrievedStep1Data = JSON.parse(localStorage.getItem("step1"));
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const lead_id = params.get("id");
    const [owners, setOwners] = useState([]);
    const [isOrganization, setIsOrganization] = useState(false);
    const [showUSState, setShowUSState] = useState(false);
    const [showNonUSState, setShowNonUSState] = useState(false);
    const AuthToken = import.meta.env.VITE_TOKEN;
    const simplifiedOwners = owners
        .map((ownerGroup, groupIndex) => {
            return ownerGroup.map((field) => ({
                question: `${groupIndex + 1}. ${field.question}`, // Add group index before the question
                answer: field.answer,
                lead_type: field.lead_type,
                lead_step: field.lead_step,
                error: field.error,
                index: field.index,
                required: field.required,
            }));
        })
        .flat(); // Flatten the array

    // console.log(simplifiedOwners);
    // Flatten the array here

    // console.log(simplifiedOwners);

    const states = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
    ];
    // const [first, setfirst] = useState(second)
    const [formData, setFormData] = useState({
        lead_id: lead_id,
        lead_step: 3,
        data: [
            {
                question:
                    "Will The Trademark Be Owned By An Individual Or An Entity Such As A Corporation Or LLC? *",
                answer: "Individual",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "0",
                required: true,
            },
            {
                question: "Formation",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "1",
                required: false,
            },

            {
                question: "Organization Name",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "2",
                required: false,
            },
            {
                question: "Organization Type",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "3",
                required: false,
            },
            {
                question: "Country Of Formation",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "4",
                required: false,
            },
            {
                question: "State Of Formation",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "5",
                required: false,
            },
            {
                question: "Name",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "6",
                required: true,
            },
            {
                question: "Position",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "7",
                required: false,
            },
            {
                question: "Address",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "8",
                required: true,
            },
            {
                question: "Country of Citizenship",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "9",
                required: true,
            },
            {
                question: "State",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "10",
                required: true,
            },
            {
                question: "City",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "11",
                required: true,
            },
            {
                question: "ZipCode",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "12",
                required: true,
            },
            {
                question: "Phone",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "13",
                required: true,
            },
            {
                question: "Email",
                answer: "",
                lead_type: "text",
                lead_step: 3,
                error: false,
                index: "14",
                required: true,
            },
        ],
    });

        // Utilities at top-level (inside component)
    const setRequiredFor = (indexes, required) => {
        setFormData((prev) => ({
            ...prev,
            data: prev.data.map((it) =>
                indexes.includes(it.index)
                    ? { ...it, required, error: false }
                    : it
            ),
        }));
    };

    const setAnswerFor = (index, value) => {
        setFormData((prev) => ({
            ...prev,
            data: prev.data.map((it) =>
                it.index === index ? { ...it, answer: value, error: false } : it
            ),
        }));
    };

    const handleOwnershipChange = (value, questionIndex) => {
        setAnswerFor(questionIndex, value);

        if (questionIndex === "0") {
            const isOrg = value === "Organization";
            setIsOrganization(isOrg);
            setRequiredFor(["1", "2", "3", "7"], isOrg);

            if (!isOrg) {
          
                setShowUSState(false);
                setShowNonUSState(false);
                setRequiredFor(["4", "5"], false);
                ["1", "2", "3", "4", "5", "7"].forEach((idx) =>
                    setAnswerFor(idx, "")
                );
            }
        }

        if (questionIndex === "1") {
         
            const isUS = value === "US-Based";
            setShowUSState(isUS);
            setShowNonUSState(!isUS);

            if (isUS) {
                setRequiredFor(["5"], true);
                setRequiredFor(["4"], false);
                setAnswerFor("4", "USA");

            } else {

                setRequiredFor(["4"], true);
                setRequiredFor(["5"], false);
                setAnswerFor("5", ""); 
            }
        }
    };
    const validatePhone = (phone) => {
        // Basic phone number validation (adjust regex as needed)
        const phoneRegex =
            /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    };

    const validateEmail = (email) => {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleChange = (e, index) => {
        const value = e.target.value;
        setFormData((prevState) => {
            if (index !== -1) {
                const updatedData = [...prevState.data];
                updatedData[index] = {
                    ...updatedData[index],
                    answer: value,
                    error: updatedData[index].required && !value, // Set error if required and empty
                };

                // Additional validation for phone and email
                if (index === 13) {
                    // Phone field
                    updatedData[index].error = !validatePhone(value);
                } else if (index === 14) {
                    // Email field
                    updatedData[index].error = !validateEmail(value);
                }

                return {
                    ...prevState,
                    data: updatedData,
                };
            }
            return prevState;
        });
    };

    const handleChange2 = (e, index) => {
        const value = e;
        setFormData((prevState) => {
            if (index !== -1) {
                const updatedData = [...prevState.data];
                updatedData[index] = {
                    ...updatedData[index],
                    answer: value,
                    error: updatedData[index].required && !value, // Set error if required and empty
                };

                // Additional validation for phone and email
                if (index === 13) {
                    // Phone field
                    updatedData[index].error = !validatePhone(value);
                } else if (index === 14) {
                    // Email field
                    updatedData[index].error = !validateEmail(value);
                }

                return {
                    ...prevState,
                    data: updatedData,
                };
            }
            return prevState;
        });
    };

    const validateForm = () => {
        const updatedData = formData.data.map((item) => {
            if (item.required) {
                let error = !item.answer; // Set error if required and empty

                // Additional validation for phone and email
                if (item.index === "13") {
                    // Phone field
                    error = !validatePhone(item.answer);
                } else if (item.index === "14") {
                    // Email field
                    error = !validateEmail(item.answer);
                }

                return {
                    ...item,
                    error: error,
                };
            }
            return item;
        });

        setFormData((prev) => ({
            ...prev,
            data: updatedData,
        }));

        // Return true if all required fields are filled and valid, false otherwise
        return updatedData.every((item) => !item.error || !item.required);
    };
    const handleAddOwner = () => {
        const isValid = validateForm();
        if (!isValid) {
            // Handle invalid form (e.g., show an alert or display error messages)
            toast.error("Please submit all the required fields");
            scrollToFirstError();
            return;
        }
        const newOwner = formData.data.filter((item) => item.required);
        setOwners((prev) => [...prev, newOwner]);
        // console.log(owners)

        setFormData({
            lead_id: lead_id,
            lead_step: 3,
            data: [
                {
                    question:
                        "Will The Trademark Be Owned By An Individual Or An Entity Such As A Corporation Or LLC? *",
                    answer: "Individual",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "0",
                    required: true,
                },
                {
                    question: "Formation",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "1",
                    required: false,
                },

                {
                    question: "Organization Name",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "2",
                    required: false,
                },
                {
                    question: "Organization Type",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "3",
                    required: false,
                },
                {
                    question: "Country Of Formation",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "4",
                    required: false,
                },
                {
                    question: "State Of Formation",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "5",
                    required: false,
                },
                {
                    question: "Name",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "6",
                    required: true,
                },
                {
                    question: "Position",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "7",
                    required: false,
                },
                {
                    question: "Address",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "8",
                    required: true,
                },
                {
                    question: "Country of Citizenship",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "9",
                    required: true,
                },
                {
                    question: "State",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "10",
                    required: true,
                },
                {
                    question: "City",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "11",
                    required: true,
                },
                {
                    question: "ZipCode",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "12",
                    required: true,
                },
                {
                    question: "Phone",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "13",
                    required: true,
                },
                {
                    question: "Email",
                    answer: "",
                    lead_type: "text",
                    lead_step: 3,
                    error: false,
                    index: "14",
                    required: true,
                },
            ],
        });
    };

    const handleDeleteOwner = (index) => {
        setOwners((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const filteredAnswers = formData.data.filter(item => item.answer != "");

            // return;
            const data = await axios.post(
                ApiRequest.leadData,
                {
                    lead_id: lead_id,
                    lead_step: 3,
                    data: simplifiedOwners,
                },
                {
                    headers: {
                        Authorization: AuthToken,
                        // "Content-Type": "application/json",
                    },
                }
            );
            if (data) {
                if (data?.data?.status == "success") {
                    localStorage.setItem(
                        "step3",
                        JSON.stringify(data?.data?.data)
                    );
                    // handleAddOwner();
                    setFormData({
                        lead_id: lead_id,
                        lead_step: 3,
                        data: [
                            {
                                question:
                                    "Will The Trademark Be Owned By An Individual Or An Entity Such As A Corporation Or LLC? *",
                                answer: "Individual",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "0",
                                required: true,
                            },
                            {
                                question: "Formation",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "1",
                                required: false,
                            },

                            {
                                question: "Organization Name",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "2",
                                required: false,
                            },
                            {
                                question: "Organization Type",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "3",
                                required: false,
                            },
                            {
                                question: "Country Of Formation",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "4",
                                required: false,
                            },
                            {
                                question: "State Of Formation",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "5",
                                required: false,
                            },
                            {
                                question: "Name",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "6",
                                required: true,
                            },
                            {
                                question: "Position",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "7",
                                required: false,
                            },
                            {
                                question: "Address",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "8",
                                required: true,
                            },
                            {
                                question: "Country of Citizenship",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "9",
                                required: true,
                            },
                            {
                                question: "State",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "10",
                                required: true,
                            },
                            {
                                question: "City",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "11",
                                required: true,
                            },
                            {
                                question: "ZipCode",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "12",
                                required: true,
                            },
                            {
                                question: "Phone",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "13",
                                required: true,
                            },
                            {
                                question: "Email",
                                answer: "",
                                lead_type: "text",
                                lead_step: 3,
                                error: false,
                                index: "14",
                                required: true,
                            },
                        ],
                    });
                    window.location.href = `/lp-1/sequence/step4?id=${lead_id}`;
                }
            }
        } catch (error) {
            console.error("Error:", error);
            // alert("Error submitting the form");
            toast.error("Error Submitting the form");
        }
    };
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

       const scrollToFirstError = () => {
        setTimeout(() => {
            const fieldError = document.querySelector(".border-danger, .scrollIntoView, .form-error");
            if (fieldError) {
                fieldError.scrollIntoView({ behavior: "smooth", block: "center" });
                fieldError.focus();
            }
        }, 0);
    };

    return (
        <SequenceLayout>
            <Helmet>
                <title>Sequence {stepName} | (brandname)</title>
            </Helmet>
            <section className="pt-5">
                <div className="container">
                    <Toaster position="top-right" reverseOrder={false} />
                    <StepperProgress currentStep={3} totalSteps={6} />
                    <form
                        onSubmit={handleSubmit}
                        className="p-3 p-lg-7 rounded-4 bg-white"
                    >
                        <div className="border-1 border-bottom mb-4">
                            <span className="fw-semibold font-xxs-20px font-md-25px d-block text-primary">
                                Dear{" "}
                                {retrievedStep1Data.name ? (
                                    retrievedStep1Data?.name
                                ) : (
                                    <>Client Name</>
                                )}
                            </span>
                            <p>
                                Next step is to fill out the below given Initial
                                Assessment Form (IAF), which is mandatory.
                            </p>
                        </div>

                        <div className="d-flex flex-column gap-4 border-1 border-bottom mb-4 pb-4">
                            <div>
                                <p className="fw-semibold font-xxl-20px mb-0 d-block">
                                    Will The Trademark Be Owned By An Individual
                                    Or An Entity Such As A Corporation Or LLC? *
                                </p>
                                <div className="d-flex align-items-center gap-4 mt-3">
                                    <div className="form-check d-flex align-items-center gap-2 p-0">
                                        <input
                                            className="form-check-input m-0"
                                            type="radio"
                                            name="ownership"
                                            id="Individual"
                                            value="Individual"
                                            checked={
                                                formData.data[0].answer ==
                                                "Individual"
                                            }
                                            required={formData.data[0].required}
                                            onChange={(e) =>
                                                handleOwnershipChange(
                                                    e.target.value,
                                                    formData.data[0].index
                                                )
                                            }
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                        <label
                                            className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                            htmlFor="Individual"
                                            role="button"
                                        >
                                            Individual
                                        </label>
                                    </div>

                                    <div className="form-check d-flex align-items-center gap-2 p-0">
                                        <input
                                            className="form-check-input m-0"
                                            type="radio"
                                            name="ownership"
                                            id="Organization"
                                            value="Organization"
                                            checked={
                                                formData.data[0].answer ==
                                                "Organization"
                                            }
                                            required={formData.data[0].required}
                                            onChange={(e) =>
                                                handleOwnershipChange(
                                                    e.target.value,
                                                    formData.data[0].index
                                                )
                                            }
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                        <label
                                            className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                            htmlFor="Organization"
                                            role="button"
                                        >
                                            Organization
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {isOrganization && (
                                <>
                                    <div>
                                        <p className="fw-semibold font-xxl-20px mb-0 d-block">
                                            Formation *
                                        </p>
                                        <div className="d-flex align-items-center gap-4 mt-3">
                                            <div className="form-check d-flex align-items-center gap-2 p-0">
                                                <input
                                                    className={`form-check-input m-0 ${
                                                        formData.data[1].error
                                                            ? "border border-danger"
                                                            : ""
                                                    }`}
                                                    type="radio"
                                                    name="Formation"
                                                    id="US-Based"
                                                    value="US-Based"
                                                    required={
                                                        formData.data[1]
                                                            .required
                                                    }
                                                    onChange={(e) => {
                                                        handleOwnershipChange(
                                                            e.target.value,
                                                            formData.data[1]
                                                                .index
                                                        );
                                                        handleChange2(
                                                            "USA",
                                                            formData.data[4]
                                                                .index
                                                        );
                                                    }}
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                />
                                                <label
                                                    className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                                    htmlFor="US-Based"
                                                    role="button"
                                                >
                                                    US Based
                                                </label>
                                            </div>

                                            <div className="form-check d-flex align-items-center gap-2 p-0">
                                                <input
                                                    className={`form-check-input m-0 ${
                                                        formData.data[1].error
                                                            ? "border border-danger"
                                                            : ""
                                                    }`}
                                                    type="radio"
                                                    name="Formation"
                                                    id="Non-US-Based"
                                                    value="Non-US-Based"
                                                    required={
                                                        formData.data[1]
                                                            .required
                                                    }
                                                    onChange={(e) => {
                                                        handleOwnershipChange(
                                                            e.target.value,
                                                            formData.data[1]
                                                                .index
                                                        );
                                                        // handleChange2(
                                                        //     e.target.value,
                                                        //     formData.data[5]
                                                        //         .index
                                                        // );
                                                    }}
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                />
                                                <label
                                                    className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                                    htmlFor="Non-US-Based"
                                                    role="button"
                                                >
                                                    Non US Based
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row g-4">
                                        <div className="col-md-6 col-lg-4">
                                            <label
                                                htmlFor=""
                                                className="fw-semibold font-xxl-22px mb-2 d-block"
                                            >
                                                Organization Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="organizationName"
                                                className={`form-control p-3 rounded-4 ${
                                                    formData.data[2].error
                                                        ? "border border-danger"
                                                        : ""
                                                }`}
                                                required={
                                                    formData.data[2].required
                                                }
                                                value={formData.data[2].answer}
                                                placeholder="Organization Name *"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        formData.data[2].index
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <label
                                                htmlFor=""
                                                className="fw-semibold font-xxl-22px mb-2 d-block"
                                            >
                                                Organization Type *
                                            </label>
                                            <select
                                                name="organizationType"
                                                className={`form-control p-3 rounded-4 ${
                                                    formData.data[3].error
                                                        ? "border border-danger"
                                                        : ""
                                                }`}
                                                required={
                                                    formData.data[3].required
                                                }
                                               value={formData.data[3].answer}
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        formData.data[3].index
                                                    )
                                                }
                                            >
                                                <option value="" disabled>
                                                    Select Organization Type
                                                </option>{" "}
                                                {/* value "" */}
                                                <option value="Corporation">
                                                    Corporation
                                                </option>
                                                <option value="LLC">
                                                    Limited Liability Company
                                                    (LLC)
                                                </option>
                                                <option value="Partnership">
                                                    Partnership
                                                </option>
                                                <option value="Non-Profit Corporation">
                                                    Non-Profit Corporation
                                                </option>
                                                <option value="Non-Profit Organization">
                                                    Non-Profit Organization
                                                </option>
                                                <option value="Other Business Type">
                                                    Other Business Type
                                                </option>
                                                <option value="C Corporation">
                                                    C Corporation
                                                </option>
                                                <option value="S Corporation">
                                                    S Corporation
                                                </option>
                                                <option value="Trust">
                                                    Trust
                                                </option>
                                            </select>
                                        </div>
                                        <div
                                            className="col-md-6 col-lg-4"
                                            style={{
                                                display: showUSState
                                                    ? "block"
                                                    : "none",
                                            }}
                                        >
                                            <label
                                                htmlFor=""
                                                className="fw-semibold font-xxl-22px mb-2 d-block"
                                            >
                                                State Of Formation *
                                            </label>
                                            <select
                                                name="Stateoffoundation"
                                                className={`form-control p-3 rounded-4 ${
                                                    formData.data[5].error
                                                        ? "border border-danger"
                                                        : ""
                                                }`}
                                                defaultValue={0}
                                                required={
                                                    formData.data[5].required
                                                }
                                                onChange={(e) => {
                                                    handleChange(
                                                        e,
                                                        formData.data[5].index
                                                    );
                                                    // Add the second function here
                                                }}
                                            >
                                                <option value="0" disabled>
                                                    Select State
                                                </option>
                                                {states.map((state, index) => (
                                                    <option
                                                        key={index}
                                                        value={state}
                                                    >
                                                        {state}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div
                                            className="col-md-6 col-lg-4"
                                            style={{
                                                display: showNonUSState
                                                    ? "block"
                                                    : "none",
                                            }}
                                        >
                                            <label
                                                htmlFor=""
                                                className="fw-semibold font-xxl-22px mb-2 d-block"
                                            >
                                                Country of Foundation *
                                            </label>
                                            <select
                                                name="country of foundation"
                                                className={`form-control p-3 rounded-4 ${
                                                    formData.data[4].error
                                                        ? "border border-danger"
                                                        : ""
                                                }`}
                                                defaultValue={
                                                    formData.data[4].answer
                                                }
                                                required={
                                                    formData.data[4].required
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        formData.data[4].index
                                                    )
                                                }
                                            >
                                                <option value="" disabled>
                                                    Select Country
                                                </option>
                                                {countries.map((country) => (
                                                    <option
                                                        key={country.code}
                                                        value={country.name}
                                                    >
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div>
                            <div className="row g-4">
                                <div className="col-lg-4">
                                    <label
                                        htmlFor=""
                                        className="fw-semibold font-xxl-22px mb-2 d-block"
                                    >
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control w-100 rounded-3 bg-white ps-4 ${
                                            formData.data[6].error
                                                ? "border border-danger"
                                                : ""
                                        }`}
                                        style={{
                                            background: "#F5F5F5",
                                        }}
                                        placeholder="Name *"
                                        value={formData.data[6].answer}
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                formData.data[6].index
                                            )
                                        }
                                    />
                                </div>
                                {isOrganization && (
                                    <div className="col-lg-4">
                                        <label
                                            htmlFor=""
                                            className="fw-semibold font-xxl-22px mb-2 d-block"
                                        >
                                            Position *
                                        </label>
                                        <input
                                            type="text"
                                            name="position"
                                            className={`form-control w-100 rounded-3 bg-white ps-4 ${
                                                formData.data[7].error
                                                    ? "border border-danger"
                                                    : ""
                                            }`}
                                            style={{
                                                background: "#F5F5F5",
                                            }}
                                            placeholder="Position *"
                                            value={formData.data[7].answer}
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    formData.data[7].index
                                                )
                                            }
                                        />
                                    </div>
                                )}
                                <div className="col-lg-4">
                                    <label
                                        htmlFor=""
                                        className="fw-semibold font-xxl-22px mb-2 d-block"
                                    >
                                        Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        className={`form-control w-100 rounded-3 bg-white ps-4 ${
                                            formData.data[8].error
                                                ? "border border-danger"
                                                : ""
                                        }`}
                                        style={{
                                            background: "#F5F5F5",
                                        }}
                                        placeholder="Address *"
                                        value={formData.data[8].answer}
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                formData.data[8].index
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label
                                        htmlFor=""
                                        className="fw-semibold font-xxl-22px mb-2 d-block"
                                    >
                                        Country Of CitizenShip *
                                    </label>
                                    <select
                                        name="country"
                                        className={`form-control p-3 rounded-4 ${
                                            formData.data[9].error
                                                ? "border border-danger"
                                                : ""
                                        }`}
                                        defaultValue={formData.data[9].answer}
                                        required={formData.data[9].required}
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                formData.data[9].index
                                            )
                                        }
                                    >
                                        <option value="" disabled>
                                            Select Country
                                        </option>
                                        {countries.map((country) => (
                                            <option
                                                key={country.code}
                                                value={country.name}
                                            >
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-lg-4">
                                    <label
                                        htmlFor=""
                                        className="fw-semibold font-xxl-22px mb-2 d-block"
                                    >
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        className={`form-control w-100 rounded-3 bg-white ps-4 ${
                                            formData.data[10].error
                                                ? "border border-danger"
                                                : ""
                                        }`}
                                        style={{
                                            background: "#F5F5F5",
                                        }}
                                        placeholder="State*"
                                        value={formData.data[10].answer}
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                formData.data[10].index
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label
                                        htmlFor=""
                                        className="fw-semibold font-xxl-22px mb-2 d-block"
                                    >
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        className={`form-control w-100 rounded-3 bg-white ps-4 ${
                                            formData.data[11].error
                                                ? "border border-danger"
                                                : ""
                                        }`}
                                        style={{
                                            background: "#F5F5F5",
                                        }}
                                        placeholder="City*"
                                        value={formData.data[11].answer}
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                formData.data[11].index
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label
                                        htmlFor=""
                                        className="fw-semibold font-xxl-22px mb-2 d-block"
                                    >
                                        Zip/Postal Code *
                                    </label>
                                    <input
                                        type="text"
                                        name="zip"
                                        className={`form-control w-100 rounded-3 bg-white ps-4 ${
                                            formData.data[12].error
                                                ? "border border-danger"
                                                : ""
                                        }`}
                                        style={{
                                            background: "#F5F5F5",
                                        }}
                                        placeholder="Zip/Postal Code*"
                                        value={formData.data[12].answer}
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                formData.data[12].index
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label
                                        htmlFor=""
                                        className="fw-semibold font-xxl-22px mb-2 d-block"
                                    >
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className={`form-control w-100 rounded-3 bg-white ps-4 ${
                                            formData.data[13].error
                                                ? "border border-danger"
                                                : ""
                                        }`}
                                        style={{
                                            background: "#F5F5F5",
                                        }}
                                        placeholder="Phone*"
                                        value={formData.data[13].answer}
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                formData.data[13].index
                                            )
                                        }
                                    />
                                    {formData.data[13].error && (
                                        <small className="text-danger">
                                            Please enter a valid phone number.
                                        </small>
                                    )}
                                </div>
                                <div className="col-lg-4">
                                    <label
                                        htmlFor=""
                                        className="fw-semibold font-xxl-22px mb-2 d-block"
                                    >
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control w-100 rounded-3 bg-white ps-4 ${
                                            formData.data[14].error
                                                ? "border border-danger"
                                                : ""
                                        }`}
                                        style={{
                                            background: "#F5F5F5",
                                        }}
                                        placeholder="Email*"
                                        value={formData.data[14].answer}
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                formData.data[14].index
                                            )
                                        }
                                    />
                                    {formData.data[14].error && (
                                        <small className="text-danger">
                                            Please enter a valid email address.
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className=" mt-5 table-responsive">
                            <table
                                className="table align-middle m-0"
                                style={{ "--cstm-table-bg": "white" }}
                            >
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Country</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {owners.map((ownerGroup, groupIndex) => (
                                        <tr key={groupIndex}>
                                            {/* Render specific fields */}
                                            <td>
                                                {ownerGroup.find(
                                                    (field) =>
                                                        field.index === "6"
                                                )?.answer || "N/A"}
                                            </td>{" "}
                                            {/* Name */}
                                            <td>
                                                {ownerGroup.find(
                                                    (field) =>
                                                        field.index === "14"
                                                )?.answer || "N/A"}
                                            </td>{" "}
                                            {/* Email */}
                                            <td>
                                                {ownerGroup.find(
                                                    (field) =>
                                                        field.index === "13"
                                                )?.answer || "N/A"}
                                            </td>{" "}
                                            {/* Phone */}
                                            <td>
                                                {ownerGroup.find(
                                                    (field) =>
                                                        field.index === "9"
                                                )?.answer || "N/A"}
                                            </td>{" "}
                                            {/* Country */}
                                            <td className="text-center">
                                                <button
                                                    onClick={() =>
                                                        handleDeleteOwner(
                                                            groupIndex
                                                        )
                                                    }
                                                    className="rounded-2 p-2 d-inline-flex align-items-center justify-content-center hover_opacity-08"
                                                    style={{
                                                        background: "#FFEBEB",
                                                        border: "none",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <img
                                                        src="/sequence-assets\assets-updated\img\icons/trash.svg"
                                                        alt="trash"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex gap-3 flex-wrap">
                            <button
                                type="button"
                                className="btn btn-outline-dark mt-3"
                                // onClick={handleSubmit}
                                onClick={handleAddOwner}
                            >
                                Add More Owners
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-dark mt-3"
                                // onClick={handleSubmit}
                                onClick={handleAddOwner}
                            >
                                Save Information
                            </button>
                        </div>
                        <ul className="mt-5 text-center text-md-end">
                            <li>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    // onClick={(e) =>
                                    //     (window.location.href = `/lp-1/sequence/step4?id=${lead_id}`)
                                    // }
                                    // style={owners.length === 0 ? { display: "none" } : { display: "block" }}
                                    className={`btn btn-secondary py-3 px-4 fw-semibold font-md-17px text-white lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-between text-uppercase ${
                                        owners.length === 0
                                            ? "d-none"
                                            : "d-inline-flex"
                                    }`}
                                >
                                    Continue To The Next Step
                                </button>
                            </li>
                        </ul>
                    </form>
                </div>
            </section>
        </SequenceLayout>
    );
};

export default Step3;
