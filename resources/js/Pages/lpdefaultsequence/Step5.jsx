import React, { useEffect, useState } from "react";
import SequenceLayout from "../../Layouts/SequenceLayout";
import { Sidebar, SidebarCard } from "../../components/AllComponents";
import toast, { Toaster } from "react-hot-toast";
import { ApiRequest } from "../../ApiRequest";
// import { JsonPackages } from "../../jsonData/JsonPackages";
import axios from "../../axios";
import { Helmet } from "react-helmet-async";
import { useStepper } from "../../context/SequenceContextNew";
import SidebarCardOld from "../../components/SidebarCardOld";
// import { AmazonBrandRegistry } from "../../jsonData/AmazonBrandRegistry";
const Step5 = () => {
    const [stepName, setStepName] = useState("");
    const AuthToken = import.meta.env.VITE_TOKEN;
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [selectedPackagePrice, setSelectedPackagePrice] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({ package: "", terms: "" });
    const [errors2, setErrors2] = useState(false);
    const [timesService, settimesService] = useState(1);
    const retrievedStep1Data2 = JSON.parse(localStorage.getItem("step1.2"));
    const [step5Data, setStep5PackagesData] = useState(null);
    const quantityData = retrievedStep1Data2.data.find(
        (item) => item.lead_key === "Quantity"
    );
    const {
        cartPackages,
        setstep5Package,
        step5Package,
        setAmazonBrand,
        setAmazonBrandPrice,
        setrushFilling,
        rushFilling,
    } = useStepper();
    const quantityValue = quantityData ? quantityData.lead_value : 1;
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // For loading state
    const [rushFiling, setRushFiling] = useState(null);
    const [rushFilingPrice, setRushFilingPrice] = useState(null);
    const [AmazonBrandRegistryData, setAmazonBrandRegistryData] =
        useState(null);
    const [rushFillingID, setrushFillingID] = useState(null);
    const [amaznbrndreg, setAmaznbrndreg] = useState(null);
    const retrievedData = JSON.parse(localStorage.getItem("leadData"));
    const retrievedStep1Data = JSON.parse(localStorage.getItem("step1"));
    // const retrievedStep4Data = JSON.parse(localStorage.getItem("step4")) || 0;
    // const retrievedStep4Dataprice = JSON.parse(
    //     localStorage.getItem("step4")
    // ).find((item) => item.lead_key === "Total Price");
    // const totalPriceValue = retrievedStep4Dataprice
    //     ? retrievedStep4Dataprice.lead_value
    //     : 1;
    const [isChecked, setIsChecked] = useState(rushFilling);
    // const retrievedStep5 = JSON.parse(localStorage.getItem("step5"));
    const [rushFill, setrushFill] = useState(false);
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const lead_id = params.get("id");
    // const handlePackageSelect = (
    //     pkgId,
    //     pkgName,
    //     pkgPrice,
    //     rushFiling,
    //     rushfilingPrice,
    //     // amazonBrandRegistryPrice,
    //     rushFilingId
    // ) => {
    //     console.log(rushFilingId, "RUSH FILING ID");
    //     setSelectedPackage(pkgName);
    //     setSelectedPackageId(pkgId);
    //     // setAmaznbrndreg(amazonBrandRegistryPrice);
    //     setSelectedPackagePrice(pkgPrice);
    //     setRushFiling(rushFiling);
    //     setrushFillingID(rushFilingId);
    //     setRushFilingPrice(rushfilingPrice);
    //     console.log(rushFiling);
    //     toast.success("Package Added");
    //     setErrors({ ...errors, package: "" }); // Clear package error
    // };
    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg.name);
        setstep5Package(pkg);
        console.log(pkg.rushFiling.enabled, "ENABLED");
        setRushFiling(pkg.rushFiling.enabled);
        setIsChecked(rushFiling ? pkg.rushFiling.enabled : false);
        setrushFilling(rushFiling ? pkg.rushFiling.enabled : 0);
        setRushFilingPrice(pkg.rushFiling.price);
        toast.success("Package Added");
        setErrors({ ...errors, package: "" }); // Clear package error
        setErrors2(false); // Clear package error
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

    const rushFillChange = (pkgname) => {
        if (step5Package === null) {
            setIsChecked(false);
            setrushFilling(false); // Uncheck the checkbox
            toast.error("Select A Package First");
        } else if (selectedPackage === pkgname && rushFiling !== 0) {
            setIsChecked((prev) => !prev);
            console.log(rushFilling, "RUSHFILLING");
            setrushFilling((prev) => !prev);
            // setRushFiling(!isChecked);
            // if (isChecked) {
            //     toast.success("Rush Fill Added");
            // }
        } else {
            console.log("RUSHFILING", rushFiling);
            toast.error("Select A Package First");
            setstep5Package(null);
            // setSelectedPackagePrice(null);
            setIsChecked(false);
            setrushFilling(false); // Uncheck if another package is selected
        }
    };
    // Empty dependency array means this runs only once when the component mounts.

    const handleSubmit = async (event) => {
        event.preventDefault();

        // console.log(cartPackages, "Use Context");
        const hasFilingPackage = cartPackages.some(
            (item) => item.package_type === "filing-packages"
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
                scrollToFirstError();
                console.log("returned");
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
                    ...(isChecked && rushFiling
                        ? [
                              {
                                  lead_id: lead_id,
                                  item_price: rushFilingPrice,
                                  item_name: "Rush Filing",
                                  package_id: step5Package.rushFiling.id,
                                  item_quantity: quantityValue,
                              },
                          ]
                        : []),
                ];

                // Send all requests concurrently
                const responses = await Promise.all(
                    items.map((item) =>
                        axios.post(ApiRequest.addToCart, item, {
                            headers: { Authorization: AuthToken },
                        })
                    )
                );

                // console.log("All items added to cart:", responses);

                // Handle the successful response
                toast.success("Form submitted successfully");
                // localStorage.setItem("step5", JSON.stringify(response.data.data));
                // console.log("Form submitted successfully:", response.data);

                window.location.href = `/lp/sequence/step6?id=${lead_id}`;
                // window.location.href = `/thank-you?id=${lead_id}`
                // You can redirect to the next step or show a success message here
            } catch (error) {
                // Handle errors (e.g., network errors, server errors)
                console.error("Error submitting lead data:", error);
                // alert("There was an error submitting the lead. Please try again.");
                toast.error(
                    "There was an error submitting the form. Please try again."
                );
            } finally {
                setIsLoading(false); // Reset loading state
            }
        } else {
            toast.success("Proceeding To next Step");
            window.location.href = `/lp/sequence/step6?id=${lead_id}`;
        }
    };
    const [progressnumber, setProgressnumber] = useState({
        percent: "71%",
        topBarName: "Filing Packages",
    });
    // const { AmazonName, AmazonPrice, AmazonDescription } = AmazonBrandRegistryData;
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
                    }
                );
                const AMZNBrandRegisterData = await axios.get(
                    `${ApiRequest.Packages}/amazon-brand-registry`,
                    {
                        headers: {
                            Authorization: AuthToken,
                        },
                    }
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
                        AMZNBrandRegisterData.data
                    );
                    setAmazonBrandRegistryData(AMZNBrandRegisterData.data);
                    setAmazonBrandPrice(
                        AMZNBrandRegisterData.data?.AmazonPrice
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
                                    <h2 className=" fw-semibold  font-xxs-25px font-md-40px mb-4 mb-lg-10 ">
                                        <span className=" text-primary">
                                            Filing
                                        </span>{" "}
                                        Packages
                                    </h2>
                                    <form
                                        className=" overflow-hidden"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="border-1 border-bottom mb-5 pb-4">
                                            <h1 className="fw-semibold font-xxs-20px font-md-25px d-block text-primary">
                                                Dear{" "}
                                                {retrievedStep1Data.name ? (
                                                    retrievedStep1Data?.name
                                                ) : (
                                                    <>Client Name</>
                                                )}
                                            </h1>
                                            <p className="font-xxs-15px m-0 ">
                                                Thank you for selecting a search
                                                package, please select the below
                                                given filing package that suits
                                                your requirements and
                                                recommended add-on identified by
                                                our system to move ahead with
                                                the process.
                                            </p>
                                        </div>
                                        <div className="row g-13 g-md-4 ">
                                            {step5Data !== null &&
                                                step5Data.map((pkg) => (
                                                    <div
                                                        className={`col-md-6 col-xl-4 col-xxxl-4`}
                                                        key={pkg.name}
                                                    >
                                                        <div
                                                            className={`bg-white rounded-20px border border-1 position-relative   ${
                                                                isSubmitClicked &&
                                                                step5Package ==
                                                                    null &&
                                                                errors2 &&
                                                                "border border-danger"
                                                            }`}
                                                        >
                                                            {pkg.badge && (
                                                                <div
                                                                    className={`price-badge px-3 pb-1  rounded position-absolute start-50 translate-middle-x ${pkg.badge}`}
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
                                                                    {pkg.badge}
                                                                </div>
                                                            )}

                                                            <div className="border-1 border-bottom">
                                                                <span
                                                                    className="font-xxs-20px font-md-35px d-block fw-semibold text-center p-4 bg-light lh-1"
                                                                    style={{
                                                                        borderTopLeftRadius:
                                                                            "20px",
                                                                        borderTopRightRadius:
                                                                            "20px",
                                                                    }}
                                                                >
                                                                    {pkg.name}
                                                                </span>
                                                                <div className="d-block fw-semibold text-center p-3 border-1 border-top">
                                                                    <span
                                                                        className="lh-1"
                                                                        style={{
                                                                            fontSize:
                                                                                "clamp(30px, 5vw, 55px)",
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

                                                                <ul className="overflow-hidden overflow-y-auto d-flex flex-column gap-2 ps-4 mt-2">
                                                                    {pkg.features.map(
                                                                        (
                                                                            feature
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
                                                                        )
                                                                    )}
                                                                </ul>
                                                                {pkg.rushFiling &&
                                                                pkg.rushFiling
                                                                    .enabled ? (
                                                                    <div className="form-check d-flex align-items-center p-0 gap-2 mt-9">
                                                                        <input
                                                                            className="form-check-input m-0 p-0"
                                                                            type="checkbox"
                                                                            onChange={() => {
                                                                                rushFillChange(
                                                                                    pkg.name
                                                                                );
                                                                            }}
                                                                            checked={
                                                                                isChecked &&
                                                                                pkg.name ==
                                                                                    selectedPackage
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
                                                                ) : (
                                                                    <></>
                                                                )}

                                                                <ul className=" mt-5">
                                                                    <li className="flex-grow-1">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-secondary py-3 px-4 fw-semibold font-md-17px  lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-center text-uppercase w-100"
                                                                            onClick={() => {
                                                                                // handlePackageSelect(
                                                                                //     pkg.id,
                                                                                //     pkg.name,
                                                                                //     pkg.price,
                                                                                //     pkg
                                                                                //         .rushFiling
                                                                                //         .enabled,
                                                                                //     pkg
                                                                                //         .rushFiling
                                                                                //         .price,
                                                                                //     pkg.rushFiling.id,
                                                                                // );
                                                                                // setstep5Package(
                                                                                //     pkg
                                                                                // )
                                                                                handlePackageSelect(
                                                                                    pkg
                                                                                );
                                                                            }}
                                                                        >
                                                                            Add
                                                                            To
                                                                            Cart
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                        {/* Amazon Brand Registry Section */}
                                        {AmazonBrandRegistryData !== null ? (
                                            <>
                                                <div className="border-1 border-top pt-5 mt-13">
                                                    <div className="form-check  p-0 d-flex gap-2 align-items-baseline mb-3">
                                                        <input
                                                            className="form-check-input m-0"
                                                            type="checkbox"
                                                            id="Amazon"
                                                            name="brandRegistry"
                                                            onChange={
                                                                handleBrandChange
                                                            }
                                                            style={{
                                                                width: "22px",
                                                                height: "22px",
                                                                "--cstm-border-width":
                                                                    "2px",
                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label font-xxs-23px fw-semibold "
                                                            htmlFor="Amazon"
                                                            role="button"
                                                        >
                                                            <span className="mb-n1">
                                                                {
                                                                    AmazonBrandRegistryData?.AmazonName
                                                                }{" "}
                                                                $
                                                                {
                                                                    AmazonBrandRegistryData?.AmazonPrice
                                                                }
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <p className="">
                                                        {
                                                            AmazonBrandRegistryData?.AmazonDescription
                                                        }
                                                    </p>

                                                    <div className="text-end">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-secondary py-3 px-4 fw-semibold font-md-17px  lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-between text-uppercase mt-4"
                                                            disabled={isLoading}
                                                        >
                                                            {isLoading
                                                                ? "Submitting..."
                                                                : "Proceed To Checkout"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <span className="">Loading..</span>
                                        )}
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <SidebarCardOld
                                    // title={retrievedStep4Data[0].lead_key}
                                    // title={"taasd"}
                                    // price={33}
                                    step={5}
                                    timesmultiplied={quantityValue}
                                    package2={
                                        {
                                            // PackageName: selectedPackage,
                                            // PackagePrice: selectedPackagePrice,
                                            // AmazonBrand: selectedBrand,
                                            // rushFilling: isChecked,
                                            // rushFillEnabled: rushFiling,
                                            // rushFilingPrice: rushFilingPrice,
                                            // amazonPrice:
                                            //     AmazonBrandRegistryData?.AmazonPrice,
                                            // rushFillingPrice: pkg.rushFiling.price
                                        }
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </SequenceLayout>
        </>
    );
};

export default Step5;
