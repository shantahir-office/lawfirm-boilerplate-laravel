import React, { useEffect, useState } from "react";
import SequenceLayout from "../../Layouts/SequenceLayout";
import { Sidebar } from "../../components/AllComponents";
import SidebarCard from "../../components/SidebarCard";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import { ApiRequest } from "../../ApiRequest";
import axios from "../../axios";
import { Helmet } from "react-helmet-async";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import StepperProgress from "../../components/StepperProgress";
const Step4 = () => {
    const AuthToken = import.meta.env.VITE_TOKEN;
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const lead_id = params.get("id");
    const [packageChecked, setpackageChecked] = useState(false);
    const [failedPayment, setfailedPayment] = useState(false);
    const [searchPackages, setSearchPackages] = useState([]);
    const [cartData, setCartData] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [retrievedStep1Data2, setretrievedstep1Data2] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formValues, setFormValues] = useState({
        cardHolderName: "",
        cardNumber: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        expiryDate: "",
        cvc: "",
        expiry__month: "",
        expiry__year: "",
    });
    // const [formErrors, setFormErrors] = useState({});
    const quantityData = retrievedStep1Data2?.find(
        (item) => item.lead_key === "Quantity"
    );
    const quantityValue = quantityData ? quantityData?.lead_value : 1;
    const [formErrors, setFormErrors] = useState({});
    const [filingError, setFilingError] = useState(false);

    // Payment input hooks (from step6)
    const {
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        wrapperProps,
        getCardImageProps,
    } = usePaymentInputs();
    async function getRetrievedData(id, AuthToken) {
        // console.log(id, AuthToken, "id and token");
        try {
            const retrievedData1 = await axios.post(
                ApiRequest.getLeadData,
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
            setretrievedstep1Data2(retrievedData1.data.leadData);
            // console.log(retrievedData1, "retrievedData");z
        } catch (error) {
            console.error("Error fetching retrieved data:", error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await getRetrievedData(lead_id, AuthToken);
                // const res2 = await getLeadData(lead_id, AuthToken);
                // console.log(res1, res2, "res1 and res2");
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // Call the async function inside useEffect
    }, []);

    // Fetch search packages
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await axios.get(
                    `${ApiRequest.Packages}/search-packages`,
                    { headers: { Authorization: AuthToken } }
                );
                setSearchPackages(res.data || []);
            } catch (error) {
                toast.error("Failed to fetch packages");
            }
        };
        fetchPackages();
    }, [AuthToken]);

    // Fetch cart
    const fetchCart = async () => {
        try {
            const CartData = await axios.post(
                `${ApiRequest.getCart}`,
                { lead_id: lead_id },
                { headers: { Authorization: AuthToken } }
            );
            setCartData(CartData.data);

            // Update selectedPackage based on cart contents
            if (CartData.data?.items?.length) {
                const searchPkg = CartData.data.items.find(
                    (item) => item.package_type === "search-packages"
                );
                setSelectedPackage(searchPkg ? searchPkg.item_name : null);
            } else {
                setSelectedPackage(null);
            }
        } catch (error) {
            setCartData(null);
            setSelectedPackage(null);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [lead_id]);

    // Add package to cart
    const handlePackageSelect = async (pkg) => {
        setIsLoading(true);
        try {
            await axios.post(
                ApiRequest.addToCart,
                {
                    lead_id: lead_id,
                    item_price: pkg.price,
                    item_name: pkg.name,
                    package_id: pkg.id,
                    item_quantity: quantityValue,
                },
                { headers: { Authorization: AuthToken } }
            );
            setSelectedPackage(pkg.name);
             setpackageChecked(false);   // ✅ clear error
        setFilingError(false);      // ✅ clear error
            toast.success("Package added to cart");
            fetchCart();
        } catch (error) {
            toast.error("Failed to add package");
        } finally {
            setIsLoading(false);
        }
    };

    // Payment form handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedValues = { ...formValues, [name]: value };

        if (name === "expiryDate") {
            const [month, year] = value.split("/").map((str) => str.trim());
            updatedValues = {
                ...updatedValues,
                expiry__month: month,
                expiry__year: year,
            };
        }
        if (name === "cardNumber") {
            updatedValues = {
                ...updatedValues,
                [name]: value.replace(/\s/g, ""),
            };
        }
        setFormValues(updatedValues);
    };

    function expDateValidate(expDate) {
        const [month, year] = expDate.split("/").map((str) => str.trim());
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const expiryYear = Number(`20${year}`);
        const expiryMonth = Number(month);
        if (expiryYear > 2035) {
            return "Expiry Date Year cannot be greater than 2035";
        }
        if (
            expiryYear < currentYear ||
            (expiryYear === currentYear && expiryMonth < currentMonth)
        ) {
            return "Card is expired";
        }
        return;
    }

    const validate = () => {
        let errors = {};
        if (!formValues.cardHolderName.trim()) {
            errors.cardHolderName = true;
            toast.error("Please enter Card Holder Name");
        }
        if (!formValues.address.trim()) {
            toast.error("Please enter Your Address");
            errors.address = true;
        }
        // if (!formValues.state.trim()) {
        //     toast.error("Please enter Your State");
        //     errors.state = true;
        // }
        // if (!formValues.city.trim()) {
        //     toast.error("Please enter Your City");
        //     errors.city = true;
        // }
        if (
            !formValues.cardNumber ||
            formValues.cardNumber.replace(/\s/g, "").length < 15 ||
            formValues.cardNumber.replace(/\s/g, "").length > 19
        ) {
            errors.cardNumber = true;
            toast.error("Please enter Card Number Correctly");
        }
        const validationMessage = expDateValidate(formValues.expiryDate);
        if (validationMessage) {
            errors.expiryDate = true;
            toast.error(validationMessage);
        }
        if (!formValues.cvc) {
            toast.error("Please enter Your CVC");
            errors.cvc = true;
        }
        if (!formValues.zipCode) {
            toast.error("Please enter Your Zipcode");
            errors.zipCode = true;
        }
        return errors;
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        // Check for search package in cart
        const hasSearchPackage = cartData?.items?.some(
            (item) => item.package_type === "search-packages"
        );
        if (!hasSearchPackage) {
            toast.error("Please select a search package before paying.");
            setpackageChecked(true);
            setFilingError(true);
            scrollToFirstError();
            setIsSubmitting(false);
            return;
        }

        const errors = validate();
        setFormErrors(errors);
        setIsSubmitting(true);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post(
                    ApiRequest.leadPayment,
                    {
                        lead_id: lead_id,
                        lead_step: 4,
                        amount: cartData.total,
                        card_num: formValues.cardNumber,
                        card_expiry_month: formValues.expiry__month,
                        card_expiry_year: formValues.expiry__year,
                        card_cvv: formValues.cvc || formValues.cvv,
                        card_address: formValues.address,
                        card_city: formValues.city,
                        card_state: formValues.state,
                        card_zip: formValues.zipCode,
                        card_name: formValues.cardHolderName,
                        step: 4,
                    },
                    {
                        headers: {
                            Authorization: AuthToken,
                        },
                    }
                );

                if (response.data.status === "success") {
                    toast.success("Payment done successfully");
                    setfailedPayment(false);
                    // Optionally clear cart here if needed
                    window.location.href = `/thank-you?id=${lead_id}`;
                } else {
                    toast.error("Payment failed!");
                    setfailedPayment(true);
                    setIsSubmitting(false);
                }
            } catch (error) {
                toast.error("Payment failed!");
                setfailedPayment(true);
                setIsSubmitting(false);
            }
        } else {
            setfailedPayment(true);
            setIsSubmitting(false);
        }
    };

    const handleSkip = () => {
        window.location.href = "/thankyou";
    };

    const [progressnumber, setProgressnumber] = useState({
        percent: "80%",
        topBarName: "Trademark Application Process",
    });

     const scrollToFirstError = () => {
        setTimeout(() => {
            const fieldError = document.querySelector(".border-danger, .scrollIntoView");
            if (fieldError) {
                fieldError.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                fieldError.focus();
            }
        }, 0);
    };
    return (
        <>
            <SequenceLayout>
                <Helmet>
                    <title>Sequence Step 4 |  (brandname)</title>
                </Helmet>
                <section className="pt-5">
                    <div className="container">
                        <StepperProgress currentStep={4} totalSteps={4} />
                        <Toaster position="top-right" reverseOrder={false} />
                        <div className="row g-3">
                            <div className="col-lg-9">
                                <div
                                    className="p-3"
                                    style={{ background: "#f6f6f6" }}
                                >
                                    <h2
                                        className="fw-bold font-xxs-25px font-md-35px mb-4"
                                        style={{ color: "#032554" }}
                                    >
                                        Trademark Search Packages
                                    </h2>
                                    <div className=" d-flex flex-column gap-3">
                                        <div className=" border-1 border-bottom pb-3">
                                            <span
                                                className="h6 d-block fw-bold"
                                                style={{ color: "#032554" }}
                                            >
                                                What is Trademark Search?
                                            </span>
                                            <p className=" font-xxs-15px m-0">
                                                A trademark search is a
                                                background check for your brand
                                                name, logo or slogan. Before
                                                filing with the USPTO, it’s a
                                                smart step to check if someone
                                                else has already registered the
                                                same or a similar mark.
                                                Identifying potential issues
                                                early helps prevent USPTO
                                                rejections and safeguards your
                                                brand before you file.
                                            </p>
                                        </div>
                                        <div className=" border-1 border-bottom pb-3">
                                            <span
                                                className="h6 d-block fw-bold"
                                                style={{ color: "#032554" }}
                                            >
                                                Why it is important?
                                            </span>
                                            <p className=" font-xxs-15px m-0">
                                                Your brand name is one of your
                                                most valuable assets. Protecting
                                                it starts with a trademark
                                                search; a smart investment that
                                                helps you avoid costly
                                                rejections or legal disputes. A
                                                thorough search ensures your
                                                name isn’t already in use or too
                                                similar to an existing
                                                trademark. Think of it as a
                                                crucial safety check before you
                                                file, giving you confidence that
                                                your brand is clear to use.
                                            </p>
                                        </div>

                                        <div className=" border-1 border-bottom pb-3">
                                            <span
                                                className="h6 d-block fw-bold"
                                                style={{ color: "#032554" }}
                                            >
                                                How we do it?
                                            </span>
                                            <p className=" font-xxs-15px m-0">
                                                Our Comprehensive Trademark
                                                Search looks through trademark
                                                databases from 196 countries to
                                                find any existing or pending
                                                names or logos that might
                                                conflict with yours.
                                            </p>
                                        </div>
                                    </div>
                                    <h2
                                        className=" fw-bold h4 my-5"
                                        style={{ color: "#032554" }}
                                    >
                                        Choose The Trademark Search Package That
                                        Best Suits Your Needs
                                    </h2>
                                    <div className="row g-3 scrollIntoView">
                                        {searchPackages.map((pkg) => (
                                            <div
                                                className="col-md-6 col-xl-4"
                                                key={pkg.id}
                                            >
                                                <div className={`bg-white rounded-20px border border-1 position-relative ${packageChecked ? "border-danger scrollIntoView " : ""}`}>
                                                    {pkg.badge && (
                                                        <div
                                                            className={`price-badge px-3 pb-1 text-white rounded position-absolute start-50 translate-middle-x`}
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
                                                            className="font-xxs-28px font-md-30px d-block fw-semibold text-center p-4 bg-light lh-1"
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
                                                                        "clamp(30px, 5vw, 50px)",
                                                                }}
                                                            >
                                                                ${pkg.price}
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
                                                        {pkg.beforeContent ? (
                                                            <p className="text-center fw-bold font-xxs-15px m-0">
                                                                {
                                                                    pkg.beforeContent
                                                                }
                                                            </p>
                                                        ) : null}
                                                        <ul className="overflow-hidden overflow-y-auto d-flex flex-column gap-2 ps-4 mt-2">
                                                            {pkg.features?.map(
                                                                (feature) => (
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
                                                        <ul className="mt-5">
                                                            <li className="flex-grow-1">
                                                                <button
                                                                    type="button"
                                                                    className={`btn btn-primary py-3 px-4 fw-semibold font-md-17px lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-center text-uppercase w-100 border border-black  ${
                                                                        selectedPackage ===
                                                                        pkg.name
                                                                            ? "active"
                                                                            : ""
                                                                    }`}
                                                                    disabled={
                                                                        isLoading ||
                                                                        selectedPackage ===
                                                                            pkg.name
                                                                    }
                                                                    onClick={() =>
                                                                        handlePackageSelect(
                                                                            pkg
                                                                        )
                                                                    }
                                                                >
                                                                    {selectedPackage ===
                                                                    pkg.name
                                                                        ? "Selected"
                                                                        : "Add To Cart"}
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="row g-3 mt-5 flex-col">
                                        {/* <div className="col-12">
                                            <div
                                                className="p-3 mb-4 rounded-3"
                                                role="alert"
                                                style={{
                                                    background: "#fff3cd",
                                                    color: "#664d03",
                                                    border: "1px solid #ffecb5",
                                                }}
                                            >
                                                <strong>Note:</strong> Please do
                                                not refresh or close this page
                                                while your payment is
                                                processing. Doing so may result
                                                in double charges or incomplete
                                                transactions. Your patience is
                                                appreciated as we securely
                                                process your
                                                payment.&nbsp;Thank&nbsp;you.
                                            </div>
                                        </div> */}
                                        <p>
                                            <strong>Please Note:</strong> If you
                                            are filing multiple trademark
                                            applications, please note that the
                                            cost for each will be added to your
                                            selected package accordingly.
                                        </p>
                                        <div
                                            className=" mx-auto"
                                            style={{ maxWidth: "400px" }}
                                        >
                                            {failedPayment ? (
                                                <>
                                                    <div
                                                        className="mx-auto mb-4 d-lg-block d-none"
                                                        style={{
                                                            maxWidth: "660px",
                                                        }}
                                                    >
                                                        <span className=" bg-danger text-white fw-semibold p-1 d-inline-block">
                                                            Attention!
                                                        </span>
                                                        <div className=" d-flex align-items-center gap-2 border border-danger px-3">
                                                            <img
                                                                src="/sequence-assets/img/icons/warning.png"
                                                                alt="warninig"
                                                                width={20}
                                                                height={20}
                                                            />
                                                            <span className=" font-xxs-12px font-md-15px text-uppercase fw-medium">
                                                                Your Payment for
                                                                Trademark Filing
                                                                Was
                                                                Unsuccessful.
                                                                Please Try Again!
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="mx-auto mb-4 d-lg-none bg-white d-block"
                                                        style={{
                                                            maxWidth: "660px",
                                                            position: "sticky",
                                                            top: "0",
                                                            zIndex: "9999",
                                                        }}
                                                    >
                                                        <span className=" bg-danger text-white fw-semibold p-1 d-inline-block">
                                                            Attention!
                                                        </span>
                                                        <div className=" d-flex align-items-center gap-2 border border-danger px-3">
                                                            <img
                                                                src="/sequence-assets/img/icons/warning.png"
                                                                alt="warninig"
                                                                width={20}
                                                                height={20}
                                                            />
                                                            <span className=" font-xxs-12px font-md-15px text-uppercase fw-medium">
                                                                Your Payment for
                                                                Trademark Filing
                                                                Was
                                                                Unsuccessful.
                                                                Please Try Again!
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : null}
                                            <h2 className="fw-bold d-block text-center mb-3">
                                                Payment Details
                                            </h2>
                                            <div className="border border-1 border-dark rounded-3 overflow-hidden">
                                                <div className="bg-primary p-2">
                                                    <h2 className="d-flex justify-content-between align-items-center text-white fw-bold h4 text-uppercase d-block text-center m-0 lh-base">
                                                        <span>
                                                            Total Invoice
                                                            Amount:
                                                        </span>
                                                        {cartData?.total !==
                                                            undefined ||
                                                        null ? (
                                                            <span>
                                                                {"$" +
                                                                    cartData?.total}
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                <LoaderIcon />
                                                            </span>
                                                        )}
                                                    </h2>
                                                </div>
                                                <div className="p-3">
                                                    <div className="row g-2">
                                                        <div className="col-12">
                                                            <label
                                                                htmlFor=""
                                                                className="font-xxs-14px"
                                                                style={{
                                                                    color: "#032554",
                                                                }}
                                                            >
                                                                Name On Card
                                                            </label>
                                                            <div className=" position-relative">
                                                                <img
                                                                    src="/sequence-assets/assets-updated/img/icons/user.png"
                                                                    alt="use"
                                                                    width={20}
                                                                    height={20}
                                                                    className="  object-fit-contain position-absolute top-50 state-0 translate-middle-y ms-3"
                                                                    style={{
                                                                        opacity: 0.4,
                                                                    }}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    name="cardHolderName"
                                                                    value={
                                                                        formValues.cardHolderName
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    className={`form-control rounded-3 ps-7 font-xxxl-20px default-input ${
                                                                        formErrors.cardHolderName
                                                                            ? "border-danger"
                                                                            : ""
                                                                    }`}
                                                                    placeholder="Card Holder Name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <label
                                                                htmlFor=""
                                                                className="font-xxs-14px"
                                                                style={{
                                                                    color: "#032554",
                                                                }}
                                                            >
                                                                Card Number
                                                            </label>
                                                            <div
                                                                className={`form-control rounded-3 ps-4 font-xxxl-20px paymentcard-number py-0 d-flex gap-2 align-items-center ${
                                                                    formErrors.cardNumber &&
                                                                    formErrors.cardNumber
                                                                        ? "border-danger"
                                                                        : ""
                                                                }`}
                                                            >
                                                                <svg
                                                                    {...getCardImageProps(
                                                                        {
                                                                            images,
                                                                        }
                                                                    )}
                                                                />
                                                                <input
                                                                    style={{
                                                                        border: "0px",
                                                                        padding:
                                                                            "0px",
                                                                    }}
                                                                    {...getCardNumberProps(
                                                                        {
                                                                            onChange:
                                                                                (
                                                                                    e
                                                                                ) =>
                                                                                    handleInputChange(
                                                                                        e
                                                                                    ),
                                                                        }
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <label
                                                                htmlFor=""
                                                                className="font-xxs-14px"
                                                                style={{
                                                                    color: "#032554",
                                                                }}
                                                            >
                                                                Expiration Date
                                                            </label>
                                                            <div
                                                                className={`rounded-3 px-3 bg-white d-flex align-items-center justify-content-between relative form-control py-0 ${
                                                                    formErrors.expiryDate
                                                                        ? "border border-1 border-danger"
                                                                        : ""
                                                                }`}
                                                            >
                                                                <div className=" position-relative">
                                                                    <img
                                                                        src="/sequence-assets/assets-updated/img/icons/calendar.png"
                                                                        alt="use"
                                                                        width={
                                                                            20
                                                                        }
                                                                        height={
                                                                            20
                                                                        }
                                                                        className="object-fit-contain position-absolute top-50 state-0 translate-middle-y"
                                                                        style={{
                                                                            opacity: 0.4,
                                                                        }}
                                                                    />
                                                                    <input
                                                                        {...getExpiryDateProps(
                                                                            {
                                                                                onChange:
                                                                                    (
                                                                                        e
                                                                                    ) =>
                                                                                        handleInputChange(
                                                                                            e
                                                                                        ),
                                                                            }
                                                                        )}
                                                                        className={`border-0 bg-transparent payment-expiration-date ps-5 w-100 ${
                                                                            formErrors.expiryDate
                                                                                ? "border-1 border-danger"
                                                                                : ""
                                                                        }`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <label
                                                                htmlFor=""
                                                                className="font-xxs-14px"
                                                                style={{
                                                                    color: "#032554",
                                                                }}
                                                            >
                                                                CVC
                                                            </label>
                                                            <div
                                                                className={`rounded-3 px-3 bg-white d-flex align-items-center justify-content-between relative form-control py-0  ${
                                                                    formErrors.cvc
                                                                        ? "border-danger"
                                                                        : ""
                                                                }`}
                                                            >
                                                                <div className=" position-relative">
                                                                    <img
                                                                        src="/sequence-assets/assets-updated/img/icons/cvv.png"
                                                                        alt="use"
                                                                        width={
                                                                            20
                                                                        }
                                                                        height={
                                                                            20
                                                                        }
                                                                        className="object-fit-contain position-absolute top-50 state-0 translate-middle-y"
                                                                        style={{
                                                                            opacity: 0.4,
                                                                        }}
                                                                    />
                                                                    <input
                                                                        className={`border-0 bg-transparent payment-cvv-code ps-5 w-100`}
                                                                        {...getCVCProps(
                                                                            {
                                                                                onChange:
                                                                                    (
                                                                                        e
                                                                                    ) =>
                                                                                        handleInputChange(
                                                                                            e
                                                                                        ),
                                                                            }
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <label
                                                                htmlFor=""
                                                                className="font-xxs-14px"
                                                                style={{
                                                                    color: "#032554",
                                                                }}
                                                            >
                                                                Address
                                                            </label>
                                                            <div className=" position-relative">
                                                                <img
                                                                    src="/sequence-assets/assets-updated/img/icons/location.png"
                                                                    alt="use"
                                                                    width={20}
                                                                    height={20}
                                                                    className="object-fit-contain position-absolute top-50 state-0 translate-middle-y ms-3"
                                                                    style={{
                                                                        opacity: 0.4,
                                                                    }}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    name="address"
                                                                    value={
                                                                        formValues.address
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    className={`form-control rounded-3 ps-7 font-xxxl-20px default-input ${
                                                                        formErrors.address
                                                                            ? "border-danger"
                                                                            : ""
                                                                    }`}
                                                                    placeholder="Address"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <label
                                                                htmlFor=""
                                                                className="font-xxs-14px"
                                                                style={{
                                                                    color: "#032554",
                                                                }}
                                                            >
                                                                City
                                                            </label>
                                                            <div className=" position-relative">
                                                                <img
                                                                    src="/sequence-assets/assets-updated/img/icons/city.png"
                                                                    alt="use"
                                                                    width={20}
                                                                    height={20}
                                                                    className="object-fit-contain position-absolute top-50 state-0 translate-middle-y ms-3"
                                                                    style={{
                                                                        opacity: 0.4,
                                                                    }}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    name="city"
                                                                    value={
                                                                        formValues.city
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    className={`form-control rounded-3 ps-4 font-xxxl-20px default-input ps-7 ${
                                                                        formErrors.city
                                                                            ? "border-danger"
                                                                            : ""
                                                                    }`}
                                                                    placeholder="City"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <label
                                                                htmlFor=""
                                                                className="font-xxs-14px"
                                                                style={{
                                                                    color: "#032554",
                                                                }}
                                                            >
                                                                State
                                                            </label>
                                                            <div className=" position-relative">
                                                                <img
                                                                    src="/sequence-assets/assets-updated/img/icons/state.png"
                                                                    alt="use"
                                                                    width={20}
                                                                    height={20}
                                                                    className="object-fit-contain position-absolute top-50 state-0 translate-middle-y ms-3"
                                                                    style={{
                                                                        opacity: 0.4,
                                                                    }}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    name="state"
                                                                    value={
                                                                        formValues.state
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    className={`form-control rounded-3 ps-4 font-xxxl-20px default-input ps-7 ${
                                                                        formErrors.state
                                                                            ? "border-danger"
                                                                            : ""
                                                                    }`}
                                                                    placeholder="State"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <label
                                                                htmlFor=""
                                                                className="font-xxs-14px"
                                                                style={{
                                                                    color: "#032554",
                                                                }}
                                                            >
                                                                Zip
                                                            </label>
                                                            <div className=" position-relative">
                                                                <img
                                                                    src="/sequence-assets/assets-updated/img/icons/zip.png"
                                                                    alt="use"
                                                                    width={20}
                                                                    height={20}
                                                                    className="object-fit-contain position-absolute top-50 state-0 translate-middle-y ms-3"
                                                                    style={{
                                                                        opacity: 0.4,
                                                                    }}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    name="zipCode"
                                                                    value={
                                                                        formValues.zipCode
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    className={`form-control rounded-3 ps-4 font-xxxl-20px default-input ps-7 ${
                                                                        formErrors.zipCode
                                                                            ? "border-danger"
                                                                            : ""
                                                                    }`}
                                                                    placeholder="Zip Code"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    handlePayment
                                                                }
                                                                className={`btn btn-primary py-2 px-7 fw-semibold font-md-17px lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-center text-uppercase border border-black  paymentFormValidation flex-grow-1 ${
                                                                    isSubmitting
                                                                        ? "disabled"
                                                                        : ""
                                                                }`}
                                                                disabled={
                                                                    isSubmitting
                                                                }
                                                                aria-disabled={
                                                                    isSubmitting
                                                                }
                                                            >
                                                                Pay Now
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary py-2 px-7 fw-semibold font-md-17px lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-center text-uppercase flex-grow-1"
                                                                onClick={
                                                                    handleSkip
                                                                }
                                                            >
                                                                Skip
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <SidebarCard
                                    cartData={cartData}
                                    refreshCart={fetchCart}
                                    step={4}
                                    lead_id={lead_id}
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
