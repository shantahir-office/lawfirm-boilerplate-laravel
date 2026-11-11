import React, { useState, useEffect } from "react";
import SequenceLayout from "../../Layouts/SequenceLayout";
import { Sidebar } from "../../components/AllComponents";
import { Themecontext } from "../../ThemeContext";
import { ApiRequest } from "../../ApiRequest";
import axios from "../../axios";
import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isPossiblePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";
import { Helmet } from "react-helmet-async";
const Step1 = () => {
    const [stepName, setStepName] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "us",
        dialCode: "1",
        protectServices: "",
    });
    const AuthToken = import.meta.env.VITE_TOKEN;
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

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = true;
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = true;

        // Updated phone validation
        if (!formData.phone) {
            newErrors.phone = true;
        } else {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            setIsSubmitting(true);
            const fullPhone = `+${formData.dialCode}${formData.phone}`;
            //leads API
            const leadResponse = await axios.post(
                "https://tm-brands.digitechtictest.com/api/leads",
                {
                    name: formData.name,
                    email: formData.email,
                    phone: fullPhone,
                },
                {
                    headers: {
                        Authorization: AuthToken,
                    },
                }
            );

            if (leadResponse.status >= 200 && leadResponse.status < 300) {
                const leadId = leadResponse.data.data.id;

                // call leadData API
                if (formData.protectServices.trim()) {
                    await axios.post(
                        "https://tm-brands.digitechtictest.com/api/leadData",
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
                                Authorization: AuthToken,
                            },
                        }
                    );
                }

                toast.success("Data saved successfully!");
                window.location.href = `/thankyou1?id=${leadId}`;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Submission failed!");
        } finally {
            setIsSubmitting(false);
        }
    };
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

    // const [progressnumber, setProgressnumber] = useState({
    //     percent: "20%",
    //     topBarName: "Trademark Application Process",
    // });
    return (
        <SequenceLayout>
            <Helmet>
                <title>Sequence {stepName} | (brandname)</title>
            </Helmet>
            <section className="pt-5">
                <div className="container">
                    {/* <Sidebar progressnumber={progressnumber} steps={false}  /> */}
                    <Toaster position="top-right" reverseOrder={false} />
                    <form
                        onSubmit={handleSubmit}
                        className=" rounded-3 p-5 sequence-form-input mobile-bg-primary"
                        style={{
                            background:
                                "url(../../assets/images/lp-new/lp-bg.webp) no-repeat center/cover",
                        }}
                    >
                        <div className="row g-4 align-items-center">
                            <div className="col-lg-6">
                                {/* <h2 className=" text-uppercase fw-bold font-xxs-40px font-xxxl-52px mb-1">
                                    secure your brand
                                </h2> */}
                                <h3 className="font-xxs-22px font-xxxl-26px fw-bold text-white">
                                    In case we have questions, we will contact
                                    you!
                                </h3>
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
                                    <div className="w-100 position-relative">
                                        <PhoneInput
                                            containerClass={`phone-container d-flex form-control border-2 p-0 ${
                                                errors.phone ? "form-error" : ""
                                            }`}
                                            country={formData.country} // ab single state se
                                            value={formData.phone}
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
                                            onChange={handlePhoneChange}
                                            // countryCodeEditable={false}
                                            disableCountryGuess={true}
                                            disableCountryCode={true}
                                            inputClass={`w-100 bg-transparent border-0`}
                                            inputStyle={{
                                                width: "100%",
                                                minHeight: "46px",
                                                paddingLeft: "1rem",
                                            }}
                                            error={errors.phone}
                                            placeholder=""
                                        />
                                        {errors.phone && (
                                            <span className="text-danger mt-1 d-block">
                                                {errors.phone}
                                            </span>
                                        )}
                                    </div>

                                    {/* 
                                    
                                        <input
                                        type="text"
                                        name="protectServices"
                                        className="form-control px-4 protect-services"
                                        placeholder="What Do You Want To Protect? ( Name, Logo, Slogan )"
                                        value={formData.protectServices}
                                        onChange={handleChange}
                                    />
                                    
                                    */}

                                    <button
                                        className="btn btn-primary bg-white text-black text-uppercase px-5 mt-2"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Submitting..."
                                            : "Save & Continue"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </SequenceLayout>
    );
};

export default Step1;
