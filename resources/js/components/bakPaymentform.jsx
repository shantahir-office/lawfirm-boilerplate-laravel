import React from "react";

const bakPaymentform = () => {
    return (
        <>
            <div className="col-lg-12 pe-4">
                <div className="d-flex align-items-center justify-content-between">
                    <h2 className="fw-semibold font-xxs-25px font-md-35px mb-4">
                        <span className="text-primary">Payment</span> Details
                    </h2>
                    <div className=" d-flex align-items-center gap-2">
                        <span className="h5 fw-medium">
                            Total Invoice amount:
                        </span>
                        <span className="fw-bold font-xxs-35px font-md-45px fst-italic">
                            {cartData?.total !== undefined &&
                            cartData?.total !== null
                                ? "$" + cartData?.total
                                : "...loading"}
                            {/* $136 */}
                        </span>
                    </div>
                </div>
                <form onSubmit={handlePayment}>
                    <div className="row g-3">
                        <div className="col-12">
                            <div className=" position-relative">
                                <img
                                    src="../sequence-assets/assets-updated/img/icons/user.png"
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
                                    value={formValues.cardHolderName}
                                    onChange={handleInputChange}
                                    className={`form-control rounded-3 ps-7 font-xxxl-20px default-input ${
                                        formErrors.cardHolderName
                                            ? "border-danger"
                                            : ""
                                    }`}
                                    placeholder="Card Holder Name"
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div
                                className={`form-control rounded-3 ps-4 font-xxxl-20px paymentcard-number py-0 d-flex gap-2 align-items-center ${
                                    formErrors.cardNumber &&
                                    formErrors.cardNumber
                                        ? "border-danger"
                                        : ""
                                }`}
                            >
                                <svg
                                    {...getCardImageProps({
                                        images,
                                    })}
                                />
                                <input
                                    style={{
                                        border: "0px",
                                        padding: "0px",
                                    }}
                                    {...getCardNumberProps({
                                        onChange: (e) => handleInputChange(e),
                                    })}
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div
                                className={`rounded-3 px-3 bg-white d-flex align-items-center justify-content-between relative ${
                                    formErrors.expiryDate ||
                                    (formErrors.cvv && formErrors.cvc)
                                        ? "border border-1 border-danger"
                                        : ""
                                }`}
                            >
                                <div className=" position-relative">
                                    <img
                                        src="../sequence-assets/assets-updated/img/icons/calendar.png"
                                        alt="use"
                                        width={20}
                                        height={20}
                                        className="object-fit-contain position-absolute top-50 state-0 translate-middle-y"
                                        style={{
                                            opacity: 0.4,
                                        }}
                                    />
                                    <input
                                        {...getExpiryDateProps({
                                            onChange: (e) =>
                                                handleInputChange(e),
                                        })}
                                        className={`border-0 border-1 border-end bg-transparent payment-expiration-date ps-5 w-100 ${
                                            formErrors.expiryDate
                                                ? "border-1 border-danger"
                                                : ""
                                        }`}
                                    />
                                </div>
                                {/* <div
                                                                    className="bg-dark opacity-25"
                                                                    style={{
                                                                        width: "1px",
                                                                        height: "33px",
                                                                    }}
                                                                ></div> */}
                                <div className=" position-relative ps-3">
                                    <img
                                        src="../sequence-assets/assets-updated/img/icons/cvv.png"
                                        alt="use"
                                        width={20}
                                        height={20}
                                        className="object-fit-contain position-absolute top-50 state-0 translate-middle-y"
                                        style={{
                                            opacity: 0.4,
                                        }}
                                    />
                                    <input
                                        className={`border-0 bg-transparent payment-cvv-code ps-5 w-100 ${
                                            formErrors.cvv
                                                ? "border-danger"
                                                : ""
                                        }`}
                                        {...getCVCProps({
                                            onChange: (e) =>
                                                handleInputChange(e),
                                        })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div className=" position-relative">
                                <img
                                    src="../sequence-assets/assets-updated/img/icons/location.png"
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
                                    value={formValues.address}
                                    onChange={handleInputChange}
                                    className={`form-control rounded-3 ps-7 font-xxxl-20px default-input ${
                                        formErrors.address
                                            ? "border-danger"
                                            : ""
                                    }`}
                                    placeholder="Address"
                                />
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className=" position-relative">
                                <img
                                    src="../sequence-assets/assets-updated/img/icons/zip.png"
                                    alt="use"
                                    width={20}
                                    height={20}
                                    className="object-fit-contain position-absolute top-50 state-0 translate-middle-y ms-3"
                                    style={{
                                        opacity: 0.4,
                                    }}
                                />
                                <input
                                    type="number"
                                    name="zipCode"
                                    value={formValues.zipCode}
                                    onChange={handleInputChange}
                                    className={`form-control rounded-3 ps-4 font-xxxl-20px default-input ps-7 ${
                                        formErrors.zipCode
                                            ? "border-danger"
                                            : ""
                                    }`}
                                    placeholder="Zip Code"
                                />
                            </div>
                        </div>

                        <div className="col-12 d-flex gap-3 justify-content-center mb-7 mt-6">
                            <button
                                type="submit"
                                className={`btn btn-primary py-2 px-7 fw-semibold font-md-17px lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-center text-uppercase border border-black  paymentFormValidation ${
                                    isSubmitting ? "disabled" : ""
                                }`}
                                disabled={isSubmitting}
                                aria-disabled={isSubmitting}
                            >
                                Pay Now
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary py-2 px-7 fw-semibold font-md-17px lh-base d-inline-flex align-items-center gap-4 text-nowrap justify-content-center text-uppercase"
                                onClick={handleSkip}
                            >
                                Skip
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default bakPaymentform;
