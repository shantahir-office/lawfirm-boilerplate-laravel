import React, { useState, useContext, useEffect } from "react";
import SequenceLayout from "../../Layouts/SequenceLayout";
import { Sidebar } from "../../components/AllComponents";
import { Themecontext } from "../../ThemeContext";
import { ApiRequest } from "../../ApiRequest";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Helmet } from "react-helmet-async";
const Step1 = () => {
    const openChatWidget = () => {
        window.postMessage(
            { method: "showWebWidget", type: "cd360Api", apiType: "liveChat" },
            "*",
        );
    };


    const { isData, setData } = useContext(Themecontext);
    // const navigate = useNavigate();
    const AuthToken = import.meta.env.VITE_TOKEN;
    // const [tradeCheckbox, setTradeCheckbox] = useState(null)
    const [validationError, setValidationError] = useState(false);
    const [validationNameError, setValidationNameError] = useState(false);
    const [validationuserTypeError, setValidationuserTypeError] =
        useState(false);
    const [validationSloganError, setValidationSloganError] = useState(false);
    const [validationLogoError, setValidationLogoError] = useState(false);
    const [validationLogoError2, setValidationLogoError2] = useState(false);
    const [validationContactNameError, setValidationContactNameError] =
        useState(false);
    const [validationContactEmailError, setValidationContactEmailError] =
        useState(false);
    const [validationContactPhoneError, setValidationContactPhoneError] =
        useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCountry, setIsCountry] = useState("US");
    const [imageUrl, setImageUrl] = useState("");
    const [leadID, setleadID] = useState("");
    const [userType, setUserType] = useState("");
    const handleChange = (e) => {
        setUserType(e.target.value);
    };

    const [formDataprotect, setFormDataProtect] = useState({
        userName: "",
        email: "",
        phone: "",
        leadData: "",
        servicesLogo: "",
        servicesName: "",
        servicesSlogan: "",
        userType: "Individual",
    });
    const payload = {
        lead_id: leadID,
        data: [
            {
                question: "Select What You Are Trying To Protect?",
                answer: `${formDataprotect.servicesName}, ${formDataprotect.servicesSlogan}, ${imageUrl}`,
                lead_type: "text",
                lead_step: 1,
            },
            {
                question: "Name *",
                answer: formDataprotect.userName,
                lead_type: "text",
                lead_step: 1,
            },
            {
                question: "Email",
                answer: formDataprotect.email,
                lead_type: "text",
                lead_step: 1,
            },
            {
                question: "Number",
                answer: formDataprotect.phone,
                lead_type: "text",
                lead_step: 1,
            },
        ],
    };
    const isAnyServiceSelected =
        formDataprotect.servicesLogo ||
        formDataprotect.servicesSlogan ||
        formDataprotect.servicesName;
    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setFormDataProtect((prev) => ({ ...prev, [id]: checked }));
        console.log(formDataprotect);
        // Clear validation error if any checkbox is checked
        if (checked) {
            setValidationError(false);
        }
    };

    const handleInputChange = (e) => {
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
        } else if (name === "userType") {
            if (value) {
                setValidationuserTypeError(false);
                setFormDataProtect((prev) => ({ ...prev, [name]: value }));
            }
        }
        setFormDataProtect((prev) => ({ ...prev, [name]: value }));
        // else if (name === "logoToProtect") {
        //     if (value) {
        //         setValidationLogoError(false);
        //     }
        // }
    };
    const handleFileChangenotused = async (e) => {
        const { name, files } = e.target;

        if (files && files.length > 0) {
            const file = files[0];

            // Validate file type and size
            const validTypes = [
                "image/jpeg",
                "image/png",
                "image/jpg",
                "image/gif",
                "image/webp",
            ];
            const maxSize = 5 * 1024 * 1024; // 5 MB in bytes

            if (!validTypes.includes(file.type)) {
                setValidationLogoError(true);
                toast.error(
                    "Invalid file type. Please upload a JPEG, PNG, JPG, GIF, or WEBP image.",
                );
                // Clear file from form state
                setFormDataProtect((prev) => ({ ...prev, [name]: "" }));
                setImageUrl("");
                e.target.value = "";
                setIsSubmitting(false); // Clear file input so same file can be selected again
                return;
            }

            if (file.size > maxSize) {
                setValidationLogoError(true);
                toast.error(
                    "File size exceeds 5 MB. Please upload a smaller image.",
                );
                // Clear file from form state
                setFormDataProtect((prev) => ({ ...prev, [name]: "" }));
                setImageUrl("");
                e.target.value = ""; // Clear file input so same file can be selected again
                return;
            }
            setIsSubmitting(true);
            // Create FormDataProtect to send the file
            const imgData = new FormData();
            imgData.append(name, file); // Append the file to FormDataProtect
            console.log(file, "file");
            console.log(name, "name");
            try {
                const { data } = await axios.post(
                    ApiRequest.uploadImg,
                    imgData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data", // Set the correct content type for file uploads
                            Authorization: AuthToken,
                        },
                    },
                );
                if (data.status == "success") {
                    setImageUrl(data?.image_url);
                    toast.success("Image uploaded successfully!");
                } else {
                    // If upload fails, clear file from form state
                    setFormDataProtect((prev) => ({ ...prev, [name]: "" }));
                    setImageUrl("");
                    e.target.value = ""; // Clear file input so same file can be selected again
                    toast.error(
                        "Failed to upload the image. Please try again.",
                    );
                }
                setIsSubmitting(false);
            } catch (error) {
                setIsSubmitting(false);
                // Clear file from form state
                setFormDataProtect((prev) => ({ ...prev, [name]: "" }));
                setImageUrl("");
                e.target.value = ""; // Clear file input so same file can be selected again
                console.error("Upload error:", error);
                toast.error("Failed to upload the image. Please try again.");
            }

            setValidationLogoError(false); // Reset error if validation passes
            setFormDataProtect((prev) => ({ ...prev, [name]: file })); // Update formDataprotect with the uploaded file
        } else {
            // Reset if no file is selected
            setFormDataProtect((prev) => ({ ...prev, [name]: "" }));
            setImageUrl("");
        }
    };
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            setFormDataProtect((prev) => ({ ...prev, [name]: file }));
            setImageUrl(""); // Clear preview if you want
        } else {
            setFormDataProtect((prev) => ({ ...prev, [name]: "" }));
            setImageUrl("");
        }
    };
    const validatePhoneNumber = (phone, country) => {
        console.log(isValidPhoneNumber(phone, country));
        console.log(phone, country);
        if (isValidPhoneNumber(phone, country)) {
            setIsCountry(country);
        } else {
            setValidationContactPhoneError(true);
        }
        return isValidPhoneNumber(phone, country);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAnyServiceSelected) {
            setValidationError(true); // Trigger validation error
            toast.error("Please select any service");
            scrollToFirstError();
            return; // Prevent form submission
        } else {
            setValidationError(false); // Reset validation error
        }

        // Initialize error flags
        let nameError = false;
        let sloganError = false;
        // let logoError = false;
        let logoError2 = false;
        let userTypeError = false;

        // Validate fields for selected services
        if (formDataprotect.servicesName && !formDataprotect.nameToProtect) {
            nameError = true;
        }
        if (
            formDataprotect.servicesSlogan &&
            !formDataprotect.sloganToProtect
        ) {
            sloganError = true;
        }
        // if (formDataprotect.servicesLogo && !formDataprotect.image) {
        //     logoError = true;
        // }
        if (formDataprotect.servicesLogo && !formDataprotect.logoToProtect2) {
            logoError2 = true;
        }
        if (formDataprotect.userType && !formDataprotect.userType) {
            userTypeError = true;
        }

        // --- LOGO UPLOAD ENFORCEMENT ---
        // if (formDataprotect.servicesLogo && !imageUrl) {
        //     setValidationLogoError(true);
        //     toast.error("Please upload your logo before proceeding.");
        //     return;
        // }
        // if (formDataprotect.servicesLogo && !formDataprotect.image) {
        //     setValidationLogoError(true);
        //     toast.error("Please select your logo file before proceeding.");
        //     scrollToFirstError();
        //     return;
        // }
        // Set validation errors based on the flags
        setValidationNameError(nameError);
        setValidationSloganError(sloganError);
        // setValidationLogoError(logoError);
        setValidationLogoError2(logoError2);
        setValidationuserTypeError(userTypeError);

        // Check if any of the errors are true
        if (
            nameError ||
            sloganError ||
            // logoError ||
            logoError2 ||
            userTypeError
        ) {
            toast.error("Please fill out the details of your brand");
            scrollToFirstError();
            return; // Prevent form submission
        }

        setIsSubmitting(true);
        let uploadedImageUrl = imageUrl;

        // Only upload if logo is selected and not already uploaded
        if (
            formDataprotect.servicesLogo &&
            formDataprotect.image &&
            !imageUrl
        ) {
            let file = formDataprotect.image;
            const ext = file.name.includes(".")
                ? file.name.substring(file.name.lastIndexOf("."))
                : "";
            const base = file.name.includes(".")
                ? file.name.substring(0, file.name.lastIndexOf("."))
                : file.name;
            const cleanBase = base.replace(/[^a-zA-Z0-9]/g, "");
            const cleanName = cleanBase + ext.toLowerCase(); // This keeps the dot and extension!
            file = new File([file], cleanName, { type: file.type });
            console.log(file, "file after clean name");

            console.log("File type:", file.type);
            console.log("File size:", file.size);
            const validTypes = [
                "image/jpeg",
                "image/png",
                "image/jpg",
                "image/gif",
                "image/webp",
            ];
            const maxSize = 5 * 1024 * 1024; // 5 MB

            if (!validTypes.includes(file.type)) {
                setValidationLogoError(true);
                toast.error(
                    "Invalid file type. Please upload a JPEG, PNG, JPG, GIF, or WEBP image.",
                );
                setIsSubmitting(false);
                return;
            }
            if (file.size > maxSize) {
                setValidationLogoError(true);
                toast.error(
                    "File size exceeds 5 MB. Please upload a smaller image.",
                );
                setIsSubmitting(false);
                return;
            }

            setIsSubmitting(true);
            const imgData = new FormData();
            imgData.append("image", file);

            try {
                const { data } = await axios.post(
                    ApiRequest.uploadImg,
                    imgData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: AuthToken,
                        },
                    },
                );
                if (data.status === "success") {
                    uploadedImageUrl = data?.image_url;
                    setImageUrl(data?.image_url);
                    setFormDataProtect((prev) => ({
                        ...prev,
                        logoToProtect2: data?.image_url,
                    }));
                    toast.success("Image uploaded successfully!");
                } else {
                    setValidationLogoError(true);
                    toast.error(
                        "Failed to upload the image. Please try again.",
                    );
                    setIsSubmitting(false);
                    return;
                }
            } catch (error) {
                // setValidationLogoError(true);
                toast.error("Failed to upload the image. Please try again.");
                setIsSubmitting(false);
                return;
            }
        }
        try {
            // console.log(`${formDataprotect.servicesName ? "Service" : "false"}, ${formDataprotect.servicesSlogan ? "Slogan" : "false"}, ${imageUrl ? imageUrl : "false"}`)

            // if (data.status !== "error" && isValid) {
            const url = window.location.href;
            const urlObj = new URL(url);
            const params = new URLSearchParams(urlObj.search);
            const id = params.get("id");
            const leadID = id; // Get the lead ID from the response
            setleadID(leadID); // Update state with lead ID
            console.log(leadID, "response lead id");
            // console.log(isValid, "isVALID");
            // localStorage.setItem("step1", JSON.stringify(data?.data));
            const NameToProtectData = {
                question: "Enter The Name You Wish To Protect",
                answer: formDataprotect.nameToProtect,
                lead_type: "text",
                lead_step: 1,
            };
            const SloganToProtectData = {
                question: "Enter The Slogan You Wish To Protect",
                answer: formDataprotect.sloganToProtect,
                lead_type: "text",
                lead_step: 1,
            };
            const LogoToProtectData = {
                question: "Upload Logo File Here",
                answer: uploadedImageUrl, // <-- Use the variable, not the state
                lead_type: "text",
                lead_step: 1,
            };
            const LogoToProtectData2 = {
                question: "Enter the Logo Name you wish to protect",
                answer: formDataprotect.logoToProtect2,
                lead_type: "text",
                lead_step: 1,
            };
            const UserTypeProtectData2 = {
                question:
                    "Will the Trademark Be Owned By An Individual Or Organization?",
                answer: formDataprotect.userType,
                lead_type: "text",
                lead_step: 1,
            };
            const answerParts = [];
            if (formDataprotect.servicesName) {
                answerParts.push("Name");
            }
            if (formDataprotect.servicesSlogan) {
                answerParts.push("Slogan");
            }
            if (formDataprotect.logoToProtect2) {
                answerParts.push("Logo");
            }
            const Answer =
                answerParts.length > 0 ? answerParts.join(", ") : "false";
            const payload = {
                lead_id: leadID, // Use lead ID directly
                lead_step: 1, // Use lead ID directly
                data: [
                    {
                        question: "Select What You Are Trying To Protect?",
                        answer: Answer,
                        lead_type: "text",
                        lead_step: 1,
                    },
                    formDataprotect.nameToProtect ? NameToProtectData : null,
                    formDataprotect.sloganToProtect
                        ? SloganToProtectData
                        : null,
                    formDataprotect.logoToProtect2 ? LogoToProtectData2 : null,
                    formDataprotect.userType ? UserTypeProtectData2 : null,
                    // imageUrl ? LogoToProtectData : null,
                    uploadedImageUrl ? LogoToProtectData : null,
                    {
                        question: "Quantity",
                        answer: answerParts.length,
                        lead_type: "text",
                        lead_step: 1,
                    },
                ].filter((item) => item),
                // Add other necessary fields for payload here
            };
            // console.log(payload)
            // return;
            const response = await axios.post(
                `${ApiRequest.leadData}`,
                payload,
                {
                    headers: {
                        Authorization: AuthToken,
                    },
                },
            );

            if (response.status !== "error") {
                // setData(data);
                localStorage.setItem("step1.2", JSON.stringify(response?.data));
                toast.success("Form submitted successfully!");
                setIsSubmitting(false);
                window.location.href = `/lp4/sequence/step2?id=${leadID}`;
                // window.location.href = `/thank-you?id=${leadID}`
            }
            // setTimeout(async () => {

            // }, 2000);
            // } else {
            //     if (data.status == "error") {
            //         setIsSubmitting(false);
            //         toast.error(data.message);
            //     } else {
            //         setIsSubmitting(false);
            //         toast.error("Error submitting the form");
            //         return;
            //     }
            // }
        } catch (error) {
            console.error("Error:", error);
            setIsSubmitting(false);
            toast.error("Error submitting the form");
        }
    };
    const [progressnumber, setProgressnumber] = useState({
        percent: "20%",
        topBarName: "Trademark Application Process",
    });

    const scrollToFirstError = () => {
        setTimeout(() => {
            const fieldError = document.querySelector(
                ".border-danger, scrollIntoView",
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
                <title>Sequence Step 1 | (brandname)</title>
            </Helmet>
            <section className="pt-5">
                <div className="container">
                    <Sidebar progressnumber={progressnumber} steps={false} />
                    <Toaster position="top-right" reverseOrder={false} />

                    <form onSubmit={handleSubmit}>
                        <div className="p-3 p-lg-5 rounded-2 mt-n5">
                            <span className="h5 d-block">Dear Client,</span>
                            <p className="m-0">
                                Thank you for signing up with us. Please
                                complete your application, it will only take a
                                few minutes. If you need any help,{" "}
                                <a
                                    href="#"
                                onClick={openChatWidget}
                                    className=" text-dark fw-semibold text-decoration-underline"
                                >
                                    Click here
                                </a>{" "}
                                to Chat.
                            </p>
                        </div>
                        <div
                            className=" p-4 py-lg-8 rounded-2 mb-5"
                            style={{
                                backgroundColor: "#F1F1F1",
                            }}
                        >
                            <h2 className="text-secondary fw-bold">
                                {" "}
                                Ownership Information
                            </h2>
                            <label className="fw-medium font-xxl-22px mb-3 d-block">
                                Will the Trademark Be Owned By An Individual or
                                an Organization?
                            </label>
                            <div className="d-flex gap-5 flex-wrap">
                                <div className="d-flex gap-2 form-check align-items-center mb-0 p-0">
                                    <input
                                        type="radio"
                                        id="individual"
                                        name="userType"
                                        value="Individual"
                                        checked={
                                            formDataprotect.userType ===
                                            "Individual"
                                        }
                                        onChange={handleInputChange}
                                        className={`form-check-input m-0  ${
                                            validationuserTypeError
                                                ? "border-danger border-2"
                                                : ""
                                        }`}
                                    />
                                    <label
                                        className={`fw-medium font-md-18px font-xxl-22px ${
                                            validationuserTypeError
                                                ? "text-danger"
                                                : ""
                                        }`}
                                        htmlFor="individual"
                                        role="button"
                                    >
                                        Individual
                                    </label>
                                </div>
                                <div className="d-flex gap-2 form-check align-items-center mb-0 p-0">
                                    <input
                                        type="radio"
                                        id="organization"
                                        name="userType"
                                        value="Organization"
                                        checked={
                                            formDataprotect.userType ===
                                            "Organization"
                                        }
                                        onChange={handleInputChange}
                                        className={`form-check-input m-0  ${
                                            validationuserTypeError
                                                ? "border-danger border-2"
                                                : ""
                                        }`}
                                    />
                                    <label
                                        className={`fw-medium font-md-18px font-xxl-22px ${
                                            validationuserTypeError
                                                ? "text-danger"
                                                : ""
                                        }`}
                                        htmlFor="organization"
                                        role="button"
                                    >
                                        Organization
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-secondary fw-bold">
                                {" "}
                                Trademark Details
                            </h2>
                            <label className="fw-medium font-lg-22px mb-2 d-block">
                                Select What You Are Trying To Protect?
                            </label>
                            <label
                                className="fw-medium font-xxl-15px mb-3 d-block"
                                style={{ color: "#717171" }}
                            >
                                You can add or subtract elements for protection
                            </label>
                            {validationError && !isAnyServiceSelected ? (
                                <p className="text-danger">
                                    Please select at least one service.
                                </p>
                            ) : null}
                            <br />
                            <div className="row g-4">
                                {/* Services Name */}
                                <div className="col-sm-6">
                                    <div className="cover-step-package-card">
                                        <input
                                            type="checkbox"
                                            className="btn-check terms-checkbox"
                                            id="servicesName"
                                            checked={
                                                formDataprotect.servicesName
                                            }
                                            onChange={handleCheckboxChange}
                                            hidden
                                        />
                                        <label
                                            className={
                                                !formDataprotect.servicesName &&
                                                validationError
                                                    ? `btn btn-primary rounded-3 p-3 step-package-card servicesList d-flex align-items-center gap-2 border-danger border-2`
                                                    : `btn btn-primary rounded-3 p-3 step-package-card servicesList d-flex align-items-center gap-2`
                                            }
                                            htmlFor="servicesName"
                                        >
                                            <img
                                                src="/sequence-assets/img/logo-types/logo-category-2.webp"
                                                alt="Logo"
                                                width="60"
                                                height="40"
                                                className="object-fit-contain"
                                            />
                                            <div className="text-start">
                                                <span className="d-block font-xxs-16px fw-semibold">
                                                    Name
                                                </span>

                                                <span className="font-xxs-13px">
                                                    (Business Name Identifying
                                                    Your Brand)
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Services Slogan */}
                                <div className="col-sm-6">
                                    <div className="cover-step-package-card">
                                        <input
                                            type="checkbox"
                                            className="btn-check terms-checkbox"
                                            id="servicesSlogan"
                                            checked={
                                                formDataprotect.servicesSlogan
                                            }
                                            onChange={handleCheckboxChange}
                                            hidden
                                        />
                                        <label
                                            className={
                                                !formDataprotect.servicesSlogan &&
                                                validationError
                                                    ? `btn btn-primary rounded-3 p-3 step-package-card servicesList d-flex align-items-center gap-2 border-danger border-2`
                                                    : `btn btn-primary rounded-3 p-3 step-package-card servicesList d-flex align-items-center gap-2`
                                            }
                                            htmlFor="servicesSlogan"
                                        >
                                            <img
                                                src="/sequence-assets/img/logo-types/just-do-it.webp"
                                                alt="Logo"
                                                width="60"
                                                height="12"
                                                className="object-fit-contain"
                                            />
                                            <div className=" text-start">
                                                <span className="d-block font-xxs-16px fw-semibold">
                                                    Slogan
                                                </span>

                                                <span className="font-xxs-13px">
                                                    (Short Phrase Identifying
                                                    Your Brand)
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Services Logo */}
                                <div className="col-sm-6">
                                    <div className="cover-step-package-card">
                                        <input
                                            type="checkbox"
                                            className="btn-check terms-checkbox"
                                            id="servicesLogo"
                                            checked={
                                                formDataprotect.servicesLogo
                                            }
                                            onChange={handleCheckboxChange}
                                            hidden
                                        />
                                        <label
                                            className={
                                                !formDataprotect.servicesLogo &&
                                                validationError
                                                    ? `btn btn-primary rounded-3 p-3 step-package-card servicesList d-flex align-items-center gap-2 border-danger border-2`
                                                    : `btn btn-primary rounded-3 p-3 step-package-card servicesList d-flex align-items-center gap-2`
                                            }
                                            htmlFor="servicesLogo"
                                        >
                                            <img
                                                src="/sequence-assets/img/logo-types/logo-category-3.webp"
                                                alt="Logo"
                                                width="60"
                                                height="40"
                                                className="object-fit-contain"
                                            />
                                            <div className=" text-start">
                                                <span className="d-block font-xxs-16px fw-semibold">
                                                    Logo
                                                </span>

                                                <span className="font-xxs-13px">
                                                    (Graphical Design
                                                    Identifying Your Brand)
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Input fields for selected checkboxes */}
                            {formDataprotect.servicesName && (
                                <div className="mt-5">
                                    <label className="fw-semibold font-xxl-22px mb-2 d-block">
                                        Enter The Name You Wish To Protect
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control w-100 rounded-3 ps-4 ${
                                            validationNameError
                                                ? "border-danger border-2"
                                                : ""
                                        }`}
                                        name="nameToProtect"
                                        value={formDataprotect.nameToProtect}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}

                            {formDataprotect.servicesSlogan && (
                                <div className="mt-5">
                                    <label className="fw-semibold font-xxl-22px mb-2 d-block">
                                        Enter The Slogan You Wish To Protect
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control w-100 rounded-3 ps-4 ${
                                            validationSloganError
                                                ? "border-danger border-2"
                                                : ""
                                        }`}
                                        name="sloganToProtect"
                                        value={formDataprotect.sloganToProtect}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}

                            {formDataprotect.servicesLogo && (
                                <>
                                    {/* <div className="mt-5">
                                        <label className="fw-semibold font-xxl-22px mb-2 d-block">
                                            Upload The Logo You Wish To Protect
                                            (Optional)
                                            <small className="d-block fw-normal">
                                                Providing your logo is optional
                                                and can be done at a later
                                                stage.
                                            </small>
                                        </label>
                                        <input
                                            type="file"
                                            className={`form-control w-100 rounded-3 ps-4 ${
                                                validationLogoError
                                                    ? "border-danger border-2"
                                                    : ""
                                            }`}
                                            accept="image/jpeg, image/png, image/jpg, image/gif, image/webp"
                                            name="image"
                                            onChange={handleFileChange}
                                        />
                                        {validationLogoError && (
                                            <div className="text-danger">
                                                Please upload a valid image file
                                                (JPEG, PNG, JPG, GIF, WEBP) not
                                                exceeding 5 MB.
                                            </div>
                                        )}
                                    </div> */}
                                    <div className="mt-5">
                                        <label className="fw-semibold font-xxl-22px mb-2 d-block">
                                            Enter the Logo Name you wish to
                                            protect
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control w-100 rounded-3 ps-4 ${
                                                validationLogoError2
                                                    ? "border-danger border-2"
                                                    : ""
                                            }`}
                                            name="logoToProtect2"
                                            value={
                                                formDataprotect.logoToProtect2
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <ul className="mt-5">
                            <li>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary p-2 px-4 border border-primary text-white fw-semibold font-md-17px lh-sm d-inline-flex align-items-center gap-4 text-nowrap justify-content-between text-uppercase"
                                >
                                    {isSubmitting
                                        ? "Submitting..."
                                        : " Continue To The Next Step"}
                                </button>
                            </li>
                        </ul>
                    </form>
                </div>
            </section>
        </SequenceLayout>
    );
};

export default Step1;
