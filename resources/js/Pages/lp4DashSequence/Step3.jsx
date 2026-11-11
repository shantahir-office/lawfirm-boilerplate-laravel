import React, { useState, useEffect, useContext } from "react";
import { Sidebar } from "../../components/AllComponents";
import SequenceLayout from "../../Layouts/SequenceLayout";
import { Themecontext } from "../../ThemeContext";
import { ApiRequest } from "../../ApiRequest";
import axios from "../../axios";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import TagInput from "../../components/TagInput";
import countries from "./countries";
import { useLocation } from "react-router-dom";
import StepperProgress from "../../components/StepperProgress";
const Step2And3 = () => {
    const openChatWidget = () => {
        window.postMessage(
            { method: "showWebWidget", type: "cd360Api", apiType: "liveChat" },
            "*"
        );
    };
    // STEP2 START
    const { isData, setData } = useContext(Themecontext);
    // const retrievedData = JSON.parse(localStorage.getItem("step1")) || {};
    // const retrievedData2 = JSON.parse(localStorage.getItem("step1.2")) || {
    //     data: [],
    // };
    const AuthToken = import.meta.env.VITE_TOKEN;
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const id = params.get("id");
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
                }
            );
            console.log(retrievedData1, "retrievedData1");
            setretrievedData2(retrievedData1);
        } catch (error) {
            console.error("Error fetching retrieved data:", error);
        }
    }
    async function getLeadData(id, AuthToken) {
        try {
            const response = await axios.get(`api/leads/${id}`, {
                headers: {
                    Authorization: AuthToken,
                },
            });

            // Access the data as needed
            setretrievedData(response.data);
            console.log(response.data, "retrievedData2");
        } catch (error) {
            console.error("Error fetching retrieved data:", error);
        }
    }

    // return true;
    // console.log(retrievedData3, "retrievedData3");

    // const retrievedData2 = getRetrievedData(id, AuthToken);
    // const retrievedData3 = getLeadData(id, AuthToken);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [failedPayment, setfailedPayment] = useState(true);
    const [retrievedData, setretrievedData] = useState({});
    const [retrievedData2, setretrievedData2] = useState({});
    const targetObject2 = retrievedData2?.data?.leadData?.find(
        (item) =>
            item.lead_key ===
            "Will the Trademark Be Owned By An Individual Or Organization?"
    );
    const targetObject = retrievedData2?.data?.leadData?.find(
        (item) => item.lead_key === "Select What You Are Trying To Protect?"
    );
    const leadValue = targetObject?.lead_value;
    const leadValue2 = targetObject2?.lead_value;
    console.log(leadValue2, "leadValue2");
    console.log(retrievedData2, "retrievedData2");
    const hasName = leadValue?.includes("Name");
    const hasSlogan = leadValue?.includes("Slogan");
    const hasLogo = leadValue?.includes("Logo");
    console.log(hasName, "Has Name");
    // console.log(hasLogo, "Has Logo");
    // console.log(hasSlogan, "Has Slogan");
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
            (item) => item.question === questionText
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
                    : item
            );
            return { ...prevState, data: updatedData };
        });
    };

    useEffect(() => {
        let newQuestions = [];
        getRetrievedData(id, AuthToken);
        // Helper function to check if a question already exists
        const isQuestionPresent = (questionText) => {
            return formData.data.some((item) => item.question === questionText);
        };

        // Add questions related to Name/Slogan
        if (
            (hasName || hasSlogan) &&
            !isQuestionPresent(
                "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?"
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
                "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *"
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
                "Do you want to be able to protect your logo in a variety of colors? *"
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
                "Enter any word(s), letter(s), and/or number(s) that appear in your logo. *"
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
                "Please provide a list of the colors that appear in your logo."
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
                    "Please provide a list of the colors that appear in your logo."
            );
        }
        if (
            livingName === "yes" &&
            !isQuestionPresent(
                "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *"
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
                    "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *"
            );
        }
        if (
            livingName === "yes" &&
            livingPerson === "yes" &&
            !isQuestionPresent(
                "What is the name of the living person in your mark? *"
            )
        ) {
            if (
                isQuestionPresent(
                    "Please type your name as it appears in the mark: *"
                )
            ) {
                formData.data = formData.data.filter(
                    (item) =>
                        item.question !==
                        "Please type your name as it appears in the mark: *"
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
                "Please type your name as it appears in the mark: *"
            )
        ) {
            if (
                livingName === "no" ||
                (livingPerson === "no" &&
                    isQuestionPresent(
                        "What is the name of the living person in your mark? *"
                    ))
            ) {
                formData.data = formData.data.filter(
                    (item) =>
                        item.question !==
                        "What is the name of the living person in your mark? *"
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
                        "Please type your name as it appears in the mark: *"
                );
            }
        } else {
            if (
                livingName === "no" ||
                (livingPerson === "no" &&
                    isQuestionPresent(
                        "What is the name of the living person in your mark? *"
                    ))
            ) {
                formData.data = formData.data.filter(
                    (item) =>
                        item.question !==
                        "What is the name of the living person in your mark? *"
                );
            }
            if (
                livingName === "no" ||
                (livingPerson === "yes" &&
                    !isQuestionPresent(
                        "Please type your name as it appears in the mark: *"
                    ))
            ) {
                formData.data = formData.data.filter(
                    (item) =>
                        item.question !==
                        "Please type your name as it appears in the mark: *"
                );
            }
            // console.log(newQuestions)
            // console.log(formData)
        }
        console.log(
            "Checking data",
            usingThisTradeMark === "yes",
            !isQuestionPresent("First use anywhere:")
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
                }
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
                            "If you don't have a website, please mention where are you using your trademark in business"
                ),
            }));
        }
        if (
            latinCharacters === "yes" &&
            !isQuestionPresent(
                "Please provide the English translation or transliteration of any non-Latin characters or non-English words:"
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
                "Please provide the English translation or transliteration of any non-Latin characters or non-English words:"
            )
        ) {
            formData.data = formData.data.filter(
                (item) =>
                    item.question !==
                    "Please provide the English translation or transliteration of any non-Latin characters or non-English words:"
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
        // async function getRetrievedData(id, AuthToken) {
        //     try {
        //         const retrievedData = await axios.post(
        //             ApiRequest.getStepData,
        //             {
        //                 lead_id: id,
        //                 step: 1
        //             },
        //             {
        //                 headers: {
        //                     Authorization: AuthToken,
        //                 },
        //             }
        //         );
        //         console.log(retrievedData.data, "retrievedData");
        //     } catch (error) {
        //         console.error("Error fetching retrieved data:", error);
        //     }
        // }
        // getRetrievedData(id, AuthToken);
        // console.log(retrievedData, "retrievedData");
        // return true;
        console.log(formData);
        setIsSubmitting(true);
        if (!validateForm()) {
            setIsSubmitting(false);
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
                window.location.href = `/lp-4/sequence/step4?id=${id}`;
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
        percent: "60%",
        topBarName: "Trademark Application Process",
        // topBarDescription:
        //     "Fill out this brief form given below. It will take less than 60 seconds to complete it!",
    });
    // --- Step 2 State and Logic ---
    // Copy all Step2 useState, useEffect, handlers here
    // e.g.:
    // const [step2FormData, setStep2FormData] = useState({...});
    // function handleStep2InputChange(...) {...}
    // function handleStep2Submit(...) {...}

    // --- Step 3 State and Logic ---
    // Copy all Step3 useState, useEffect, handlers here
    // e.g.:
    // const [step3FormData, setStep3FormData] = useState({...});
    // function handleStep3InputChange(...) {...}
    // function handleStep3Submit(...) {...}

    // --- Combined Submit Handler ---

    // Step3
    // const retrievedStep1Data = JSON.parse(localStorage.getItem("step1"));
    const [retrievedStep1Data, setretrievedstep1Data] = useState([]);
    const [retrievedStep1Data2, setretrievedstep1Data2] = useState([]);
    // const url = window.location.href;
    // const urlObj = new URL(url);
    // const params = new URLSearchParams(urlObj.search);
    const lead_id = params.get("id");
    const [owners, setOwners] = useState([]);
    const [isOrganization, setIsOrganization] = useState(false);
    const [showUSState, setShowUSState] = useState(false);
    const [showNonUSState, setShowNonUSState] = useState(false);
    // const AuthToken = import.meta.env.VITE_TOKEN;

    console.log("is it org", leadValue2 === "Organization");
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
                }
            );
            console.log(retrievedData1.data.leadData, "retrievedData");
            setretrievedData2(retrievedData1);
            setretrievedstep1Data2(retrievedData1.data.leadData);
        } catch (error) {
            console.error("Error fetching retrieved data:", error);
        }
    }
    // const [first, setfirst] = useState(second)
    const [formData3, setformData3] = useState({
        lead_id: lead_id,
        lead_step: 3,
        data: [
            {
                question:
                    "Will The Trademark Be Owned By An Individual Or An Entity Such As A Corporation Or LLC? *",
                answer: leadValue2,
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

    const handleOwnershipChange = (value, questionIndex) => {
        setformData3((prevformData3) => {
            let updatedData = prevformData3.data.map((item) => {
                // If changing ownership type (Individual/Organization)
                if (questionIndex === "0") {
                    if (item.index === "0") {
                        return { ...item, answer: value };
                    }
                    // Organization fields
                    if (["1", "2", "3", "4", "5"].includes(item.index)) {
                        if (value === "Organization") {
                            // Set required for org fields, but formation/country/state depend on formation value
                            if (item.index === "1")
                                return { ...item, required: true };
                            if (item.index === "2")
                                return { ...item, required: true };
                            if (item.index === "3")
                                return { ...item, required: true };
                            if (item.index === "4")
                                return {
                                    ...item,
                                    required:
                                        prevformData3.data[1].answer ===
                                        "Non-US-Based",
                                };
                            if (item.index === "5")
                                return {
                                    ...item,
                                    required:
                                        prevformData3.data[1].answer ===
                                        "US-Based",
                                };
                        } else {
                            // Not org, not required
                            return {
                                ...item,
                                required: false,
                                answer: "",
                                error: false,
                            };
                        }
                    }
                    return item;
                }
                // If changing formation (US-Based/Non-US-Based)
                if (questionIndex === "1") {
                    if (item.index === "1") {
                        return { ...item, answer: value, required: true };
                    }
                    if (item.index === "4") {
                        return { ...item, required: value === "Non-US-Based" };
                    }
                    if (item.index === "5") {
                        return { ...item, required: value === "US-Based" };
                    }
                    return item;
                }
                return item;
            });

            return { ...prevformData3, data: updatedData };
        });

        // Update UI state for showing/hiding fields
        if (questionIndex === "0") {
            setIsOrganization(value === "Organization");
            // Show/hide formation fields based on current formation value
            const formationValue = formData3.data[1].answer;
            setShowUSState(formationValue === "US-Based");
            setShowNonUSState(formationValue === "Non-US-Based");
        }
        if (questionIndex === "1") {
            setShowUSState(value === "US-Based");
            setShowNonUSState(value === "Non-US-Based");
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
        setformData3((prevState) => {
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
        setformData3((prevState) => {
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

    // ...existing code...

    const validateForm3 = () => {
        const isOrg = formData3.data[0].answer === "Organization";
        const formationValue = formData3.data[1].answer;

        const updatedData = formData3.data.map((item) => {
            let error = false;
            let required = item.required;

            if (isOrg) {
                // Always required for organization
                if (
                    [
                        "1",
                        "2",
                        "3",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                    ].includes(item.index)
                ) {
                    required = true;
                }
                // Conditional required
                if (item.index === "4") {
                    // Country of Formation
                    required = formationValue === "Non-US-Based";
                }
                if (item.index === "5") {
                    // State of Formation
                    required = formationValue === "US-Based";
                }

                // Error logic
                if (item.index === "1") {
                    // Formation
                    error = !["US-Based", "Non-US-Based"].includes(item.answer);
                }
                if (item.index === "2") {
                    // Organization Name
                    error = !item.answer.trim();
                }
                if (item.index === "3") {
                    // Organization Type
                    error = !item.answer || item.answer === "0";
                }
                if (item.index === "4" && required) {
                    // Country of Formation
                    error = !item.answer;
                }
                if (item.index === "5" && required) {
                    // State of Formation
                    error = !item.answer || item.answer === "0";
                }
                if (
                    ["6", "7", "8", "9", "10", "11", "12", "13", "14"].includes(
                        item.index
                    )
                ) {
                    error = !item.answer;
                }
                if (item.index === "13") {
                    // Phone
                    error = !validatePhone(item.answer);
                }
                if (item.index === "14") {
                    // Email
                    error = !validateEmail(item.answer);
                }
            } else {
                // Not organization: not required for org fields
                if (["1", "2", "3", "4", "5", "7"].includes(item.index)) {
                    required = false;
                    error = false;
                }
                // Still required for individual: 6,8,9,10,11,12,13,14
                if (
                    ["6", "8", "9", "10", "11", "12", "13", "14"].includes(
                        item.index
                    )
                ) {
                    required = true;
                    error = !item.answer;
                    if (item.index === "13")
                        error = !validatePhone(item.answer);
                    if (item.index === "14")
                        error = !validateEmail(item.answer);
                }
            }

            return { ...item, required, error };
        });

        setformData3((prev) => ({
            ...prev,
            data: updatedData,
        }));

        return updatedData
            .filter((item) => item.required)
            .every((item) => !item.error);
    };

    // ...existing code...
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
    const handleAddOwner = () => {
        const isValid = validateForm3();
        if (!isValid) {
            toast.error("Please fill all required fields for Organization.");
            scrollToFirstError();
            return;
        }
        // Only add required and filled fields
        const filteredAnswers = formData3.data.filter(
            (item) => item.required || item.answer
        );
        setOwners((prev) => [...prev, filteredAnswers]);

        // Reset form but keep ownership type
        setformData3((prev) => ({
            ...prev,
            data: prev.data.map((item, idx) => ({
                ...item,
                answer: idx === 0 ? prev.data[0].answer : "",
                error: false,
            })),
        }));
    };

    const handleDeleteOwner = (index) => {
        setOwners((prev) => prev.filter((_, i) => i !== index));
    };
    useEffect(() => {
        setIsOrganization(leadValue2 === "Organization");
    }, [leadValue2]);
    useEffect(() => {
        if (leadValue2) {
            setformData3((prev) => ({
                ...prev,
                data: prev.data.map((item, idx) =>
                    idx === 0 ? { ...item, answer: leadValue2 } : item
                ),
            }));
        }
    }, [leadValue2]);
    const handleSubmit3 = async (e) => {
        e.preventDefault();

        try {
            // const filteredAnswers = formData3.data.filter(item => item.answer != "");

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
                    setformData3({
                        lead_id: lead_id,
                        lead_step: 3,
                        data: [
                            {
                                question:
                                    "Will The Trademark Be Owned By An Individual Or An Entity Such As A Corporation Or LLC? *",
                                answer: leadValue2,
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
                    window.location.href = `/lp-4/sequence/step4?id=${lead_id}`;
                }
            }
        } catch (error) {
            console.error("Error:", error);
            // alert("Error submitting the form");
            toast.error("Error Submitting the form");
        }
    };
    const handleCombinedSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // 1. Validate Step 3 (owners)
        let isStep3Valid = true;
        if (owners.length === 0) {
            // Only validate owner fields if no owners have been added
            isStep3Valid = validateForm3();
            if (!isStep3Valid) {
                toast.error(
                    "Please fill all required owner fields or add at least one owner."
                );
                scrollToFirstError();
                setIsSubmitting(false);
                return;
            }
        }

        // 2. Validate Step 2 (main form)
        const isStep2Valid = validateForm();
        if (!isStep2Valid) {
            toast.error("Please fill all required trademark fields correctly.");
            scrollToFirstError();
            setIsSubmitting(false);
            return;
        }

        // 3. Submit Step 3 (owners)
        try {
            const ownersRes = await axios.post(
                ApiRequest.leadData,
                {
                    lead_id: lead_id,
                    lead_step: 3,
                    data: simplifiedOwners,
                },
                {
                    headers: { Authorization: AuthToken },
                }
            );
            if (!ownersRes || ownersRes?.data?.status !== "success") {
                toast.error("Failed to save owner information.");
                setIsSubmitting(false);
                return;
            }
            localStorage.setItem(
                "step3",
                JSON.stringify(ownersRes?.data?.data)
            );
        } catch (error) {
            toast.error("Error submitting owner information.");
            setIsSubmitting(false);
            return;
        }

        // 4. Submit Step 2 (main form)
        try {
            const step2Res = await axios.post(ApiRequest.leadData, formData, {
                headers: { Authorization: AuthToken },
            });
            if (!step2Res || step2Res?.data?.status !== "success") {
                toast.error("Failed to save trademark information.");
                setIsSubmitting(false);
                return;
            }
            setData(step2Res);
            localStorage.setItem("step2", JSON.stringify(step2Res?.data?.data));
            toast.success("Data Saved successfully!");
            setIsSubmitting(false);
            window.location.href = `/lp-4/sequence/step4?id=${lead_id}`;
        } catch (error) {
            toast.error("Error submitting trademark information.");
            setIsSubmitting(false);
        }
    };
    const scrollToFirstError = () => {
        setTimeout(() => {
            const fieldError = document.querySelector(".border-danger, .scrollIntoView");
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
                <title>Sequence Step 3 |  (brandname)</title>
            </Helmet>
            <section className="pt-5">
                <div className="container">
                    {failedPayment ? (
                        <>
                            <div
                                className="mx-auto mb-4 d-lg-block d-none"
                                style={{
                                    maxWidth: "660px",
                                }}
                            >
                                <span className=" bg-success text-white fw-semibold p-1 d-inline-block"
                                style={{
                                    backgroundColor: "#079f07",
                                }}>
                                    Attention!
                                </span>
                                <div className=" d-flex align-items-center gap-2 border border-success px-3">
                                    <img
                                        src="/sequence-assets/img/icons/greenicon.webp"
                                        alt="warninig"
                                        width={20}
                                        height={20}
                                    />
                                    <span className=" font-xxs-12px font-md-15px text-uppercase fw-medium">
                                        Your Payment for Trademark Has Been
                                        Received Successfully.
                                    </span>
                                </div>
                            </div>
                            <div
                                className="mx-auto mb-4 d-lg-none d-block bg-white"
                                style={{
                                    maxWidth: "660px",
                                    position: "sticky",
                                    zIndex: 9999,
                                    top: 0,
                                    left: 0,
                                }}
                            >
                                <span className=" bg-success text-white fw-semibold p-1 d-inline-block">
                                    Attention!
                                </span>
                                <div className=" d-flex align-items-center gap-2 border border-success px-3">
                                    <img
                                        src="/sequence-assets/img/icons/greenicon.webp"
                                        alt="warninig"
                                        width={20}
                                        height={20}
                                    />
                                    <span className=" font-xxs-12px font-md-15px text-uppercase fw-medium">
                                        Your Payment for Trademark Has Been
                                        Recieved Successfully.
                                    </span>
                                </div>
                            </div>
                        </>
                    ) : null}
                   <StepperProgress currentStep={3} totalSteps={4} />
                    <Toaster position="top-right" reverseOrder={false} />
                    <form onSubmit={handleCombinedSubmit} noValidate>
                        {/* STEP 3 */}
                        <div className="p-3 p-lg-5 rounded-2 mt-n5">
                            <span className="h5 d-block">
                                Dear {" "}
                                {retrievedStep1Data.name ? (
                                    retrievedStep1Data?.name
                                ) : (
                                    <>Client Name</>
                                )}
                            </span>
                            <p>
                                Please answer the following questions to help us
                                draft your Trademark Application and get it
                                processed smoothly. In case you need any help,
                                you can contact us via{" "}
                                <a
                                    href="#"
                                    className=" text-dark"
                                    onClick={openChatWidget}
                                >
                                    Chat
                                </a>{" "}
                                or call us at{" "}
                                 <a href={`tel:${window.varConfig.phone}`} className=" text-dark"> {window.varConfig.phone} </a>
                                .
                            </p>
                        </div>

                         <div className="p-3" style={{ background: "#f3f3f3" }}>
                            <div className="p-3 p-md-4">
                                <div className="d-flex flex-column gap-4 border-1 border-bottom mb-4 pb-4">
                                    <div>
                                        <h2 className=" fw-bold">
                                            Owner Details.
                                        </h2>
                                        <p className="fw-semibold mb-4 d-block">
                                            Please confirm your selection and
                                            provide details. You can update the
                                            selected type of ownership
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
                                                        formData3.data[0]
                                                            .answer ==
                                                        "Individual"
                                                    }
                                                    required={
                                                        formData3.data[0]
                                                            .required
                                                    }
                                                    onChange={(e) =>
                                                        handleOwnershipChange(
                                                            e.target.value,
                                                            formData3.data[0]
                                                                .index
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
                                                        formData3.data[0]
                                                            .answer ==
                                                        "Organization"
                                                    }
                                                    required={
                                                        formData3.data[0]
                                                            .required
                                                    }
                                                    onChange={(e) =>
                                                        handleOwnershipChange(
                                                            e.target.value,
                                                            formData3.data[0]
                                                                .index
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
                                                                formData3
                                                                    .data[1]
                                                                    .error
                                                                    ? "border border-danger"
                                                                    : ""
                                                            }`}
                                                            type="radio"
                                                            name="Formation"
                                                            id="US-Based"
                                                            value="US-Based"
                                                            required={
                                                                formData3
                                                                    .data[1]
                                                                    .required
                                                            }
                                                            onChange={(e) => {
                                                                handleOwnershipChange(
                                                                    e.target
                                                                        .value,
                                                                    formData3
                                                                        .data[1]
                                                                        .index
                                                                );
                                                                if (
                                                                    e.target
                                                                        .value ===
                                                                    "US-Based"
                                                                ) {
                                                                    handleChange2(
                                                                        "USA",
                                                                        formData3
                                                                            .data[4]
                                                                            .index
                                                                    );
                                                                }
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
                                                                formData3
                                                                    .data[1]
                                                                    .error
                                                                    ? "border border-danger"
                                                                    : ""
                                                            }`}
                                                            type="radio"
                                                            name="Formation"
                                                            id="Non-US-Based"
                                                            value="Non-US-Based"
                                                            required={
                                                                formData3
                                                                    .data[1]
                                                                    .required
                                                            }
                                                            onChange={(e) => {
                                                                handleOwnershipChange(
                                                                    e.target
                                                                        .value,
                                                                    formData3
                                                                        .data[1]
                                                                        .index
                                                                );
                                                                // handleChange2(
                                                                //     e.target.value,
                                                                //     formData3.data[5]
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
                                                            formData3.data[2]
                                                                .error
                                                                ? "border border-danger"
                                                                : ""
                                                        }`}
                                                        required={
                                                            formData3.data[2]
                                                                .required
                                                        }
                                                        value={
                                                            formData3.data[2]
                                                                .answer
                                                        }
                                                        placeholder="Organization Name *"
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e,
                                                                formData3
                                                                    .data[2]
                                                                    .index
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
                                                            formData3.data[3]
                                                                .error
                                                                ? "border border-danger"
                                                                : ""
                                                        }`}
                                                        required={
                                                            formData3.data[3]
                                                                .required
                                                        }
                                                        defaultValue={0}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e,
                                                                formData3
                                                                    .data[3]
                                                                    .index
                                                            )
                                                        }
                                                    >
                                                        <option
                                                            value="0"
                                                            disabled
                                                        >
                                                            Select Organization
                                                            Type
                                                        </option>
                                                        <option value="Corporation">
                                                            Corporation
                                                        </option>
                                                        <option value="LLC">
                                                            Limited Liability
                                                            Company (LLC)
                                                        </option>
                                                        <option value="Partnership">
                                                            Partnership
                                                        </option>
                                                        <option value="Non-Profit Corporation">
                                                            Non-Profit
                                                            Corporation
                                                        </option>
                                                        <option value="Non-Profit Organization">
                                                            Non-Profit
                                                            Organization
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
                                                            formData3.data[5]
                                                                .error
                                                                ? "border border-danger"
                                                                : ""
                                                        }`}
                                                        defaultValue={0}
                                                        required={
                                                            formData3.data[5]
                                                                .required
                                                        }
                                                        onChange={(e) => {
                                                            handleChange(
                                                                e,
                                                                formData3
                                                                    .data[5]
                                                                    .index
                                                            );
                                                            // Add the second function here
                                                        }}
                                                    >
                                                        <option
                                                            value="0"
                                                            disabled
                                                        >
                                                            Select State
                                                        </option>
                                                        {states.map(
                                                            (state, index) => (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        state
                                                                    }
                                                                >
                                                                    {state}
                                                                </option>
                                                            )
                                                        )}
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
                                                            formData3.data[4]
                                                                .error
                                                                ? "border border-danger"
                                                                : ""
                                                        }`}
                                                        defaultValue={
                                                            formData3.data[4]
                                                                .answer
                                                        }
                                                        required={
                                                            formData3.data[4]
                                                                .required
                                                        }
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e,
                                                                formData3
                                                                    .data[4]
                                                                    .index
                                                            )
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Select Country
                                                        </option>
                                                        {countries.map(
                                                            (country) => (
                                                                <option
                                                                    key={
                                                                        country.code
                                                                    }
                                                                    value={
                                                                        country.name
                                                                    }
                                                                >
                                                                    {
                                                                        country.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
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
                                                    formData3.data[6].error
                                                        ? "border border-danger"
                                                        : ""
                                                }`}
                                                style={{
                                                    background: "#F5F5F5",
                                                }}
                                                placeholder="Name *"
                                                value={formData3.data[6].answer}
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        formData3.data[6].index
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
                                                        formData3.data[7].error
                                                            ? "border border-danger"
                                                            : ""
                                                    }`}
                                                    style={{
                                                        background: "#F5F5F5",
                                                    }}
                                                    placeholder="Position *"
                                                    value={
                                                        formData3.data[7].answer
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(
                                                            e,
                                                            formData3.data[7]
                                                                .index
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
                                                    formData3.data[8].error
                                                        ? "border border-danger"
                                                        : ""
                                                }`}
                                                style={{
                                                    background: "#F5F5F5",
                                                }}
                                                placeholder="Address *"
                                                value={formData3.data[8].answer}
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        formData3.data[8].index
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
                                                    formData3.data[9].error
                                                        ? "border border-danger"
                                                        : ""
                                                }`}
                                                defaultValue={
                                                    formData3.data[9].answer
                                                }
                                                required={
                                                    formData3.data[9].required
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        formData3.data[9].index
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
                                                    formData3.data[10].error
                                                        ? "border border-danger"
                                                        : ""
                                                }`}
                                                style={{
                                                    background: "#F5F5F5",
                                                }}
                                                placeholder="State*"
                                                value={
                                                    formData3.data[10].answer
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        formData3.data[10].index
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
                                                    formData3.data[11].error
                                                        ? "border border-danger"
                                                        : ""
                                                }`}
                                                style={{
                                                    background: "#F5F5F5",
                                                }}
                                                placeholder="City*"
                                                value={
                                                    formData3.data[11].answer
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        formData3.data[11].index
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
                                                    formData3.data[12].error
                                                        ? "border border-danger"
                                                        : ""
                                                }`}
                                                style={{
                                                    background: "#F5F5F5",
                                                }}
                                                placeholder="Zip/Postal Code*"
                                                value={
                                                    formData3.data[12].answer
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        formData3.data[12].index
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
                                                    formData3.data[13].error
                                                        ? "border border-danger"
                                                        : ""
                                                }`}
                                                style={{
                                                    background: "#F5F5F5",
                                                }}
                                                placeholder="Phone*"
                                                value={
                                                    formData3.data[13].answer
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        formData3.data[13].index
                                                    )
                                                }
                                            />
                                            {formData3.data[13].error && (
                                                <small className="text-danger">
                                                    Please enter a valid phone
                                                    number.
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
                                                    formData3.data[14].error
                                                        ? "border border-danger"
                                                        : ""
                                                }`}
                                                style={{
                                                    background: "#F5F5F5",
                                                }}
                                                placeholder="Email*"
                                                value={
                                                    formData3.data[14].answer
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        formData3.data[14].index
                                                    )
                                                }
                                            />
                                            {formData3.data[14].error && (
                                                <small className="text-danger">
                                                    Please enter a valid email
                                                    address.
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className=" mt-5">
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
                                                <th className="text-center">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {owners.map(
                                                (ownerGroup, groupIndex) => (
                                                    <tr key={groupIndex}>
                                                        {/* Render specific fields */}
                                                        <td>
                                                            {ownerGroup.find(
                                                                (field) =>
                                                                    field.index ===
                                                                    "6"
                                                            )?.answer || "N/A"}
                                                        </td>{" "}
                                                        {/* Name */}
                                                        <td>
                                                            {ownerGroup.find(
                                                                (field) =>
                                                                    field.index ===
                                                                    "14"
                                                            )?.answer || "N/A"}
                                                        </td>{" "}
                                                        {/* Email */}
                                                        <td>
                                                            {ownerGroup.find(
                                                                (field) =>
                                                                    field.index ===
                                                                    "13"
                                                            )?.answer || "N/A"}
                                                        </td>{" "}
                                                        {/* Phone */}
                                                        <td>
                                                            {ownerGroup.find(
                                                                (field) =>
                                                                    field.index ===
                                                                    "9"
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
                                                                    background:
                                                                        "#FFEBEB",
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
                                                )
                                            )}
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
                            </div>
                            {/* --- Step 2 JSX --- */}
                            {/* Copy Step2 JSX here, update state/handlers as needed */}
                            <div className="border-1 border-bottom mb-4 mt-5">
                                <p>
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
                                                                                "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?"
                                                                            ).error
                                                                                ? "red"
                                                                                : "inherit",
                                                                        }}
                                                                    >
                                                                        {
                                                                            findObjectByQuestion(
                                                                                "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?"
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
                                                                                        "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?"
                                                                                    ).question
                                                                                }
                                                                                checked={
                                                                                    findObjectByQuestion(
                                                                                        "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?"
                                                                                    ).answer === "yes"
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleInputChange(
                                                                                        e,
                                                                                        findObjectByQuestion(
                                                                                            "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?"
                                                                                        ).question
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
                                                                                        "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?"
                                                                                    ).question
                                                                                }
                                                                                checked={
                                                                                    findObjectByQuestion(
                                                                                        "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?"
                                                                                    ).answer === "no"
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleInputChange(
                                                                                        e,
                                                                                        findObjectByQuestion(
                                                                                            "Does Your Mark Include A Living Person's Name—Even If A Stage Name Or Pseudonym Or Could It Be Perceived To Include A Person’s Name?"
                                                                                        ).question
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
                                                                                        "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *"
                                                                                    ).error
                                                                                        ? "red"
                                                                                        : "inherit",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    findObjectByQuestion(
                                                                                        "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *"
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
                                                                                                "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *"
                                                                                            ).question
                                                                                        }
                                                                                        checked={
                                                                                            findObjectByQuestion(
                                                                                                "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *"
                                                                                            ).answer ===
                                                                                            "yes"
                                                                                        }
                                                                                        onChange={(e) =>
                                                                                            handleInputChange(
                                                                                                e,
                                                                                                findObjectByQuestion(
                                                                                                    "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *"
                                                                                                ).question
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
                                                                                                "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *"
                                                                                            ).question
                                                                                        }
                                                                                        checked={
                                                                                            findObjectByQuestion(
                                                                                                "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *"
                                                                                            ).answer ===
                                                                                            "no"
                                                                                        }
                                                                                        onChange={(e) =>
                                                                                            handleInputChange(
                                                                                                e,
                                                                                                findObjectByQuestion(
                                                                                                    "Does your mark include the name (including a pseudonym, nickname or stage name) of a living person other than yourself? *"
                                                                                                ).question
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
                                                                                        className={`fw-semibold font-xxl-20px mb-0 d-block ${findObjectByQuestion(
                                                                                                "What is the name of the living person in your mark? *"
                                                                                            ).error
                                                                                                ? "scrollIntoView"
                                                                                                : " "}`}
                                                                                        style={{
                                                                                            color: findObjectByQuestion(
                                                                                                "What is the name of the living person in your mark? *"
                                                                                            ).error
                                                                                                ? "red"
                                                                                                : "inherit",
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            findObjectByQuestion(
                                                                                                "What is the name of the living person in your mark? *"
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
                                                                                                    "What is the name of the living person in your mark? *"
                                                                                                ).question
                                                                                            }
                                                                                            id={
                                                                                                findObjectByQuestion(
                                                                                                    "What is the name of the living person in your mark? *"
                                                                                                ).question
                                                                                            }
                                                                                            onChange={(e) =>
                                                                                                handleInputChange(
                                                                                                    e,
                                                                                                    findObjectByQuestion(
                                                                                                        "What is the name of the living person in your mark? *"
                                                                                                    )
                                                                                                        .question
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
                                                                                        className={`fw-semibold font-xxl-20px mb-0 d-block ${findObjectByQuestion(
                                                                                                "Please type your name as it appears in the mark: *"
                                                                                            ).error
                                                                                                ? "scrollIntoView"
                                                                                                : " "
                                                                                        }`}
                                                                                        style={{
                                                                                            color: findObjectByQuestion(
                                                                                                "Please type your name as it appears in the mark: *"
                                                                                            ).error
                                                                                                ? "red"
                                                                                                : "inherit",
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            findObjectByQuestion(
                                                                                                "Please type your name as it appears in the mark: *"
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
                                                                                                    "Please type your name as it appears in the mark: *"
                                                                                                ).question
                                                                                            }
                                                                                            id={
                                                                                                findObjectByQuestion(
                                                                                                    "Please type your name as it appears in the mark: *"
                                                                                                ).question
                                                                                            }
                                                                                            onChange={(e) =>
                                                                                                handleInputChange(
                                                                                                    e,
                                                                                                    findObjectByQuestion(
                                                                                                        "Please type your name as it appears in the mark: *"
                                                                                                    )
                                                                                                        .question
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
                                                                                "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *"
                                                                            ).error
                                                                                ? "red"
                                                                                : "inherit",
                                                                        }}
                                                                    >
                                                                        {
                                                                            findObjectByQuestion(
                                                                                "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *"
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
                                                                                        "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *"
                                                                                    ).question
                                                                                }
                                                                                checked={
                                                                                    findObjectByQuestion(
                                                                                        "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *"
                                                                                    ).answer === "yes"
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleInputChange(
                                                                                        e,
                                                                                        findObjectByQuestion(
                                                                                            "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *"
                                                                                        ).question
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
                                                                                        "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *"
                                                                                    ).question
                                                                                }
                                                                                checked={
                                                                                    findObjectByQuestion(
                                                                                        "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *"
                                                                                    ).answer === "no"
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleInputChange(
                                                                                        e,
                                                                                        findObjectByQuestion(
                                                                                            "Does Your Mark Include Any Words Other Than English Or Non-Latin Characters? *"
                                                                                        ).question
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
                                                                                className={`fw-semibold font-xxl-20px mb-0 d-block ${findObjectByQuestion(
                                                                                        "Please provide the English translation or transliteration of any non-Latin characters or non-English words:"
                                                                                    ).error
                                                                                        ? "scrollIntoView"
                                                                                        : " "}`}
                                                                                style={{
                                                                                    color: findObjectByQuestion(
                                                                                        "Please provide the English translation or transliteration of any non-Latin characters or non-English words:"
                                                                                    ).error
                                                                                        ? "red"
                                                                                        : "inherit",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    findObjectByQuestion(
                                                                                        "Please provide the English translation or transliteration of any non-Latin characters or non-English words:"
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
                                                                                                "Please provide the English translation or transliteration of any non-Latin characters or non-English words:"
                                                                                            ).question
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
                                                                                "Do you want to be able to protect your logo in a variety of colors? *"
                                                                            ).error
                                                                                ? "red"
                                                                                : "inherit",
                                                                        }}
                                                                    >
                                                                        {
                                                                            findObjectByQuestion(
                                                                                "Do you want to be able to protect your logo in a variety of colors? *"
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
                                                                                        "Do you want to be able to protect your logo in a variety of colors? *"
                                                                                    ).question
                                                                                }
                                                                                checked={
                                                                                    findObjectByQuestion(
                                                                                        "Do you want to be able to protect your logo in a variety of colors? *"
                                                                                    ).answer === "yes"
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleInputChange(
                                                                                        e,
                                                                                        findObjectByQuestion(
                                                                                            "Do you want to be able to protect your logo in a variety of colors? *"
                                                                                        ).question
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
                                                                                        "Do you want to be able to protect your logo in a variety of colors? *"
                                                                                    ).question
                                                                                }
                                                                                checked={
                                                                                    findObjectByQuestion(
                                                                                        "Do you want to be able to protect your logo in a variety of colors? *"
                                                                                    ).answer === "no"
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleInputChange(
                                                                                        e,
                                                                                        findObjectByQuestion(
                                                                                            "Do you want to be able to protect your logo in a variety of colors? *"
                                                                                        ).question
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
                                                                                    "Please provide a list of the colors that appear in your logo."
                                                                                ).error
                                                                                    ? "red"
                                                                                    : "inherit",
                                                                            }}
                                                                        >
                                                                            {
                                                                                findObjectByQuestion(
                                                                                    "Please provide a list of the colors that appear in your logo."
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
                                                                        className={`fw-semibold font-xxl-20px mb-0 d-block ${findObjectByQuestion(
                                                                                "Enter any word(s), letter(s), and/or number(s) that appear in your logo. *"
                                                                            ).error
                                                                                ? "scrollIntoView"
                                                                                : " "}`}
                                                                        style={{
                                                                            color: findObjectByQuestion(
                                                                                "Enter any word(s), letter(s), and/or number(s) that appear in your logo. *"
                                                                            ).error
                                                                                ? "red"
                                                                                : "inherit",
                                                                        }}
                                                                    >
                                                                        {
                                                                            findObjectByQuestion(
                                                                                "Enter any word(s), letter(s), and/or number(s) that appear in your logo. *"
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
                                                                                    "Enter any word(s), letter(s), and/or number(s) that appear in your logo. *"
                                                                                ).question
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
                                                                        "Are You Currently Using This Trademark In Your Business? *"
                                                                    ).error
                                                                        ? "red"
                                                                        : "inherit",
                                                                }}
                                                            >
                                                                {
                                                                    findObjectByQuestion(
                                                                        "Are You Currently Using This Trademark In Your Business? *"
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
                                                                                "Are You Currently Using This Trademark In Your Business? *"
                                                                            ).question
                                                                        }
                                                                        checked={
                                                                            findObjectByQuestion(
                                                                                "Are You Currently Using This Trademark In Your Business? *"
                                                                            ).answer === "yes"
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleInputChange(
                                                                                e,
                                                                                findObjectByQuestion(
                                                                                    "Are You Currently Using This Trademark In Your Business? *"
                                                                                ).question
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
                                                                                "Are You Currently Using This Trademark In Your Business? *"
                                                                            ).question
                                                                        }
                                                                        checked={
                                                                            findObjectByQuestion(
                                                                                "Are You Currently Using This Trademark In Your Business? *"
                                                                            ).answer === "no"
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleInputChange(
                                                                                e,
                                                                                findObjectByQuestion(
                                                                                    "Are You Currently Using This Trademark In Your Business? *"
                                                                                ).question
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
                                                                                className={`fw-semibold font-xxl-20px mb-0 d-block ${findObjectByQuestion(
                                                                                        "First use anywhere:"
                                                                                    ).error
                                                                                        ? "scrollIntoView"
                                                                                        : " "}`}
                                                                                style={{
                                                                                    color: findObjectByQuestion(
                                                                                        "First use anywhere:"
                                                                                    ).error
                                                                                        ? "red"
                                                                                        : "inherit",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    findObjectByQuestion(
                                                                                        "First use anywhere:"
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
                                                                                                "First use anywhere:"
                                                                                            ).question
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <div className="border-1 border-bottom pb-4">
                                                                            <label
                                                                                className={`fw-semibold font-xxl-20px mb-0 d-block ${findObjectByQuestion(
                                                                                        "First use commerce:"
                                                                                    ).error
                                                                                        ? "scrollIntoView"
                                                                                        : " "}`}
                                                                                style={{
                                                                                    color: findObjectByQuestion(
                                                                                        "First use commerce:"
                                                                                    ).error
                                                                                        ? "red"
                                                                                        : "inherit",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    findObjectByQuestion(
                                                                                        "First use commerce:"
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
                                                                                                "First use commerce:"
                                                                                            ).question
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="border-1 border-bottom pb-4">
                                                                    <label
                                                                        className={`fw-semibold font-xxl-20px mb-0 d-block ${findObjectByQuestion(
                                                                                "If you have any website, please mention the URL below"
                                                                            ).error
                                                                                ? "scrollIntoView"
                                                                                : " "}`}
                                                                        style={{
                                                                            color: findObjectByQuestion(
                                                                                "If you have any website, please mention the URL below"
                                                                            ).error
                                                                                ? "red"
                                                                                : "inherit",
                                                                        }}
                                                                    >
                                                                        {
                                                                            findObjectByQuestion(
                                                                                "If you have any website, please mention the URL below"
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
                                                                                        "If you have any website, please mention the URL below"
                                                                                    ).question
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="border-1 border-bottom pb-4">
                                                                    <label
                                                                        className={`fw-semibold font-xxl-20px mb-0 d-block ${findObjectByQuestion(
                                                                                "If you don't have a website, please mention where are you using your trademark in business"
                                                                            ).error
                                                                                ? "scrollIntoView"
                                                                                : " "}`}
                                                                        style={{
                                                                            color: findObjectByQuestion(
                                                                                "If you don't have a website, please mention where are you using your trademark in business"
                                                                            ).error
                                                                                ? "red"
                                                                                : "inherit",
                                                                        }}
                                                                    >
                                                                        {
                                                                            findObjectByQuestion(
                                                                                "If you don't have a website, please mention where are you using your trademark in business"
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
                                                                                        "If you don't have a website, please mention where are you using your trademark in business"
                                                                                    ).question
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
                                                                        "Do You Want To Get International Trademark Also?"
                                                                    ).error
                                                                        ? "red"
                                                                        : "inherit",
                                                                }}
                                                            >
                                                                {
                                                                    findObjectByQuestion(
                                                                        "Do You Want To Get International Trademark Also?"
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
                                                                                "Do You Want To Get International Trademark Also?"
                                                                            ).question
                                                                        }
                                                                        value="yes"
                                                                        id="questionYes3"
                                                                        checked={
                                                                            findObjectByQuestion(
                                                                                "Do You Want To Get International Trademark Also?"
                                                                            ).answer === "yes"
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleInputChange(
                                                                                e,
                                                                                findObjectByQuestion(
                                                                                    "Do You Want To Get International Trademark Also?"
                                                                                ).question
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
                                                                                "Do You Want To Get International Trademark Also?"
                                                                            ).question
                                                                        }
                                                                        checked={
                                                                            findObjectByQuestion(
                                                                                "Do You Want To Get International Trademark Also?"
                                                                            ).answer === "no"
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleInputChange(
                                                                                e,
                                                                                findObjectByQuestion(
                                                                                    "Do You Want To Get International Trademark Also?"
                                                                                ).question
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
                                    className={`fw-semibold font-xxl-20px mb-2 d-block ${findObjectByQuestion(
                                            "PLEASE PROVIDE A DESCRIPTION OF YOUR GOODS OR SERVICES "
                                        ).error
                                            ? "scrollIntoView"
                                            : " "}`}
                                    style={{
                                        color: findObjectByQuestion(
                                            "PLEASE PROVIDE A DESCRIPTION OF YOUR GOODS OR SERVICES "
                                        ).error
                                            ? "red"
                                            : "inherit",
                                    }}
                                >
                                    PLEASE PROVIDE A DESCRIPTION OF YOUR GOODS
                                    OR SERVICES
                                </span>
                                <p>
                                    Describe the goods or services related to your trademark application. Our team of experts will compare and provide you with the best related descriptions from the USPTO ID manual for your consideration.
                                </p>
                                <textarea
                                    className="form-control p-3 rounded-4"
                                    placeholder="Please provide your details..."
                                    onChange={(e) =>
                                        handleInputChange(
                                            e,
                                            findObjectByQuestion(
                                                "PLEASE PROVIDE A DESCRIPTION OF YOUR GOODS OR SERVICES "
                                            ).question
                                        )
                                    }
                                    style={{ minHeight: "150px" }}
                                ></textarea>
                            </div>
                            {/* --- Step 3 JSX --- */}
                            {/* Copy Step3 JSX here, update state/handlers as needed */}

                            <ul className="mt-5 text-center text-md-end pb-10">
                                <li>
                                    <button
                                        type="submit"
                                        className="btn btn-primary p-2 px-4 border border-primary fw-semibold font-md-17px text-white lh-sm d-inline-flex align-items-center gap-4 text-nowrap justify-content-between text-uppercase"
                                    >
                                        Continue To The Next Step
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </section>
        </SequenceLayout>
    );
};

export default Step2And3;
