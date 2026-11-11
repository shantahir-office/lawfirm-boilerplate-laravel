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
const inputBakFile = () => {
    const [selectedCountry, setSelectedCountry] = useState("us");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        countryCode: "1",
        protectServices: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const openChatWidget = () => {
        window.postMessage(
            { method: "showWebWidget", type: "cd360Api", apiType: "liveChat" },
            "*"
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handlePhoneChange = (value, country) => {
        // setFormData({ ...formData, phone: value });
        // if (errors.phone) setErrors({ ...errors, phone: null });
        setFormData((prev) => ({ ...prev, phone: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = true;
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = true;
        if (!isValidPhoneNumber(formData.phone, "US")) newErrors.phone = true;
        // if (!formData.protectServices.trim()) newErrors.protectServices = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            setIsSubmitting(true);

            // Step 1: Always call leads API
            const leadResponse = await axios.post(
                "https://portal.alphatach.com/api/leads",
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                },
                {
                    headers: {
                        Authorization: `Bearer J6wpfWOxHf4ROPA08j8YsD5d22J1a2FsRoOvjmhe`,
                    },
                }
            );

            if (leadResponse.status >= 200 && leadResponse.status < 300) {
                const leadId = leadResponse.data.data.id;

                // Step 2: Conditionally call leadData API
                if (formData.protectServices.trim()) {
                    await axios.post(
                        "https://portal.alphatach.com/api/leadData",
                        {
                            lead_id: leadId,
                            lead_step: 1,
                            data: [
                                {
                                    question: "What Do You Want To Protect?",
                                    answer: formData.protectServices,
                                    lead_type: "text",
                                    lead_step: 1,
                                },
                            ],
                        },
                        {
                            headers: {
                                Authorization: `Bearer J6wpfWOxHf4ROPA08j8YsD5d22J1a2FsRoOvjmhe`,
                            },
                        }
                    );
                }

                toast.success("Data saved successfully!");
                window.location.href = `/sequence/step2?id=${leadId}`;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Submission failed!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const [progressnumber, setProgressnumber] = useState({
        percent: "20%",
        topBarName: "Trademark Application Process",
    });
    useEffect(() => {
        const flagElement = document.querySelector(".selected-flag");
        if (flagElement) {
            flagElement.setAttribute(
                "data-country-code",
                formData.countryCode || "1"
            ); // Default US code
        }
    }, [formData.countryCode]);
    return (
        <SequenceLayout>
            <Helmet>
                <title>Sequence Step 1 |  (brandname)</title>
            </Helmet>
            <section className="pt-5">
                <div className="container">
                    <Sidebar progressnumber={progressnumber} />
                    <Toaster position="top-right" reverseOrder={false} />
                    <form
                        onSubmit={handleSubmit}
                        className="bg-primary rounded-3 p-5 sequence-form-input"
                    >
                        <div className="row g-4">
                            <div className="col-lg-6">
                                <h2 className=" text-uppercase fw-bold font-xxs-40px font-xxxl-52px mb-1">
                                    secure your brand
                                </h2>
                                <p
                                    className="font-xxs-22px font-xxxl-26px"
                                    style={{ color: "#786121" }}
                                >
                                    Register Your Trademark Today!
                                </p>
                                <div className="d-flex flex-column align-items-start gap-3">
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control px-4 ${
                                            errors.name ? "form-error" : ""
                                        }`}
                                        placeholder="Enter Your Full Name*"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control px-4 ${
                                            errors.email ? "form-error" : ""
                                        }`}
                                        placeholder="Enter Your Email Address*"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <PhoneInput
                                        country={"us"}
                                        // enableAreaCodes={true}
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
                                        value={formData.phone}
                                        disableCountryCode={true}
                                        // countryCodeEditable={false}
                                        // specialLabel=""
                                        // onChange={handlePhoneChange}
                                        // onChange={(value, country) => {
                                        //     setFormData((prev) => ({
                                        //         ...prev,
                                        //         phone: value,
                                        //         countryCode: country.dialCode,
                                        //     }));
                                        // }}
                                        onChange={(value, country) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                phone: value,
                                                countryCode: country.dialCode, // Real-time code update
                                            }));
                                        }}
                                        onCountryChange={(
                                            countryCode,
                                            countryData
                                        ) => {
                                            setSelectedCountry(
                                                countryData.countryCode
                                            );
                                            setFormData((prev) => ({
                                                ...prev,
                                                countryCode:
                                                    countryData.dialCode, // Force update
                                            }));
                                        }}
                                        inputClass={`w-100 ${
                                            errors.phone ? "form-error" : ""
                                        }`}
                                        inputStyle={{
                                            width: "100%",
                                            minHeight: "49px",
                                            paddingLeft: "73px",
                                        }}
                                        error={errors.phone}
                                        placeholder="Enter Your Number"
                                        autoFormat={true}
                                        disableCountryGuess={true}
                                        // disableCountryGuess={false}
                                    />
                                    <input
                                        type="text"
                                        name="protectServices"
                                        className="form-control px-4 protect-services"
                                        placeholder="What Do You Want To Protect? (Name, Logo, Slogan)"
                                        value={formData.protectServices}
                                        onChange={handleChange}
                                    />
                                    <button
                                        className="btn btn-secondary text-uppercase px-5"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Submitting..."
                                            : "Save & Continue"}
                                    </button>
                                </div>
                            </div>
                            <div className="col-lg-6 d-none d-lg-block">
                                <img
                                    src="/assets/img/form-banner.png"
                                    alt="form-banner"
                                    width={400}
                                    height={400}
                                    className="mx-auto"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </SequenceLayout>
    );
};

export default inputBakFile;
