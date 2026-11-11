import React, { useEffect, useState } from "react";
import { ApiRequest } from "../ApiRequest";
import axios from "../axios";
import toast from "react-hot-toast";
import { useStepper } from "../context/SequenceContextNew";
const SidebarCardOld = (props) => {
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
    console.log(props.package2?.PackageName);
    console.log(AmazonBrand, "AMAZON BRAND");
    console.log(props, "PROPS");
    useEffect(() => {
        const fetchCart = async () => {
            try {
                // window.alert("Fetching packages...");
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
                    console.warn("Cart Fetched:", CartData.data);
                    setStep5PackagesData(CartData.data);
                    setCartPackages(CartData.data.items);
                    const hasSearchPackage = CartData.data.items.some(
                        (item) => item.package_type === "search-packages"
                    );
                    // if (!hasSearchPackage && props.step === 5) {
                    //     window.location.href = `/lp/sequence/step4?id=${lead_id}`;
                    // }
                    // if (CartData.data.items.length === 0 && props.step === 5) {
                    //     window.location.href = `/lp/sequence/step4?id=${lead_id}`;
                    //     // window.location.href = "/"
                    // }
                } else {
                    console.log("No cart found.");
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
                // window.alert("Failed to get packages");
            }
        };

        fetchCart();
    }, [deletingData]);
    useEffect(() => {
        const fetchProps = () => {
            // Fixed arrow function syntax
            console.log(props);
        };

        fetchProps();
    }, [props]); // Ensure dependency array is correctly formatted
    console.log(step5Package, "Step 5 Package");
    // const hasSearchPackage = cartPackages ?? cartPackages?.some(item => item.package_type === "search-packages");
    const handleDelete = async (package_id) => {
        // e.preventDefault();
        try {
            if (props.step !== (undefined || null) && props.step == 6) {
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
                        // "Content-Type": "application/json",
                    },
                }
            );
            // console.log(data);
            // console.log(!selectedOption.question);
            if (data) {
                // Save the response data to context
                // setData(data);
                console.log(data);
                setStep5PackagesData(data.data);
                setdeletingData(!deletingData);
                // localStorage.setItem("step4", JSON.stringify(data?.data?.data));
                toast.success("Item Deleted SuccessFully");
                // fetchCart();
                // alert(data)
                // console.log(selectedOption.answer,"Selected Option Answer");
                // window.location.href = `/lp/sequence/step4?id=${lead_id}`;
            }
        } catch (error) {
            console.error("Error:", error);
            // window.location.href = `/lp/sequence/step5?id=${lead_id}`;
            // alert("Error submitting the form");
            toast.error("Error Removing The Item");
            return false;
        }
    };
    return (
        <>
            <div
                className="bg-white rounded-3 p-3 position-sticky mx-3"
                style={{ top: "20px" }}
            >
                <span className="fw-bold font-xxs-18px font-md-20px font-xxl-24px d-block lh-sm mb-2">
                    Your Order For Trademark
                </span>
                <span className="fw-semibold text-white px-3 d-block bg-secondary mx-n3">
                    Service Packages
                </span>
                <ul
                    className="mt-3 overflow-hidden overflow-y-auto spacing_not-last-child mb-4"
                    style={{ maxHeight: "150px" }}
                >
                    {Step5PackagesData?.items.length > 0 ||
                    step5Package !== null ? (
                        <>
                            <ul>
                                {Step5PackagesData?.items.map((item, index) => (
                                    <li
                                        key={index}
                                        className="d-flex align-items-center gap-2"
                                    >
                                        <span
                                            className="d-block lh-base font-xxs-15px"
                                            style={{ maxWidth: "200px" }}
                                        >
                                            {item.item_name !==
                                            "Amazon Brand Regsitry" ? (
                                                props.timesmultiplied + "X"
                                            ) : (
                                                <></>
                                            )}{" "}
                                            {item.item_name}
                                        </span>
                                        <span className="ms-auto fw-semibold">
                                            ${item.item_price}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                handleDelete(item.cart_id);
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
                                    </li>
                                ))}
                                <li className="d-flex align-items-start gap-2">
                                    <span
                                        className="d-block lh-base font-xxs-15px"
                                        style={{ maxWidth: "200px" }}
                                    >
                                        {step4Package?.name !== undefined ||
                                        null ? (
                                            props.timesmultiplied +
                                            "X " +
                                            step4Package?.name
                                        ) : (
                                            <></>
                                        )}
                                    </span>
                                    <span className="ms-auto fw-semibold">
                                        {props.step === 4 ? (
                                            step4Package?.price !==
                                            undefined ? (
                                                `$${step4Package?.price}`
                                            ) : (
                                                <></>
                                            )
                                        ) : step4Package?.price !==
                                          undefined ? (
                                            `$${step4Package?.price}`
                                        ) : (
                                            <></>
                                        )}
                                        {/* {props.price ? `$${props.price * props.timesmultiplied}` : <>$0</>} */}
                                    </span>
                                    <a
                                        href="#"
                                        className="hover_opacity-07 flex-shrink-0"
                                    >
                                        {props.step === 4 ? (
                                            step4Package?.price !==
                                            undefined ? (
                                                <img
                                                    loading="lazy"
                                                    src="../../sequence-assets/img/icons/trash.svg"
                                                    alt="trash icon"
                                                    width="15"
                                                    height="15"
                                                />
                                            ) : (
                                                <></>
                                            )
                                        ) : step4Package?.price !==
                                          undefined ? (
                                            <img
                                                loading="lazy"
                                                src="../../sequence-assets/img/icons/trash.svg"
                                                alt="trash icon"
                                                width="15"
                                                height="15"
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </a>
                                </li>
                                {step5Package !== (null || undefined) ? (
                                    <li className="d-flex align-items-start gap-2">
                                        <span
                                            className="d-block lh-base font-xxs-15px"
                                            style={{ maxWidth: "200px" }}
                                        >
                                            {step5Package?.name ? (
                                                props.timesmultiplied +
                                                "X " +
                                                step5Package?.name
                                            ) : (
                                                <></>
                                            )}
                                        </span>
                                        <span className="ms-auto fw-semibold">
                                            {step5Package?.price ? (
                                                props.step == 6 ? (
                                                    "$" + step5Package?.price
                                                ) : (
                                                    "$" + step5Package?.price
                                                    // *
                                                    // props.timesmultiplied
                                                )
                                            ) : (
                                                <></>
                                            )}
                                        </span>
                                        <a
                                            href="#"
                                            className="hover_opacity-07 flex-shrink-0"
                                        >
                                            {step5Package?.price ? (
                                                props.step == 6 ? (
                                                    <img
                                                        loading="lazy"
                                                        src="../../sequence-assets/img/icons/trash.svg"
                                                        alt="trash icon"
                                                        width="15"
                                                        height="15"
                                                    />
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setstep5Package(
                                                                null
                                                            );
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
                                                )
                                            ) : (
                                                <></>
                                            )}
                                        </a>
                                    </li>
                                ) : null}
                                {AmazonBrand !== null ? (
                                    <li className="d-flex align-items-start gap-2">
                                        <span
                                            className="d-block lh-base font-xxs-15px"
                                            style={{ maxWidth: "200px" }}
                                        >
                                            {AmazonBrand == true ? (
                                                //  " Amazon Brand Registry"
                                                "Amazon Brand Registry"
                                            ) : (
                                                <></>
                                            )}
                                        </span>
                                        <span className="ms-auto fw-semibold">
                                            {AmazonBrand == true ? (
                                                "$" + AmazonBrandPrice
                                            ) : (
                                                <>$0</>
                                            )}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setAmazonBrand(null);
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
                                    </li>
                                ) : null}

                                {rushFilling == (1 || true) ? (
                                    <li className="d-flex align-items-start gap-2">
                                        <span
                                            className="d-block lh-base font-xxs-15px"
                                            style={{ maxWidth: "200px" }}
                                        >
                                            {rushFilling == true ? (
                                                //  " Amazon Brand Registry"
                                                props.timesmultiplied +
                                                "X " +
                                                "Rush Filling"
                                            ) : (
                                                <></>
                                            )}
                                        </span>
                                        <span className="ms-auto fw-semibold">
                                            {rushFilling == true ? (
                                                "$" +
                                                step5Package?.rushFiling?.price
                                            ) : (
                                                <></>
                                            )}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setrushFilling(false);
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
                                    </li>
                                ) : null}
                            </ul>
                        </>
                    ) : (
                        <>
                            <ul>
                                <li className="d-flex align-items-start gap-2">
                                    <span
                                        className="d-block lh-base font-xxs-15px"
                                        style={{ maxWidth: "200px" }}
                                    >
                                        {step4Package !== null ? (
                                            props.timesmultiplied +
                                            "X " +
                                            step4Package.name
                                        ) : (
                                            <>Select Package</>
                                        )}
                                    </span>
                                    <span className="ms-auto fw-semibold">
                                        {props.step === 4 ? (
                                            step4Package !== null ? (
                                                `$${step4Package.price}`
                                            ) : (
                                                <>$0</>
                                            )
                                        ) : step4Package !== null ? (
                                            `$${step4Package.price}`
                                        ) : (
                                            <>$0</>
                                        )}
                                        {/* {props.price ? `$${props.price * props.timesmultiplied}` : <>$0</>} */}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStep4Package(null);
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
                                </li>
                            </ul>
                        </>
                    )}
                </ul>
                <div className="d-flex justify-content-between align-items-center pulse-animation border-2 border-top pt-3 border-danger">
                    <span className="font-xxs-16px font-md-18px fw-bold lh-1">
                        Total
                    </span>
                    <span className="font-xxs-18px fw-medium lh-1">
                        $
                        {props.step === 4 ? (
                            step4Package !== null ? (
                                `${
                                    step4Package.price * props.timesmultiplied +
                                    Step5PackagesData?.total
                                }`
                            ) : (
                                Step5PackagesData?.total
                            )
                        ) : (
                            <></>
                        )}
                       {props.step === 5 && Step5PackagesData ? (
                            Step5PackagesData?.total !== (null || undefined) &&
                            step5Package !== null ? (
                                parseFloat(step5Package?.price || 0) *
                                    props.timesmultiplied +
                                parseFloat(Step5PackagesData?.total || 0) +
                                (rushFilling
                                    ? parseFloat(
                                          step5Package?.rushFiling?.price || 0
                                      ) * props.timesmultiplied
                                    : 0) +
                                (AmazonBrand
                                    ? parseFloat(AmazonBrandPrice || 0)
                                    : 0)
                            ) : (
                                parseFloat(Step5PackagesData?.total || 0) +
                                (AmazonBrand
                                    ? parseFloat(AmazonBrandPrice || 0)
                                    : 0)
                            )
                        ) : (
                            <></>
                        )}
                        {props.step === 6 ? Step5PackagesData?.total : <></>}
                        {/* $0 */}
                    </span>
                </div>
            </div>
        </>
    );
};

export default SidebarCardOld;
