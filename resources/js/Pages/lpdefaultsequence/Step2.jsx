import React, { useState, useContext, useEffect } from "react";
import { Sidebar } from "../../components/AllComponents";
import SequenceLayout from "../../Layouts/SequenceLayout";
import { Themecontext, ThemeProvider } from "../../ThemeContext";
import { ApiRequest } from "../../ApiRequest";
import axios from "../../axios";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import TagInput from "../../components/TagInput";

const Step2 = () => {
    const [stepName, setStepName] = useState("");
    const { isData, setData } = useContext(Themecontext);
    const retrievedData = JSON.parse(localStorage.getItem("step1")) || {};
    const retrievedData2 = JSON.parse(localStorage.getItem("step1.2")) || {
        data: [],
    };
    const targetObject =
        retrievedData2.data.find(
            (item) =>
                item.lead_key === "Select What You Are Trying To Protect?",
        ) || {};
    const AuthToken = import.meta.env.VITE_TOKEN;
    const leadValue = targetObject.lead_value || "";
    const hasName = leadValue.includes("Name");
    const hasSlogan = leadValue.includes("Slogan");
    const hasLogo = leadValue.includes("Logo");
    console.log(hasName, "Has Name");
    console.log(hasLogo, "Has Logo");
    console.log(hasSlogan, "Has Slogan");
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const id = params.get("id");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [protectLogoInColors, setProtectLogoInColors] = useState("no");
    const [usingThisTradeMark, setUsingThisTrademark] = useState("no");
    const [livingName, setLivingName] = useState("no");
    const [livingPerson, setlivingPerson] = useState("no");
    const [latinCharacters, setlatinCharacters] = useState("no");
    const [formData, setFormData] = useState({
        lead_id: id,
        lead_step: 2,
        data: [
            {
                question:
                    "Are You Currently Using This Trademark In Your Business? *",
                answer: "no",
                lead_type: "text",
                lead_step: 2,
                error: false,
            },
            {
                question: "Do You Want To Get International Trademark Also?",
                answer: "no",
                lead_type: "text",
                lead_step: 2,
                error: false,
            },
            {
                question:
                    "PLEASE PROVIDE A DESCRIPTION OF YOUR GOODS OR SERVICES ",
                answer: "",
                lead_type: "text",
                lead_step: 2,
                error: false,
            },
        ],
    });
    const findObjectByQuestion = (questionText) => {
        const targetObject = formData.data.find(
            (item) => item.question === questionText,
        );
        return (
            targetObject || { question: questionText, answer: "", error: false }
        );
    };
    const handleInputChange = (e, questionText) => {
        const { value } = e.target;
        if (
            questionText ===
            "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?"
        ) {
            setLivingName(value); // Use value directly
            // console.log("its changing", value);
        }
        if (
            questionText ===
            "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *"
        ) {
            setlivingPerson(value); // Use value directly
            // console.log("its changing", value);
        }
        if (
            questionText ===
            "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *"
        ) {
            setlatinCharacters(value); // Use value directly
            // console.log("its changing", value);
        }
        if (
            questionText ===
            "Do you want to be able to protect your logo in a variety of colors? *"
        ) {
            setProtectLogoInColors(value); // Use value directly
            // console.log("its changing", value);
        }
        if (
            questionText ===
            "Are You Currently Using This Trademark In Your Business? *"
        ) {
            setUsingThisTrademark(value); // Use value directly
            // console.log("its changing", value);
        }
        setFormData((prevState) => {
            const updatedData = prevState.data.map((item) =>
                item.question === questionText
                    ? { ...item, answer: value }
                    : item,
            );
            return { ...prevState, data: updatedData };
        });
    };

    useEffect(() => {
        let newQuestions = [];

        // Helper function to check if a question already exists
        const isQuestionPresent = (questionText) => {
            return formData.data.some((item) => item.question === questionText);
        };

        // Add questions related to Name/Slogan
        if (
            (hasName || hasSlogan) &&
            !isQuestionPresent(
                "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?",
            )
        ) {
            newQuestions.push({
                question:
                    "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?",
                answer: "no",
                lead_type: "text",
                lead_step: 2,
                error: false,
            });
        }

        if (
            (hasName || hasSlogan) &&
            !isQuestionPresent(
                "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *",
            )
        ) {
            newQuestions.push({
                question:
                    "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *",
                answer: "no",
                lead_type: "text",
                lead_step: 2,
                error: false,
            });
        }

        // Add questions related to Logo
        if (
            hasLogo &&
            !isQuestionPresent(
                "Do you want to be able to protect your logo in a variety of colors? *",
            )
        ) {
            newQuestions.push({
                question:
                    "Do you want to be able to protect your logo in a variety of colors? *",
                answer: "no",
                lead_type: "text",
                lead_step: 2,
                error: false,
            });
        }

        if (
            hasLogo &&
            !isQuestionPresent(
                "Enter any word(s), letter(s), and/or number(s) that appear in your logo. *",
            )
        ) {
            newQuestions.push({
                question:
                    "Enter any word(s), letter(s), and/or number(s) that appear in your logo. *",
                answer: "",
                lead_type: "text",
                lead_step: 2,
                error: false,
            });
        }

        // Add or remove colors question based on protectLogoInColors
        if (
            hasLogo &&
            protectLogoInColors === "no" &&
            !isQuestionPresent(
                "Please provide a list of the colors that appear in your logo.",
            )
        ) {
            newQuestions.push({
                question:
                    "Please provide a list of the colors that appear in your logo.",
                answer: "",
                lead_type: "text",
                lead_step: 2,
                error: false,
            });
        } else if (hasLogo && protectLogoInColors === "yes") {
            formData.data = formData.data.filter(
                (item) =>
                    item.question !==
                    "Please provide a list of the colors that appear in your logo.",
            );
        }
        if (
            livingName === "yes" &&
            !isQuestionPresent(
                "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *",
            )
        ) {
            newQuestions.push({
                question:
                    "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *",
                answer: "no",
                lead_type: "text",
                lead_step: 2,
                error: false,
            });
        } else if (livingName === "no") {
            formData.data = formData.data.filter(
                (item) =>
                    item.question !==
                    "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *",
            );
        }
        if (
            livingName === "yes" &&
            livingPerson === "yes" &&
            !isQuestionPresent(
                "What is the name of the living person in your mark? *",
            )
        ) {
            if (
                isQuestionPresent(
                    "Please type your name as it appears in the mark: *",
                )
            ) {
                formData.data = formData.data.filter(
                    (item) =>
                        item.question !==
                        "Please type your name as it appears in the mark: *",
                );
            }

            newQuestions.push({
                question:
                    "What is the name of the living person in your mark? *",
                answer: "",
                lead_type: "text",
                lead_step: 2,
                error: false,
            });
        } else if (
            livingPerson === "no" &&
            !isQuestionPresent(
                "Please type your name as it appears in the mark: *",
            )
        ) {
            if (
                livingName === "no" ||
                (livingPerson === "no" &&
                    isQuestionPresent(
                        "What is the name of the living person in your mark? *",
                    ))
            ) {
                formData.data = formData.data.filter(
                    (item) =>
                        item.question !==
                        "What is the name of the living person in your mark? *",
                );
            }
            if (livingName === "yes") {
                newQuestions.push({
                    question:
                        "Please type your name as it appears in the mark: *",
                    answer: "",
                    lead_type: "text",
                    lead_step: 2,
                    error: false,
                });
            }

            if (livingName === "no") {
                formData.data = formData.data.filter(
                    (item) =>
                        item.question !==
                        "Please type your name as it appears in the mark: *",
                );
            }
        } else {
            if (
                livingName === "no" ||
                (livingPerson === "no" &&
                    isQuestionPresent(
                        "What is the name of the living person in your mark? *",
                    ))
            ) {
                formData.data = formData.data.filter(
                    (item) =>
                        item.question !==
                        "What is the name of the living person in your mark? *",
                );
            }
            if (
                livingName === "no" ||
                (livingPerson === "yes" &&
                    !isQuestionPresent(
                        "Please type your name as it appears in the mark: *",
                    ))
            ) {
                formData.data = formData.data.filter(
                    (item) =>
                        item.question !==
                        "Please type your name as it appears in the mark: *",
                );
            }
            // console.log(newQuestions)
            // console.log(formData)
        }
        console.log(
            "Checking data",
            usingThisTradeMark === "yes",
            !isQuestionPresent("First use anywhere:"),
        );
        if (
            usingThisTradeMark === "yes" &&
            !isQuestionPresent("First use anywhere:")
        ) {
            newQuestions.push(
                {
                    question: "First use anywhere:",
                    answer: "",
                    lead_type: "text",
                    lead_step: 2,
                    error: false,
                },
                {
                    question: "First use commerce:",
                    answer: "",
                    lead_type: "text",
                    lead_step: 2,
                    error: false,
                },
                {
                    question:
                        "If you have any website, please mention the URL below",
                    answer: "",
                    lead_type: "text",
                    lead_step: 2,
                    error: false,
                },
                {
                    question:
                        "If you don't have a website, please mention where are you using your trademark in business",
                    answer: "",
                    lead_type: "text",
                    lead_step: 2,
                    error: false,
                },
            );
        } else if (usingThisTradeMark === "no") {
            // Remove all the specific questions related to "no"
            setFormData((prevState) => ({
                ...prevState,
                data: prevState.data.filter(
                    (item) =>
                        item.question !== "First use anywhere:" &&
                        item.question !== "First use commerce:" &&
                        item.question !==
                            "If you have any website, please mention the URL below" &&
                        item.question !==
                            "If you don't have a website, please mention where are you using your trademark in business",
                ),
            }));
        }
        if (
            latinCharacters === "yes" &&
            !isQuestionPresent(
                "Please provide the English translation or transliteration of any non-Latin characters or non-English words:",
            ) &&
            (hasName || hasSlogan)
        ) {
            // Please provide the English translation or transliteration of any non-Latin characters or non-English words:
            newQuestions.push({
                question:
                    "Please provide the English translation or transliteration of any non-Latin characters or non-English words:",
                answer: "",
                lead_type: "text",
                lead_step: 2,
                error: false,
            });
        } else if (
            latinCharacters === "no" &&
            isQuestionPresent(
                "Please provide the English translation or transliteration of any non-Latin characters or non-English words:",
            )
        ) {
            formData.data = formData.data.filter(
                (item) =>
                    item.question !==
                    "Please provide the English translation or transliteration of any non-Latin characters or non-English words:",
            );
        }

        // Only update formData if there are new questions
        if (newQuestions.length > 0) {
            setFormData((prevState) => ({
                ...prevState,
                data: [...prevState.data, ...newQuestions],
            }));
        }
    }, [
        hasName,
        hasSlogan,
        hasLogo,
        protectLogoInColors,
        usingThisTradeMark,
        livingName,
        livingPerson,
        latinCharacters,
    ]); // Removed formData.data from dependencies

    // const handleInputChange = (e, question) => {
    //     if (question === "Do you want to be able to protect your logo in a variety of colors? *") {
    //         setProtectLogoInColors(e.target.value);
    //     }
    //     setFormData((prevState) => {
    //         const index = prevState.data.findIndex((item) => item.question === question);
    //         if (index !== -1) {
    //             const updatedData = [...prevState.data];
    //             updatedData[index] = {
    //                 ...updatedData[index],
    //                 answer: e.target.value,
    //                 error: false,
    //             };
    //             return {
    //                 ...prevState,
    //                 data: updatedData,
    //             };
    //         }
    //         return prevState;
    //     });
    // };
    const handleTagChange = (tags) => {
        setFormData((prevState) => {
            const updatedData = prevState.data.map((item) => {
                if (
                    item.question ==
                    "Please provide a list of the colors that appear in your logo."
                ) {
                    return {
                        ...item,
                        answer: tags, // Update the answer with comma-separated tags
                    };
                }
                console.log(item);
                return item;
            });
            return {
                ...prevState,
                data: updatedData,
            };
        });
    };
    const validateForm = () => {
        const updatedData = formData.data.map((item) => ({
            ...item,
            error: !item.answer,
        }));

        setFormData((prev) => ({
            ...prev,
            data: updatedData,
        }));
        console.log("errors");
        console.warn(updatedData);
        return updatedData.every((item) => !item.error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        setIsSubmitting(true);
        if (!validateForm()) {
            setIsSubmitting(false);
            scrollToFirstError();
            return;
        }

        try {
            const data = await axios.post(ApiRequest.leadData, formData, {
                headers: {
                    Authorization: AuthToken,
                },
            });

            if (data) {
                setData(data);
                localStorage.setItem("step2", JSON.stringify(data?.data?.data));
                toast.success("Data Saved successfully!");
                setIsSubmitting(false);
                window.location.href = `/lp/sequence/step3?id=${id}`;
                return true;
            } else {
                setIsSubmitting(false);
                // return false;
            }
        } catch (error) {
            setIsSubmitting(false);
            console.error("Error:", error);
            toast.error("Error submitting the form");
        }
    };

    useEffect(() => {
        if (isData?.data?.id) {
            setFormData((prev) => ({
                ...prev,
                lead_id: isData.data.id,
            }));
        }
    }, [isData]);

    const [progressnumber, setProgressnumber] = useState({
        percent: "28%",
        topBarName: "Trademark Application Process",
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

    const scrollToFirstError = () => {
        setTimeout(() => {
            const fieldError = document.querySelector(
                ".border-danger, .scrollIntoView, .form-error",
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
        <SequenceLayout>
            <Helmet>
                <title>Sequence {stepName} | (brandname)</title>
            </Helmet>

            <section>
                <div className="container">
                    <Toaster position="top-right" reverseOrder={false} />
                    <Sidebar progressnumber={progressnumber} steps={false} />
                    <form
                        action=""
                        method="post"
                        className="p-3 p-lg-7 rounded-4 bg-white"
                    >
                        <div className="border-1 border-bottom mb-4">
                            <h1 className="fw-semibold font-xxs-20px font-md-25px d-block text-primary">
                                Dear{" "}
                                {retrievedData.name ? (
                                    retrievedData?.name
                                ) : (
                                    <>Client</>
                                )}
                            </h1>
                            <p>
                                {" "}
                                Answer below mentioned questions to help us
                                draft your paperwork for the trademark
                                registration process smoothly.
                            </p>
                        </div>

                        <div className="d-flex flex-column gap-4 mb-4">
                            {(hasName || hasSlogan) && (
                                <>
                                    <div className="border-1 border-bottom pb-4">
                                        <p
                                            className={`fw-semibold font-xxl-20px mb-0 d-block`}
                                            style={{
                                                color: findObjectByQuestion(
                                                    "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?",
                                                ).error
                                                    ? "red"
                                                    : "inherit",
                                            }}
                                        >
                                            {
                                                findObjectByQuestion(
                                                    "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?",
                                                ).question
                                            }
                                        </p>
                                        <div className="d-flex align-items-center gap-4 mt-3">
                                            <div className="form-check d-flex align-items-center gap-2 p-0">
                                                <input
                                                    className="form-check-input m-0"
                                                    type="radio"
                                                    value="yes"
                                                    id="questionYes0"
                                                    name={
                                                        findObjectByQuestion(
                                                            "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?",
                                                        ).question
                                                    }
                                                    checked={
                                                        findObjectByQuestion(
                                                            "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?",
                                                        ).answer === "yes"
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            findObjectByQuestion(
                                                                "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?",
                                                            ).question,
                                                        )
                                                    }
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                />
                                                <label
                                                    className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                                    htmlFor="questionYes0"
                                                    role="button"
                                                >
                                                    Yes
                                                </label>
                                            </div>

                                            <div className="form-check d-flex align-items-center gap-2 p-0">
                                                <input
                                                    className="form-check-input m-0"
                                                    type="radio"
                                                    value="no"
                                                    id="questionNo0"
                                                    name={
                                                        findObjectByQuestion(
                                                            "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?",
                                                        ).question
                                                    }
                                                    checked={
                                                        findObjectByQuestion(
                                                            "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?",
                                                        ).answer === "no"
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            findObjectByQuestion(
                                                                "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?",
                                                            ).question,
                                                        )
                                                    }
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                />
                                                <label
                                                    className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                                    htmlFor="questionNo0"
                                                    role="button"
                                                >
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {livingName === "yes" ? (
                                        <>
                                            <div className="border-1 border-bottom pb-4">
                                                <p
                                                    className={`fw-semibold font-xxl-20px mb-0 d-block`}
                                                    style={{
                                                        color: findObjectByQuestion(
                                                            "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *",
                                                        ).error
                                                            ? "red"
                                                            : "inherit",
                                                    }}
                                                >
                                                    {
                                                        findObjectByQuestion(
                                                            "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *",
                                                        ).question
                                                    }
                                                </p>
                                                <div className="d-flex align-items-center gap-4 mt-3">
                                                    <div className="form-check d-flex align-items-center gap-2 p-0">
                                                        <input
                                                            className="form-check-input m-0"
                                                            type="radio"
                                                            value="yes"
                                                            id="questionYes110"
                                                            name={
                                                                findObjectByQuestion(
                                                                    "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *",
                                                                ).question
                                                            }
                                                            checked={
                                                                findObjectByQuestion(
                                                                    "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *",
                                                                ).answer ===
                                                                "yes"
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e,
                                                                    findObjectByQuestion(
                                                                        "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *",
                                                                    ).question,
                                                                )
                                                            }
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                                            htmlFor="questionYes110"
                                                            role="button"
                                                        >
                                                            Yes
                                                        </label>
                                                    </div>

                                                    <div className="form-check d-flex align-items-center gap-2 p-0">
                                                        <input
                                                            className="form-check-input m-0"
                                                            type="radio"
                                                            value="no"
                                                            id="questionNo110"
                                                            name={
                                                                findObjectByQuestion(
                                                                    "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *",
                                                                ).question
                                                            }
                                                            checked={
                                                                findObjectByQuestion(
                                                                    "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *",
                                                                ).answer ===
                                                                "no"
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e,
                                                                    findObjectByQuestion(
                                                                        "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *",
                                                                    ).question,
                                                                )
                                                            }
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                                            htmlFor="questionNo110"
                                                            role="button"
                                                        >
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {livingPerson === "yes" ? (
                                                <>
                                                    <div className="border-1 border-bottom pb-4">
                                                        <label
                                                            className={`fw-semibold font-xxl-20px mb-0 d-block ${
                                                                findObjectByQuestion(
                                                                    "What is the name of the living person in your mark? *",
                                                                ).error
                                                                    ? "scrollIntoView"
                                                                    : " "
                                                            }`}
                                                            style={{
                                                                color: findObjectByQuestion(
                                                                    "What is the name of the living person in your mark? *",
                                                                ).error
                                                                    ? "red"
                                                                    : "inherit",
                                                            }}
                                                        >
                                                            {
                                                                findObjectByQuestion(
                                                                    "What is the name of the living person in your mark? *",
                                                                ).question
                                                            }
                                                        </label>

                                                        <div className="d-flex align-items-center gap-4 mt-3">
                                                            <input
                                                                className="form-control p-3 rounded-4"
                                                                placeholder="Please provide your details..."
                                                                type="text"
                                                                name={
                                                                    findObjectByQuestion(
                                                                        "What is the name of the living person in your mark? *",
                                                                    ).question
                                                                }
                                                                id={
                                                                    findObjectByQuestion(
                                                                        "What is the name of the living person in your mark? *",
                                                                    ).question
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        e,
                                                                        findObjectByQuestion(
                                                                            "What is the name of the living person in your mark? *",
                                                                        )
                                                                            .question,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <p className="fw-semibold pt-3">
                                                            Please note that you
                                                            will need the living
                                                            person's written
                                                            consent to the use
                                                            and registration of
                                                            the name before we
                                                            can file it.
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            {livingPerson === "no" ? (
                                                <>
                                                    <div className="border-1 border-bottom pb-4 sdf">
                                                        <label
                                                            className={`fw-semibold font-xxl-20px mb-0 d-block ${
                                                                findObjectByQuestion(
                                                                    "Please type your name as it appears in the mark: *",
                                                                ).error
                                                                    ? "scrollIntoView"
                                                                    : " "
                                                            }`}
                                                            style={{
                                                                color: findObjectByQuestion(
                                                                    "Please type your name as it appears in the mark: *",
                                                                ).error
                                                                    ? "red"
                                                                    : "inherit",
                                                            }}
                                                        >
                                                            {
                                                                findObjectByQuestion(
                                                                    "Please type your name as it appears in the mark: *",
                                                                ).question
                                                            }
                                                        </label>

                                                        <div className="d-flex align-items-center gap-4 mt-3">
                                                            <input
                                                                className="form-control p-3 rounded-4"
                                                                placeholder="Please provide your details..."
                                                                type="text"
                                                                name={
                                                                    findObjectByQuestion(
                                                                        "Please type your name as it appears in the mark: *",
                                                                    ).question
                                                                }
                                                                id={
                                                                    findObjectByQuestion(
                                                                        "Please type your name as it appears in the mark: *",
                                                                    ).question
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        e,
                                                                        findObjectByQuestion(
                                                                            "Please type your name as it appears in the mark: *",
                                                                        )
                                                                            .question,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    <div className="border-1 border-bottom pb-4">
                                        <p
                                            className={`fw-semibold font-xxl-20px mb-0 d-block`}
                                            style={{
                                                color: findObjectByQuestion(
                                                    "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *",
                                                ).error
                                                    ? "red"
                                                    : "inherit",
                                            }}
                                        >
                                            {
                                                findObjectByQuestion(
                                                    "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *",
                                                ).question
                                            }
                                        </p>
                                        <div className="d-flex align-items-center gap-4 mt-3">
                                            <div className="form-check d-flex align-items-center gap-2 p-0">
                                                <input
                                                    className="form-check-input m-0"
                                                    type="radio"
                                                    value="yes"
                                                    id="questionYes1"
                                                    name={
                                                        findObjectByQuestion(
                                                            "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *",
                                                        ).question
                                                    }
                                                    checked={
                                                        findObjectByQuestion(
                                                            "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *",
                                                        ).answer === "yes"
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            findObjectByQuestion(
                                                                "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *",
                                                            ).question,
                                                        )
                                                    }
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                />
                                                <label
                                                    className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                                    htmlFor="questionYes1"
                                                    role="button"
                                                >
                                                    Yes
                                                </label>
                                            </div>

                                            <div className="form-check d-flex align-items-center gap-2 p-0">
                                                <input
                                                    className="form-check-input m-0"
                                                    type="radio"
                                                    value="no"
                                                    id="questionNo1"
                                                    name={
                                                        findObjectByQuestion(
                                                            "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *",
                                                        ).question
                                                    }
                                                    checked={
                                                        findObjectByQuestion(
                                                            "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *",
                                                        ).answer === "no"
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            findObjectByQuestion(
                                                                "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *",
                                                            ).question,
                                                        )
                                                    }
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                />
                                                <label
                                                    className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                                    htmlFor="questionNo1"
                                                    role="button"
                                                >
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {latinCharacters === "yes" ? (
                                        <>
                                            <div className="border-1 border-bottom pb-4">
                                                <label
                                                    className={`fw-semibold font-xxl-20px mb-0 d-block ${
                                                        findObjectByQuestion(
                                                            "Please provide the English translation or transliteration of any non-Latin characters or non-English words:",
                                                        ).error
                                                            ? "scrollIntoView"
                                                            : " "
                                                    }`}
                                                    style={{
                                                        color: findObjectByQuestion(
                                                            "Please provide the English translation or transliteration of any non-Latin characters or non-English words:",
                                                        ).error
                                                            ? "red"
                                                            : "inherit",
                                                    }}
                                                >
                                                    {
                                                        findObjectByQuestion(
                                                            "Please provide the English translation or transliteration of any non-Latin characters or non-English words:",
                                                        ).question
                                                    }
                                                </label>

                                                <div className="d-flex align-items-center gap-4 mt-3">
                                                    <input
                                                        className="form-control p-3 rounded-4"
                                                        placeholder="Please provide your details..."
                                                        type="text"
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                findObjectByQuestion(
                                                                    "Please provide the English translation or transliteration of any non-Latin characters or non-English words:",
                                                                ).question,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}

                            {hasLogo && (
                                <>
                                    <div className="border-1 border-bottom pb-4">
                                        <p
                                            className={`fw-semibold font-xxl-20px mb-0 d-block`}
                                            style={{
                                                color: findObjectByQuestion(
                                                    "Do you want to be able to protect your logo in a variety of colors? *",
                                                ).error
                                                    ? "red"
                                                    : "inherit",
                                            }}
                                        >
                                            {
                                                findObjectByQuestion(
                                                    "Do you want to be able to protect your logo in a variety of colors? *",
                                                ).question
                                            }
                                        </p>
                                        <div className="d-flex align-items-center gap-4 mt-3">
                                            <div className="form-check d-flex align-items-center gap-2 p-0">
                                                <input
                                                    className="form-check-input m-0"
                                                    type="radio"
                                                    value="yes"
                                                    id="questionYes4"
                                                    name={
                                                        findObjectByQuestion(
                                                            "Do you want to be able to protect your logo in a variety of colors? *",
                                                        ).question
                                                    }
                                                    checked={
                                                        findObjectByQuestion(
                                                            "Do you want to be able to protect your logo in a variety of colors? *",
                                                        ).answer === "yes"
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            findObjectByQuestion(
                                                                "Do you want to be able to protect your logo in a variety of colors? *",
                                                            ).question,
                                                        )
                                                    }
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                />
                                                <label
                                                    className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                                    htmlFor="questionYes4"
                                                    role="button"
                                                >
                                                    Yes
                                                </label>
                                            </div>

                                            <div className="form-check d-flex align-items-center gap-2 p-0">
                                                <input
                                                    className="form-check-input m-0"
                                                    type="radio"
                                                    value="no"
                                                    id="questionNo4"
                                                    name={
                                                        findObjectByQuestion(
                                                            "Do you want to be able to protect your logo in a variety of colors? *",
                                                        ).question
                                                    }
                                                    checked={
                                                        findObjectByQuestion(
                                                            "Do you want to be able to protect your logo in a variety of colors? *",
                                                        ).answer === "no"
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            findObjectByQuestion(
                                                                "Do you want to be able to protect your logo in a variety of colors? *",
                                                            ).question,
                                                        )
                                                    }
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                />
                                                <label
                                                    className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                                    htmlFor="questionNo4"
                                                    role="button"
                                                >
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {protectLogoInColors === "no" ? (
                                        <div className="border-1 border-bottom pb-4">
                                            <label
                                                className={`fw-semibold font-xxl-20px mb-0 d-block`}
                                                style={{
                                                    color: findObjectByQuestion(
                                                        "Please provide a list of the colors that appear in your logo.",
                                                    ).error
                                                        ? "red"
                                                        : "inherit",
                                                }}
                                            >
                                                {
                                                    findObjectByQuestion(
                                                        "Please provide a list of the colors that appear in your logo.",
                                                    ).question
                                                }
                                            </label>
                                            <p
                                                className="mb-2"
                                                style={{ color: "#4c41f4" }}
                                            >
                                                {" "}
                                                Note: You can add multiple
                                                colors by pressing enter.
                                            </p>
                                            <div className="d-flex align-items-center gap-4 mt-3">
                                                <TagInput
                                                    onChange={handleTagChange}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    <div className="border-1 border-bottom pb-4">
                                        <label
                                            className={`fw-semibold font-xxl-20px mb-0 d-block ${
                                                findObjectByQuestion(
                                                    "Enter any word(s), letter(s), and/or number(s) that appear in your logo. *",
                                                ).error
                                                    ? "scrollIntoView"
                                                    : " "
                                            }`}
                                            style={{
                                                color: findObjectByQuestion(
                                                    "Enter any word(s), letter(s), and/or number(s) that appear in your logo. *",
                                                ).error
                                                    ? "red"
                                                    : "inherit",
                                            }}
                                        >
                                            {
                                                findObjectByQuestion(
                                                    "Enter any word(s), letter(s), and/or number(s) that appear in your logo. *",
                                                ).question
                                            }
                                        </label>
                                        <textarea
                                            className="form-control p-3 rounded-4"
                                            placeholder="Enter details..."
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    findObjectByQuestion(
                                                        "Enter any word(s), letter(s), and/or number(s) that appear in your logo. *",
                                                    ).question,
                                                )
                                            }
                                            style={{ minHeight: "100px" }}
                                        ></textarea>
                                    </div>
                                </>
                            )}
                            <div className="border-1 border-bottom pb-4">
                                <p
                                    className={`fw-semibold font-xxl-20px mb-0 d-block`}
                                    style={{
                                        color: findObjectByQuestion(
                                            "Are You Currently Using This Trademark In Your Business? *",
                                        ).error
                                            ? "red"
                                            : "inherit",
                                    }}
                                >
                                    {
                                        findObjectByQuestion(
                                            "Are You Currently Using This Trademark In Your Business? *",
                                        ).question
                                    }
                                </p>
                                <div className="d-flex align-items-center gap-4 mt-3">
                                    <div className="form-check d-flex align-items-center gap-2 p-0">
                                        <input
                                            className="form-check-input m-0"
                                            type="radio"
                                            value="yes"
                                            id="questionYes2"
                                            name={
                                                findObjectByQuestion(
                                                    "Are You Currently Using This Trademark In Your Business? *",
                                                ).question
                                            }
                                            checked={
                                                findObjectByQuestion(
                                                    "Are You Currently Using This Trademark In Your Business? *",
                                                ).answer === "yes"
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    findObjectByQuestion(
                                                        "Are You Currently Using This Trademark In Your Business? *",
                                                    ).question,
                                                )
                                            }
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                        <label
                                            className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                            htmlFor="questionYes2"
                                            role="button"
                                        >
                                            Yes
                                        </label>
                                    </div>

                                    <div className="form-check d-flex align-items-center gap-2 p-0">
                                        <input
                                            className="form-check-input m-0"
                                            type="radio"
                                            value="no"
                                            id="questionNo2"
                                            name={
                                                findObjectByQuestion(
                                                    "Are You Currently Using This Trademark In Your Business? *",
                                                ).question
                                            }
                                            checked={
                                                findObjectByQuestion(
                                                    "Are You Currently Using This Trademark In Your Business? *",
                                                ).answer === "no"
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    findObjectByQuestion(
                                                        "Are You Currently Using This Trademark In Your Business? *",
                                                    ).question,
                                                )
                                            }
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                        <label
                                            className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                            htmlFor="questionNo2"
                                            role="button"
                                        >
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {usingThisTradeMark === "yes" ? (
                                <>
                                    <div className="row mx-0 ">
                                        <div className="col-lg-6">
                                            <div className="border-1 border-bottom pb-4">
                                                <label
                                                    className={`fw-semibold font-xxl-20px mb-0 d-block ${
                                                        findObjectByQuestion(
                                                            "First use anywhere:",
                                                        ).error
                                                            ? "scrollIntoView"
                                                            : " "
                                                    }`}
                                                    style={{
                                                        color: findObjectByQuestion(
                                                            "First use anywhere:",
                                                        ).error
                                                            ? "red"
                                                            : "inherit",
                                                    }}
                                                >
                                                    {
                                                        findObjectByQuestion(
                                                            "First use anywhere:",
                                                        ).question
                                                    }
                                                </label>

                                                <div className="d-flex align-items-center gap-4 mt-3">
                                                    <input
                                                        className="form-control p-3 rounded-4"
                                                        placeholder="Please provide your details..."
                                                        type="date"
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                findObjectByQuestion(
                                                                    "First use anywhere:",
                                                                ).question,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="border-1 border-bottom pb-4">
                                                <label
                                                    className={`fw-semibold font-xxl-20px mb-0 d-block ${
                                                        findObjectByQuestion(
                                                            "First use commerce:",
                                                        ).error
                                                            ? "scrollIntoView"
                                                            : " "
                                                    }`}
                                                    style={{
                                                        color: findObjectByQuestion(
                                                            "First use commerce:",
                                                        ).error
                                                            ? "red"
                                                            : "inherit",
                                                    }}
                                                >
                                                    {
                                                        findObjectByQuestion(
                                                            "First use commerce:",
                                                        ).question
                                                    }
                                                </label>

                                                <div className="d-flex align-items-center gap-4 mt-3">
                                                    <input
                                                        className="form-control p-3 rounded-4"
                                                        placeholder="Please provide your details..."
                                                        type="date"
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                findObjectByQuestion(
                                                                    "First use commerce:",
                                                                ).question,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-1 border-bottom pb-4">
                                        <label
                                            className={`fw-semibold font-xxl-20px mb-0 d-block ${
                                                findObjectByQuestion(
                                                    "If you have any website, please mention the URL below",
                                                ).error
                                                    ? "scrollIntoView"
                                                    : " "
                                            }`}
                                            style={{
                                                color: findObjectByQuestion(
                                                    "If you have any website, please mention the URL below",
                                                ).error
                                                    ? "red"
                                                    : "inherit",
                                            }}
                                        >
                                            {
                                                findObjectByQuestion(
                                                    "If you have any website, please mention the URL below",
                                                ).question
                                            }
                                        </label>

                                        <div className="d-flex align-items-center gap-4 mt-3">
                                            <input
                                                className="form-control p-3 rounded-4"
                                                placeholder="Please provide your details..."
                                                type="text"
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        findObjectByQuestion(
                                                            "If you have any website, please mention the URL below",
                                                        ).question,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="border-1 border-bottom pb-4">
                                        <label
                                            className={`fw-semibold font-xxl-20px mb-0 d-block ${
                                                findObjectByQuestion(
                                                    "If you don't have a website, please mention where are you using your trademark in business",
                                                ).error
                                                    ? "scrollIntoView"
                                                    : " "
                                            }`}
                                            style={{
                                                color: findObjectByQuestion(
                                                    "If you don't have a website, please mention where are you using your trademark in business",
                                                ).error
                                                    ? "red"
                                                    : "inherit",
                                            }}
                                        >
                                            {
                                                findObjectByQuestion(
                                                    "If you don't have a website, please mention where are you using your trademark in business",
                                                ).question
                                            }
                                        </label>

                                        <div className="d-flex align-items-center gap-4 mt-3">
                                            <input
                                                className="form-control p-3 rounded-4"
                                                placeholder="Please provide your details..."
                                                type="text"
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        findObjectByQuestion(
                                                            "If you don't have a website, please mention where are you using your trademark in business",
                                                        ).question,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                            <div className="border-1 border-bottom pb-4">
                                <p
                                    className={`fw-semibold font-xxl-20px mb-0 d-block`}
                                    style={{
                                        color: findObjectByQuestion(
                                            "Do You Want To Get International Trademark Also?",
                                        ).error
                                            ? "red"
                                            : "inherit",
                                    }}
                                >
                                    {
                                        findObjectByQuestion(
                                            "Do You Want To Get International Trademark Also?",
                                        ).question
                                    }
                                </p>
                                <div className="d-flex align-items-center gap-4 mt-3">
                                    <div className="form-check d-flex align-items-center gap-2 p-0">
                                        <input
                                            className="form-check-input m-0"
                                            type="radio"
                                            name={
                                                findObjectByQuestion(
                                                    "Do You Want To Get International Trademark Also?",
                                                ).question
                                            }
                                            value="yes"
                                            id="questionYes3"
                                            checked={
                                                findObjectByQuestion(
                                                    "Do You Want To Get International Trademark Also?",
                                                ).answer === "yes"
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    findObjectByQuestion(
                                                        "Do You Want To Get International Trademark Also?",
                                                    ).question,
                                                )
                                            }
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                        <label
                                            className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                            htmlFor="questionYes3"
                                            role="button"
                                        >
                                            Yes
                                        </label>
                                    </div>

                                    <div className="form-check d-flex align-items-center gap-2 p-0">
                                        <input
                                            className="form-check-input m-0"
                                            type="radio"
                                            value="no"
                                            id="questionNo3"
                                            name={
                                                findObjectByQuestion(
                                                    "Do You Want To Get International Trademark Also?",
                                                ).question
                                            }
                                            checked={
                                                findObjectByQuestion(
                                                    "Do You Want To Get International Trademark Also?",
                                                ).answer === "no"
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    findObjectByQuestion(
                                                        "Do You Want To Get International Trademark Also?",
                                                    ).question,
                                                )
                                            }
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                        <label
                                            className="form-check-label font-xxl-20px hover_opacity-08 fw-semibold"
                                            htmlFor="questionNo3"
                                            role="button"
                                        >
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <span
                                className={`fw-semibold font-xxl-20px mb-2 d-block ${
                                    findObjectByQuestion(
                                        "PLEASE PROVIDE A DESCRIPTION OF YOUR GOODS OR SERVICES ",
                                    ).error
                                        ? "scrollIntoView"
                                        : ""
                                }`}
                                style={{
                                    color: findObjectByQuestion(
                                        "PLEASE PROVIDE A DESCRIPTION OF YOUR GOODS OR SERVICES ",
                                    ).error
                                        ? "red"
                                        : "inherit",
                                }}
                            >
                                PLEASE PROVIDE A DESCRIPTION OF YOUR GOODS OR
                                SERVICES
                            </span>
                            <p>
                                {" "}
                                Start describing the goods and services related
                                to your mark. (brandname) compares the
                                description you provide and automatically
                                provides descriptions from the USPTO ID manual
                                for your consideration.
                            </p>
                            <textarea
                                className="form-control p-3 rounded-4"
                                placeholder="Please provide your details..."
                                onChange={(e) =>
                                    handleInputChange(
                                        e,
                                        findObjectByQuestion(
                                            "PLEASE PROVIDE A DESCRIPTION OF YOUR GOODS OR SERVICES ",
                                        ).question,
                                    )
                                }
                                style={{ minHeight: "150px" }}
                            ></textarea>
                        </div>

                        <ul className="mt-5 text-center text-md-end">
                            <li>
                                <a
                                    href="/step3"
                                    className="btn btn-secondary py-3 px-4 fw-semibold font-md-17px text-white lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-between text-uppercase"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Processing.."
                                        : "Continue To The Next Step"}
                                </a>
                            </li>
                        </ul>
                    </form>
                </div>
            </section>
        </SequenceLayout>
    );
};

export default Step2;
