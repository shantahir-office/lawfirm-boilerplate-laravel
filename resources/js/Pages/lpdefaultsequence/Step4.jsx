import React, { useState, useEffect, useContext } from "react";
import { Sidebar, SidebarCard } from "../../components/AllComponents";
import SequenceLayout from "../../Layouts/SequenceLayout";
import { Themecontext } from "../../ThemeContext";
import { ApiRequest } from "../../ApiRequest";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../axios";
import { Helmet } from "react-helmet-async";
// import { Step4Packages } from "../../jsonData/Step4Packages";
import { useStepper } from "../../context/SequenceContextNew";
import SidebarCardOld from "../../components/SidebarCardOld";
const Step4 = () => {
    const [stepName, setStepName] = useState("");
    const AuthToken = import.meta.env.VITE_TOKEN;
    const { isData, setData } = useContext(Themecontext);
    const retrievedStep1Data = JSON.parse(localStorage.getItem("step1"));
    const [selectedOption, setSelectedOption] = useState({}); // State for selected radio option
    const [error, setError] = useState(false); // State for error
    const [timesService, settimesService] = useState(1);
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const retrievedStep1Data2 = JSON.parse(localStorage.getItem("step1.2"));
    const quantityData = retrievedStep1Data2.data.find(
        (item) => item.lead_key === "Quantity"
    );
    // console.log(AuthToken);
    const quantityValue = quantityData ? quantityData.lead_value : 1;
    const lead_id = params.get("id");
    const [leadData, setLeadData] = useState(null); // State for LeadData
    const { cartPackages, setStep4Package, step4Package } = useStepper();
    let id = JSON.parse(localStorage?.getItem("sequenceLeadData"));

    const searchPackages = async () => {
        try {
            const PackagesData = await axios.get(
                ApiRequest.Packages + "/search-packages",
                {
                    headers: {
                        Authorization: AuthToken,
                        // "Content-Type": "application/json",
                    },
                }
            );
            if (PackagesData) {
                console.log(PackagesData);
                setLeadData(PackagesData.data);
            } else {
                console.log("No Packages Found");
            }
        } catch (error) {
            console.log(error);
            window.alert("Failed To Get Packages");
            return;
        }
    };
    useEffect(() => {
        searchPackages();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(cartPackages, "Use Context");
        const hasSearchPackage = cartPackages.some(
            (item) => item.package_type === "search-packages"
        );
        if (!hasSearchPackage) {
            if (step4Package == (null || undefined)) {
                setError(true);
                toast.error("Select A Package Please");
                scrollToFirstError();
                console.log("returned");
                return;
            }
            try {
                const data = await axios.post(
                    ApiRequest.addToCart,
                    {
                        lead_id: lead_id,
                        item_price: step4Package.price,
                        item_name: step4Package.name,
                        package_id: step4Package.id,
                        item_quantity: quantityValue,
                    },
                    {
                        headers: {
                            Authorization: AuthToken,
                            // "Content-Type": "application/json",
                        },
                    }
                );
                console.log(data);
                console.log(!step4Package.question);
                if (data) {
                    // Save the response data to context
                    setData(data);
                    localStorage.setItem(
                        "step4",
                        JSON.stringify(data?.data?.data)
                    );
                    // alert(data)
                    toast.success("Form submitted successfully!");
                    // console.log(selectedOption.answer,"Selected Option Answer");
                    window.location.href = `/lp/sequence/step5?id=${lead_id}`;
                }
            } catch (error) {
                console.error("Error:", error);
                // window.location.href = `/lp/sequence/step5?id=${lead_id}`;
                // alert("Error submitting the form");
                toast.error("Error submitting the form");
                return;
            }
        } else {
            toast.success("Proceeding To Next Step");
            window.location.href = `/lp/sequence/step5?id=${lead_id}`;
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
    const [progressnumber, setProgressnumber] = useState({
        percent: "57%",
        topBarName: "Budget-Friendly Trademark Packages",
    });

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
                            <div className="col-lg-9">
                                <div className=" bg-white p-4 p-lg-5 rounded-4">
                                    <h2 className=" fw-semibold  font-xxs-25px font-md-40px mb-4 mb-lg-10">
                                        <span className=" text-primary">
                                            Search
                                        </span>{" "}
                                        Packages
                                    </h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="border-1 border-bottom mb-4 pb-4">
                                            <h1 className="fw-semibold font-xxs-20px  font-md-25px d-block text-primary">
                                                Dear{" "}
                                                {retrievedStep1Data.name ? (
                                                    retrievedStep1Data?.name
                                                ) : (
                                                    <>Client Name</>
                                                )}
                                            </h1>
                                            <p className="font-xxs-15px m-0 "> Thank you for providing us your trademark details. Our senior trademark experts have received your information and are ready to file your U.S. trademark application. Please select a below given service package that suits your requirements and recommended add ons identified by our system to move ahead with the process. If you intend to apply for trademark of logo and name, then cost of two applications will be added in your service package.
                                            </p>
                                        </div>
                                        <div className="border-1 border-bottom mb-5 pb-4">
                                            <h1 className="fw-semibold  font-xxs-16px font-md-20px d-block text-center">
                                                TRADEMARK SEARCH PACKAGES
                                            </h1>
                                            <p className="font-xxs-15px m-0 "> (brandname) search is your gateway to more than 1 billion records from 50 states & 19,000+ cities and towns from all over the USA as well as in the UK, and from 196 countries globally. With this service, (brandname) runs a database check to see if a similar trademark to yours is already registered or is applied for registration. If a conflict is found, you are notified prior to filing your application so that you may make the necessary changes to avoid rejection.
                                            </p>
                                        </div>

                                        {/* Radio Button Options */}
                                        <div className="row g-3 target-package-step-card-colors">
                                            {leadData?.map((option, index) => (
                                                <div className=" col-md-6">
                                                    <div
                                                        key={index}
                                                        className={`d-flex flex-column gap-3 cover-step-package-card h-100 `}
                                                    >
                                                        <input
                                                            type="radio"
                                                            className="btn-check"
                                                            name="btncheckbox"
                                                            id={index}
                                                            autoComplete="off"
                                                            hidden
                                                            onChange={() => {
                                                                setSelectedOption(
                                                                    option
                                                                );

                                                                setStep4Package(
                                                                    option
                                                                );
                                                                setError(false); // Clear error on selection
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={index}
                                                            className={`btn btn-primary step-package-card rounded-20px p-3 p-lg-4 text-start h-100 ${
                                                                error &&
                                                                step4Package ==
                                                                    null &&
                                                                "border border-danger"
                                                            }`}
                                                        >
                                                            <div className="d-flex align-items-center justify-content-between gap-2  flex-nowrap mb-4">
                                                                <span
                                                                    className="fw-bold font-xxs-16px font-md-21px lh-sm d-block width-lg"
                                                                    style={{
                                                                        "--cstm-lg-width":
                                                                            "50%",
                                                                    }}
                                                                >
                                                                    {
                                                                        option.name
                                                                    }
                                                                </span>
                                                                <h2
                                                                    className="text-black m-0 fw-bold"
                                                                    style={{
                                                                        fontSize:
                                                                            "clamp(30px, 5vw, 40px)",
                                                                    }}
                                                                >
                                                                    $
                                                                    {
                                                                        option.price
                                                                    }
                                                                </h2>
                                                            </div>
                                                            <p className="m-0 font-xxs-15px">
                                                                {
                                                                    option.description
                                                                }
                                                            </p>
                                                            {option.additionalInfo && (
                                                                <span className="fw-bold font-xxs-16px font-xxl-18px d-block lh-sm mb-2">
                                                                    {
                                                                        option.additionalInfo
                                                                    }
                                                                </span>
                                                            )}
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <p className="font-xxs-15px mt-4 px-3 "> For even more assurance, you may want to consider a more detailed search. While the basic free search covers the USPTO, it does not cover the 50 states, common law, domain names, international searches or include a detailed report. With more intel, you can make better choices. If you pick one of these options, you will still complete the application now. However, no application will be filed with the USPTO until you have had a chance to review any of the paid searches, approve the application in light of the searches or easily come back here and make some changes before your application is filed.
                                        </p>
                                        <ul className="mt-5 text-center text-md-end px-3">
                                            <li>
                                                <button
                                                    type="submit" // Change to button to handle submission
                                                    className="btn btn-secondary py-3 px-4 fw-semibold font-md-17px  lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-between text-uppercase"
                                                >
                                                    Continue To The Next Step
                                                </button>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <SidebarCardOld
                                    // title={selectedOption.name}
                                    // price={selectedOption.price}
                                    timesmultiplied={quantityValue}
                                    step={4}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </SequenceLayout>
        </>
    );
};

export default Step4;
