import React, { useEffect, useState } from "react";
import { ApiRequest } from "../ApiRequest";
import axios from "../axios";
import toast from "react-hot-toast";
import { useStepper } from "../context/SequenceContextNew";

const SidebarCardOldLP6 = ({
    step = 1,
    timesmultiplied = 1,
    title = "Your Order For Trademark",
    sectionTitle = "Service Packages",
    showDeleteButtons = true,
    maxHeight = "150px",
    stickyPosition = "20px",
    stickyEnabled = true,
    showTotalSection = true,
    customStyles = {},
    onDelete = null,
    onPackageSelect = null,
    ...props
}) => {
    const AuthToken = import.meta.env.VITE_TOKEN;
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const lead_id = params.get("id");

    const [Step5PackagesData, setStep5PackagesData] = useState(null);
    const [deletingData, setdeletingData] = useState(false);

    const {
        setCartPackages,
        cartPackages,
        step4Package,
        setStep4Package,
        step5Package,
        setstep5Package,
        AmazonBrand,
        AmazonBrandPrice,
        rushFilling,
        setrushFilling,
        setAmazonBrand,
    } = useStepper();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const CartData = await axios.post(
                    `${ApiRequest.getCart}`,
                    {
                        lead_id: lead_id,
                    },
                    {
                        headers: {
                            Authorization: AuthToken,
                        },
                    }
                );

                if (CartData && CartData.data) {
                    setStep5PackagesData(CartData.data);
                    setCartPackages(CartData.data.items);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, [deletingData]);

    const handleDelete = async (package_id) => {
        try {
            if (step === 6) {
                toast.error("Item Cannot Be Deleted at Payment Page");
                return false;
            }

            const data = await axios.post(
                ApiRequest.deleteFromCart,
                {
                    lead_id: lead_id,
                    cart_id: package_id,
                },
                {
                    headers: {
                        Authorization: AuthToken,
                    },
                }
            );

            if (data) {
                setStep5PackagesData(data.data);
                setdeletingData(!deletingData);
                toast.success("Item Deleted Successfully");

                // Call custom onDelete handler if provided
                if (onDelete) {
                    onDelete(package_id);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error Removing The Item");
        }
    };
    const calculateTotal = () => {
        let total = 0;

        // Debug logging
        console.group("Calculating Total - Debug Info");
        console.log("Initial total:", total);

        // Add cart items total
        const cartTotal = parseFloat(Step5PackagesData?.total) || 0;
        console.log(
            "Cart total:",
            cartTotal,
            "Raw value:",
            Step5PackagesData?.total
        );
        total += cartTotal;
        console.log("After cart total:", total);

        // Add step4 package if exists
        if (step4Package) {
            const step4Price = parseFloat(step4Package.price) || 0;
            console.log(
                "Step4 package price:",
                step4Price,
                "Raw value:",
                step4Package.price
            );
            total += step4Price * timesmultiplied;
            console.log("After step4 package:", total);
        } else {
            console.log("No step4 package");
        }

        // Add step5 package if exists
        if (step5Package) {
            const step5Price = parseFloat(step5Package.price) || 0;
            console.log(
                "Step5 package price:",
                step5Price,
                "Raw value:",
                step5Package.price
            );
            const step5Contribution =
                step === 6 ? step5Price : step5Price * timesmultiplied;
            console.log("Step5 contribution:", step5Contribution);
            total += step5Contribution;
            console.log("After step5 package:", total);
        } else {
            console.log("No step5 package");
        }

        // Add rush filing if enabled
        if (rushFilling && step5Package?.rushFiling?.price) {
            const rushPrice = parseFloat(step5Package.rushFiling.price) || 0;
            console.log(
                "Rush filing price:",
                rushPrice,
                "Raw value:",
                step5Package.rushFiling.price
            );
            total += rushPrice * timesmultiplied;
            console.log("After rush filing:", total);
        } else {
            console.log("No rush filing or no rush price");
        }

        // Add Amazon brand if selected
        if (AmazonBrand) {
            const amazonPrice = parseFloat(AmazonBrandPrice) || 0;
            console.log(
                "Amazon brand price:",
                amazonPrice,
                "Raw value:",
                AmazonBrandPrice
            );
            total += amazonPrice;
            console.log("After Amazon brand:", total);
        } else {
            console.log("No Amazon brand selected");
        }

        // Final check and format
        if (isNaN(total)) {
            console.log("Final total is NaN, returning 0");
            console.groupEnd();
            return "0";
        }

        // Check if the number is whole
        const isWholeNumber = total % 1 === 0;
        const formattedTotal = isWholeNumber
            ? total.toString()
            : total.toFixed(2);

        console.log("Final total:", formattedTotal);
        console.groupEnd();

        return formattedTotal;
    };

    const renderPackageItem = (item, index, isCartItem = true) => {
        return (
            <li key={index} className="d-flex align-items-center gap-2">
                <span
                    className="d-block lh-base font-xxs-15px"
                    style={{ maxWidth: "200px" }}
                >
                    {item.item_name !== "Amazon Brand Registry" &&
                        `${timesmultiplied}X `}
                    {item.item_name}
                </span>
                <span className="ms-auto fw-semibold">${item.item_price}</span>
                {showDeleteButtons && (
                    <button
                        type="button"
                        onClick={() => handleDelete(item.cart_id)}
                        className="bg-transparent border-0 hover_opacity-07 flex-shrink-0 pb-1"
                    >
                        <img
                            loading="lazy"
                            src="../../sequence-assets/img/icons/trash.svg"
                            alt="trash icon"
                            width="15"
                            height="15"
                        />
                    </button>
                )}
            </li>
        );
    };

    const renderStep4Package = () => {
        if (!step4Package) return null;

        return (
            <li className="d-flex align-items-start gap-2">
                <span
                    className="d-block lh-base font-xxs-15px"
                    style={{ maxWidth: "200px" }}
                >
                    {`${timesmultiplied}X ${step4Package.name}`}
                </span>
                <span className="ms-auto fw-semibold">
                    ${step4Package.price}
                </span>
                {showDeleteButtons && (
                    <button
                        type="button"
                        onClick={() => {
                            setStep4Package(null);
                            if (onPackageSelect) onPackageSelect(null, "step4");
                        }}
                        className="bg-transparent border-0 hover_opacity-07 flex-shrink-0 pb-1"
                    >
                        <img
                            loading="lazy"
                            src="../../sequence-assets/img/icons/trash.svg"
                            alt="trash icon"
                            width="15"
                            height="15"
                        />
                    </button>
                )}
            </li>
        );
    };

    const renderStep5Package = () => {
        if (!step5Package) return null;

        return (
            <li className="d-flex align-items-start gap-2">
                <span
                    className="d-block lh-base font-xxs-15px"
                    style={{ maxWidth: "200px" }}
                >
                    {`${timesmultiplied}X ${step5Package.name}`}
                </span>
                <span className="ms-auto fw-semibold">
                    ${step === 6 ? step5Package.price : step5Package.price}
                </span>
                {showDeleteButtons && (
                    <button
                        type="button"
                        onClick={() => {
                            setstep5Package(null);
                            if (onPackageSelect) onPackageSelect(null, "step5");
                        }}
                        className="bg-transparent border-0 hover_opacity-07 flex-shrink-0 pb-1"
                    >
                        <img
                            loading="lazy"
                            src="../../sequence-assets/img/icons/trash.svg"
                            alt="trash icon"
                            width="15"
                            height="15"
                        />
                    </button>
                )}
            </li>
        );
    };

    const renderAmazonBrand = () => {
        if (!AmazonBrand) return null;

        return (
            <li className="d-flex align-items-start gap-2">
                <span
                    className="d-block lh-base font-xxs-15px"
                    style={{ maxWidth: "200px" }}
                >
                    Amazon Brand Registry
                </span>
                <span className="ms-auto fw-semibold">${AmazonBrandPrice}</span>
                {showDeleteButtons && (
                    <button
                        type="button"
                        onClick={() => setAmazonBrand(null)}
                        className="bg-transparent border-0 hover_opacity-07 flex-shrink-0 pb-1"
                    >
                        <img
                            loading="lazy"
                            src="../../sequence-assets/img/icons/trash.svg"
                            alt="trash icon"
                            width="15"
                            height="15"
                        />
                    </button>
                )}
            </li>
        );
    };

    const renderRushFilling = () => {
        if (!rushFilling) return null;

        return (
            <li className="d-flex align-items-start gap-2">
                <span
                    className="d-block lh-base font-xxs-15px"
                    style={{ maxWidth: "200px" }}
                >
                    {`${timesmultiplied}X Rush Filling`}
                </span>
                <span className="ms-auto fw-semibold">
                    ${step5Package?.rushFiling?.price}
                </span>
                {showDeleteButtons && (
                    <button
                        type="button"
                        onClick={() => setrushFilling(false)}
                        className="bg-transparent border-0 hover_opacity-07 flex-shrink-0 pb-1"
                    >
                        <img
                            loading="lazy"
                            src="../../sequence-assets/img/icons/trash.svg"
                            alt="trash icon"
                            width="15"
                            height="15"
                        />
                    </button>
                )}
            </li>
        );
    };

    return (
        <div
            className=" rounded-3 pb-3 "
            style={{
                ...customStyles,
                ...(stickyEnabled && {
                    position: "sticky",
                    top: stickyPosition,
                    background: "#EDF2F8",
                }),
            }}
        >
            <span
                className="fw-bold font-xxs-18px font-md-20px font-xxl-24px d-block lh-sm  ps-3 p-4"
                style={{ backgroundColor: "#03396C" }}
            >
                <span className="  text-white">Trademark Order</span>
            </span>
            <span
                className="fw-semibold text-white px-3 d-block  py-2"
                style={{ background: "#A4C1E1" }}
            >
                {sectionTitle}
            </span>

            <ul
                className="mt-3 px-3 overflow-hidden overflow-y-auto spacing_not-last-child mb-4"
                style={{ maxHeight }}
            >
                {Step5PackagesData?.items?.length > 0 || step5Package ? (
                    <ul>
                        {Step5PackagesData?.items.map((item, index) =>
                            renderPackageItem(item, index)
                        )}
                        {renderStep4Package()}
                        {renderStep5Package()}
                        {renderAmazonBrand()}
                        {renderRushFilling()}
                    </ul>
                ) : (
                    <ul>
                        {renderStep4Package() || (
                            <li className="d-flex align-items-start gap-2">
                                <span
                                    className="d-block lh-base font-xxs-15px"
                                    style={{ maxWidth: "200px" }}
                                >
                                    Select Package
                                </span>
                                <span className="ms-auto fw-semibold">$0</span>
                            </li>
                        )}
                    </ul>
                )}
            </ul>

            {showTotalSection && (
                <div className="d-flex px-3 justify-content-between px-2 align-items-center pulse-animation border-2 border-top pt-3 border-danger">
                    <span className="font-xxs-16px font-md-18px fw-bold lh-1">
                        Total
                    </span>
                    <span className="font-xxs-18px fw-medium lh-1 text-danger">
                        ${calculateTotal()}
                    </span>
                </div>
            )}
        </div>
    );
};

export default SidebarCardOldLP6;
