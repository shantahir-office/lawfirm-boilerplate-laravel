import React, { useEffect, useState } from "react";
import { ApiRequest } from "../ApiRequest";
import axios from "../axios";
import toast from "react-hot-toast";

const SidebarCard = (props) => {
    const AuthToken = import.meta.env.VITE_TOKEN;
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const lead_id = params.get("id");
    const [cartData, setCartData] = useState(null);
    const [deletingData, setDeletingData] = useState(false);

    // Fetch cart only once per mount or when deletingData changes
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const CartData = await axios.post(
                    `${ApiRequest.getCart}`,
                    { lead_id: lead_id },
                    { headers: { Authorization: AuthToken } }
                );
                if (CartData && CartData.data) {
                    setCartData(CartData.data);
                } else {
                    setCartData(null);
                }
            } catch (error) {
                setCartData(null);
                console.error("Error fetching cart:", error);
            }
        };
        fetchCart();
    }, [deletingData, lead_id, AuthToken]);

    // Delete handler
    const handleDelete = async (cart_id) => {
        try {
            if (props.step === 6) {
                toast.error("Item Cannot Be Deleted at Payment Page");
                return false;
            }
            await axios.post(
                ApiRequest.deleteFromCart,
                { lead_id: props.lead_id, cart_id },
                { headers: { Authorization: import.meta.env.VITE_TOKEN } }
            );
            toast.success("Item Deleted Successfully");
            props.refreshCart();
        } catch (error) {
            toast.error("Error Removing The Item");
        }
    };

    return (
        <div
            className="bg-white rounded-3 position-sticky"
            style={{ top: "20px" }}
        >
            <span className="fw-bold font-xxs-18px font-md-20px font-xxl-24px d-block lh-sm bg-primary text-white p-4">
                <span className=" fw-normal">Your</span> Order{" "}
                <span className=" fw-normal">For</span> Trademark
            </span>
            <span
                className="fw-semibold text-white d-block px-4 p-2"
                style={{ background: "#E2B9FD" }}
            >
                Service Packages
            </span>
            <ul
                className="mt-3 overflow-hidden overflow-y-auto spacing_not-last-child mb-4 px-4"
                style={{ maxHeight: "150px" }}
            >
                {props.cartData?.items && props.cartData.items.length > 0 ? (
                    props.cartData.items.map((item) => (
                        <li
                            key={item.cart_id}
                            className="d-flex align-items-center gap-2"
                        >
                            <span
                                className="d-block lh-base font-xxs-15px"
                                style={{ maxWidth: "200px" }}
                            >
                                {item.item_quantity > 1
                                    ? `${item.item_quantity}X `
                                    : ""}
                                {item.item_name}
                            </span>
                            <span className="ms-auto fw-semibold">
                                ${item.item_price}
                            </span>
                            {props.step !== 6 && (
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
                    ))
                ) : (
                    <li className="d-flex align-items-center gap-2">
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
            <div className="d-flex justify-content-between align-items-center pulse-animation border-2 border-top py-3 border-danger px-4">
                <span className="font-xxs-16px font-md-18px fw-bold lh-1">
                    Total
                </span>
                <span className="font-xxs-18px fw-medium lh-1 text-danger">
                    ${props.cartData?.total ?? 0}
                </span>
            </div>
        </div>
    );
};

export default SidebarCard;
