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
import { isPossiblePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";
import { Helmet } from "react-helmet-async";
const Step1 = () => {
    const [stepName, setStepName] = useState("");
    const { isData, setData } = useContext(Themecontext);
    // const navigate = useNavigate();
    const AuthToken = import.meta.env.VITE_TOKEN;
    // const [tradeCheckbox, setTradeCheckbox] = useState(null)
    const [validationError, setValidationError] = useState(false);
    const [validationNameError, setValidationNameError] = useState(false);
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
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        phone: "",
        country: "us",
        dialCode: "1",
        leadData: "",
        servicesLogo: "",
        servicesName: "",
        servicesSlogan: "",
    });
    const payload = {
        lead_id: leadID,
        data: [
            {
                question: "Select What You Are Trying To Protect?",
                answer: `${formData.servicesName}, ${formData.servicesSlogan}, ${imageUrl}`,
                lead_type: "text",
                lead_step: 1,
            },
            {
                question: "Name *",
                answer: formData.userName,
                lead_type: "text",
                lead_step: 1,
            },
            {
                question: "Email",
                answer: formData.email,
                lead_type: "text",
                lead_step: 1,
            },
            {
                question: "Number",
                answer: formData.phone,
                lead_type: "text",
                lead_step: 1,
            },
        ],
    };
    const isAnyServiceSelected =
        formData.servicesLogo ||
        formData.servicesSlogan ||
        formData.servicesName;
    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setFormData((prev) => ({ ...prev, [id]: checked }));
        console.log(formData);
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
                setFormData((prev) => ({ ...prev, [name]: value }));
            }
        } else if (name === "sloganToProtect") {
            if (value) {
                setValidationSloganError(false);
                setFormData((prev) => ({ ...prev, [name]: value }));
            }
        } else if (name === "logoToProtect2") {
            if (value) {
                setValidationLogoError2(false);
                setFormData((prev) => ({ ...prev, [name]: value }));
            }
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        // else if (name === "logoToProtect") {
        //     if (value) {
        //         setValidationLogoError(false);
        //     }
        // }
    };
    const handleFileChange = async (e) => {
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
                    "Invalid file type. Please upload a JPEG, PNG, JPG, GIF, or WEBP image."
                );
                return;
            }

            if (file.size > maxSize) {
                setValidationLogoError(true);
                toast.error(
                    "File size exceeds 5 MB. Please upload a smaller image."
                );
                return;
            }
            setIsSubmitting(true);
            // Create FormData to send the file
            const imgData = new FormData();
            imgData.append(name, file); // Append the file to FormData

            try {
                const { data } = await axios.post(
                    ApiRequest.uploadImg,
                    imgData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data", // Set the correct content type for file uploads
                            Authorization: AuthToken,
                        },
                    }
                );
                if (data.status == "success") {
                    setImageUrl(data?.image_url);
                }

                // Handle successful upload response here (e.g., updating state or showing a success message)
                console.log("Upload success:", data.image_url);
                toast.success("Image uploaded successfully!");
                setIsSubmitting(false);
            } catch (error) {
                setIsSubmitting(false);
                console.error("Upload error:", error);
                toast.error("Failed to upload the image. Please try again.");
            }

            setValidationLogoError(false); // Reset error if validation passes
            setFormData((prev) => ({ ...prev, [name]: file })); // Update formData with the uploaded file
        } else {
            // Reset if no file is selected
            setFormData((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handlePhoneChange = (value, countryObj, e, formattedValue) => {
        const dial = countryObj?.dialCode || "";
        const numberOnly = value.startsWith(dial)
            ? value.slice(dial.length)
            : value;

        setFormData((prev) => {
            if (countryObj.countryCode !== prev.country) {
                return {
                    ...prev,
                    country: countryObj.countryCode,
                    dialCode: dial,
                    phone: "",
                };
            }
            return {
                ...prev,
                phone: numberOnly,
            };
        });
    };
    const PhonevalidateForm = () => {
        const newErrors = {};

        // Updated phone validation
        if (!formData.phone) {
            newErrors.phone = true;
        }  else {
               const fullNumber = `+${formData.dialCode}${formData.phone}`;

               // First check if it's possible (right length for country)
            if (!isPossiblePhoneNumber(fullNumber)) {
                newErrors.phone =
                    "Invalid phone number length for selected country";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // const validatePhoneNumber = (phone, country) => {
    //   console.log(isValidPhoneNumber(phone, country));
    //   console.log(phone, country);
    //   if (isValidPhoneNumber(phone, country)) {
    //     setIsCountry(country);
    //   } else {
    //     setValidationContactPhoneError(true);
    //   }
    //   return isValidPhoneNumber(phone, country);
    // };

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
        let logoError = false;
        let logoError2 = false;
        let contactName = false;
        let contactEmail = false;
        let contactPhone = false;
        const isValid = PhonevalidateForm();

        // Validate fields for selected services
        if (formData.servicesName && !formData.nameToProtect) {
            nameError = true;
        }
        if (formData.servicesSlogan && !formData.sloganToProtect) {
            sloganError = true;
        }
        // if (formData.servicesLogo && !formData.image) {
        //     logoError = true;
        // }
        if (formData.servicesLogo && !formData.logoToProtect2) {
            logoError2 = true;
        }
        if (!formData.userName) {
            contactName = true;
        }
        if (!formData.email) {
            contactEmail = true;
        }
        // if (!formData.phone) {
        //   contactPhone = true;
        // }

        // const isValid = validatePhoneNumber(formData.phone, isCountry);
        // setValidationContactPhoneError(!isValid && contactPhone);

        // Set validation errors based on the flags
        setValidationNameError(nameError);
        setValidationSloganError(sloganError);
        setValidationLogoError(logoError);
        setValidationLogoError2(logoError2);
        setValidationContactNameError(contactName);
        setValidationContactEmailError(contactEmail);

        // Check if any of the errors are true
        if (nameError || sloganError || logoError || logoError2) {
            toast.error("Please fill out the details of your brand");
            scrollToFirstError();
            return; // Prevent form submission
        }

        if (!formData.userName && !formData.email) {
            toast.error("Please Fill Contact Details");
            scrollToFirstError();
            return;
        }

        if (validationContactNameError && validationContactEmailError) {
            toast.error("Please Fill Contact Details Correctly");
            scrollToFirstError();
            return;
        }

        if (!isValid) {
            toast.error("Please fill all required fields");
            scrollToFirstError();
            return;
        }
        const fullPhone = `+${formData.dialCode}${formData.phone}`;
        const formdata = new FormData();
        formdata.append("name", formData.userName);
        formdata.append("email", formData.email);
        formdata.append("phone", fullPhone);
        setIsSubmitting(true);

        try {
            // console.log(`${formData.servicesName ? "Service" : "false"}, ${formData.servicesSlogan ? "Slogan" : "false"}, ${imageUrl ? imageUrl : "false"}`)

            const { data } = await axios.post(ApiRequest.leads, formdata, {
                headers: {
                    Authorization: AuthToken,
                },
            });

            if (data.status !== "error") {
                const leadID = data?.data?.id; // Get the lead ID from the response
                setleadID(leadID); // Update state with lead ID
                console.log(leadID, "response lead id");
                // console.log(isValid, "isVALID");
                localStorage.setItem("step1", JSON.stringify(data?.data));
                const NameToProtectData = {
                    question: "Enter The Name You Wish To Protect",
                    answer: formData.nameToProtect,
                    lead_type: "text",
                    lead_step: 1,
                };
                const SloganToProtectData = {
                    question: "Enter The Slogan You Wish To Protect",
                    answer: formData.sloganToProtect,
                    lead_type: "text",
                    lead_step: 1,
                };
                const LogoToProtectData = {
                    question: "Upload The Logo You Wish To Protect (Optional)",
                    answer: imageUrl,
                    lead_type: "text",
                    lead_step: 1,
                };
                const LogoToProtectData2 = {
                    question: "Enter the Logo Name you wish to protect *",
                    answer: formData.logoToProtect2,
                    lead_type: "text",
                    lead_step: 1,
                };
                const answerParts = [];
                if (formData.servicesName) {
                    answerParts.push("Name");
                }
                if (formData.servicesSlogan) {
                    answerParts.push("Slogan");
                }
                if (imageUrl || formData.logoToProtect2) {
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
                        formData.nameToProtect ? NameToProtectData : null,
                        formData.sloganToProtect ? SloganToProtectData : null,
                        formData.logoToProtect2 ? LogoToProtectData2 : null,
                        imageUrl ? LogoToProtectData : null,
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
                    }
                );

                if (response.status !== "error") {
                    setData(data);
                    localStorage.setItem(
                        "step1.2",
                        JSON.stringify(response?.data)
                    );
                    toast.success("Form submitted successfully!");
                    setIsSubmitting(false);
                    window.location.href = `/lp/sequence/step2?id=${leadID}`;
                    // window.location.href = `/thank-you?id=${leadID}`
                }
                // setTimeout(async () => {

                // }, 2000);
            } else {
                if (data.status == "error") {
                    setIsSubmitting(false);
                    toast.error(data.message);
                } else {
                    setIsSubmitting(false);
                    toast.error("Error submitting the form");
                    return;
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setIsSubmitting(false);
            toast.error("Error submitting the form");
        }
    };
    const [progressnumber, setProgressnumber] = useState({
        percent: "14%",
        topBarName: "Trademark Application Process",
    });
    useEffect(() => {
        const selFlag = document.querySelector(
            ".phone-container .flag-dropdown .selected-flag"
        );
        if (!selFlag) return;

        let badge = selFlag.querySelector(".code-badge");
        if (!badge) {
            badge = document.createElement("div");
            badge.className = "code-badge";
            selFlag.appendChild(badge);
        }

        badge.textContent = `+${formData.dialCode}`;
    }, [formData.dialCode]);
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
            <section>
                <div className="container">
                    <Toaster position="top-right" reverseOrder={false} />
                    <Sidebar progressnumber={progressnumber} steps={false} />
                    <form onSubmit={handleSubmit}>
                        <div
                            className=" bg-white p-3 p-lg-5 rounded-4"
                            style={{ boxShadow: "0 0 20px #0002" }}
                        >
                            <label className="fw-semibold font-xxl-22px mb-3 d-block">
                                Select What You Are Trying To Protect?
                            </label>
                            {validationError && !isAnyServiceSelected ? (
                                <p className="text-danger">
                                    Please select at least one service.
                                </p>
                            ) : null}
                            <div className="row g-4">
                                {/* Services Name */}
                                <div className="col-sm-6">
                                    <div className="cover-step-package-card">
                                        <input
                                            type="checkbox"
                                            className="btn-check terms-checkbox"
                                            id="servicesName"
                                            checked={formData.servicesName}
                                            onChange={handleCheckboxChange}
                                            hidden
                                        />
                                        <label
                                            className={
                                                !formData.servicesName &&
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
                                            checked={formData.servicesSlogan}
                                            onChange={handleCheckboxChange}
                                            hidden
                                        />
                                        <label
                                            className={
                                                !formData.servicesSlogan &&
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
                                                height="40"
                                                
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
                                            checked={formData.servicesLogo}
                                            onChange={handleCheckboxChange}
                                            hidden
                                        />
                                        <label
                                            className={`btn btn-primary rounded-3 p-3 step-package-card servicesList d-flex align-items-center gap-2`}
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
                            {formData.servicesName && (
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
                                        value={formData.nameToProtect}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}

                            {formData.servicesSlogan && (
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
                                        value={formData.sloganToProtect}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}

                            {formData.servicesLogo && (
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
                                            protect *
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control w-100 rounded-3 ps-4 ${
                                                validationLogoError2
                                                    ? "border-danger border-2"
                                                    : ""
                                            }`}
                                            name="logoToProtect2"
                                            value={formData.logoToProtect2}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div
                            className="p-3 p-lg-5 rounded-4 bg-white mt-5"
                            style={{ boxShadow: "0 0 20px #0002" }}
                        >
                            <label className="fw-semibold font-xxl-22px mb-1 d-block testing">
                                In case we have questions, we will contact you!
                            </label>

                            <div className="row g-3 mt-2">
                                <div className="col-12">
                                    <label
                                        htmlFor="username"
                                        className="fw-semibold font-xxl-22px mb-2 d-block"
                                    >
                                        Name*
                                    </label>
                                    <input
                                        type="text" id="username"
                                        className={`form-control w-100 rounded-3 ps-4 ${
                                            validationContactNameError
                                                ? "border-danger border-2"
                                                : " "
                                        }`}
                                        name="userName"
                                        value={formData.userName}
                                        onChange={handleInputChange}
                                        placeholder="Name *"
                                    />
                                </div>
                                <div className="col-12">
                                    <label
                                        htmlFor="useremail"
                                        className="fw-semibold font-xxl-22px mb-2 d-block"
                                    >
                                        Email*
                                    </label>
                                    <input
                                        type="email" id="useremail"
                                        className={`form-control w-100 rounded-3 ps-4 ${
                                            validationContactEmailError
                                                ? "border-danger border-2"
                                                : ""
                                        }`}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email *"
                                    />
                                </div>
                                <div className="col-12">
                                    {/* <input
                                                type="tel"
                                                className={`form-control w-100 rounded-3 ps-7 ${validationContactPhoneError ? 'border-danger border-2' : ''}`}
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Number *"
                                                style={{
                                                    background: "#F5F5F5",
                                                }}
                                            /> */}
                                    <label
                                        htmlFor="userphone"
                                        className="fw-semibold font-xxl-22px mb-2 d-block"
                                    >
                                        Phone*
                                    </label>
                                    <PhoneInput
                                    id="userphone"
                                        containerClass={`phone-container d-flex form-control border-2 p-0 ${
                                            errors.phone
                                                ? "form-error form-error-2"
                                                : ""
                                        }`}
                                        country={formData.country}
                                        separateDialCode={true}
                                        onlyCountries={[
                                            "al",
                                            "ad",
                                            "at",
                                            "au",
                                            "ae",
                                            "sa",
                                            "at",
                                            "br",
                                            "ca",
                                            "us",
                                            "cn",
                                            "dk",
                                            "cz",
                                            "fi",
                                            "de",
                                            "ge",
                                            "is",
                                            "jm",
                                            "no",
                                            "nl",
                                            "mx",
                                            "pl",
                                            "qa",
                                            "ro",
                                            "ru",
                                            "es",
                                            "ch",
                                            "se",
                                            "tr",
                                            "kw",
                                        ]}
                                        disableCountryGuess={true}
                                        disableCountryCode={true}
                                        onChange={handlePhoneChange}
                                        // countryCodeEditable={false} // Set the default country code
                                        inputClass={`w-100 bg-transparent border-0 ${
                                            validationContactPhoneError
                                                ? "border-danger border-2"
                                                : ""
                                        }`}
                                        value={formData.phone}
                                        inputStyle={{
                                            background: "#F5F5F5",
                                            minHeight: "49px",
                                            paddingLeft: "1rem",
                                        }}
                                        placeholder=""
                                    />
                                    {errors.phone && (
                                        <span className="text-danger mt-1 d-block">
                                            {errors.phone}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Submit button */}
                            <ul className="mt-5 text-center text-md-end">
                                <li>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn btn-secondary py-3 px-4 fw-semibold font-md-17px text-white lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-between text-uppercase"
                                    >
                                        {isSubmitting
                                            ? "Submitting..."
                                            : " Continue To The Next Step"}
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

export default Step1;
