import React from "react";

const StepperProgress = ({ currentStep = 1, totalSteps = 6 }) => {
    return (
        <div className="w-100 pb-5 px-3 text-center mb-lg-5">
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <h1
                    // className="fw-bold mb-2 font-xxs-24px font-md-40px"
                    style={{ color: "#000000", lineHeight: "1.3", fontWeight: 700, marginBottom: "0.5rem", fontSize: "clamp(22px, 4vw, 32px)" }}
                >
                    Start Your Trademark Registration Process
                </h1>
                <p
                    className="mb-3 mb-lg-7 font-xxs-16px"
                    style={{ color: "#000000", opacity: 0.7 }}
                >
                    Finish your application in under 5 minutes.
                </p>

                {/* Stepper */}
                <div
                    className="d-flex align-items-center justify-content-center mx-auto"
                    style={{
                        maxWidth: "570px",
                    }}
                >
                    {Array.from({ length: totalSteps }, (_, index) => {
                        const stepNumber = index + 1;
                        const isCompleted = stepNumber < currentStep;
                        const isActive = stepNumber === currentStep;

                        return (
                            <React.Fragment key={stepNumber}>
                                {/* Step Circle */}
                                <div className="position-relative d-flex align-items-center justify-content-center">
                                    <div
                                        className="d-flex align-items-center justify-content-center     
                                    rounded-circle shadow-sm"
                                        style={{
                                            width: "clamp(25px, 5vw, 30px)",
                                            height: "clamp(25px, 5vw, 30px)",
                                            background: isCompleted
                                                ? "#D4621B"
                                                : "#ffffff",
                                            border: isActive
                                                ? "2px solid #D4621B"
                                                : isCompleted
                                                  ? "none"
                                                  : "2px solid #d1d5db",
                                            boxShadow: isActive
                                                ? "rgba(253, 163, 4, 1)"
                                                : "0 2px 4px rgba(0, 0, 0, 0.1)",
                                            transition: "all 0.3s ease",
                                            zIndex: 10,
                                        }}
                                    >
                                        {isCompleted ? (
                                            <svg
                                                width="clamp(14px, 3vw, 20px)"
                                                height="clamp(14px,     
                                        3vw, 20px)"
                                                fill="none"
                                                stroke="#ffffff"
                                                viewBox="0 0 24 24"
                                                style={{ strokeWidth: 3 }}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        ) : null}
                                    </div>
                                </div>

                                {/* Connector Line */}
                                {stepNumber < totalSteps && (
                                    <div
                                        className="flex-grow-1"
                                        style={{
                                            height: "2px",
                                            marginTop: "0px",
                                            marginBottom: "0px",
                                        }}
                                    >
                                        <div
                                            className="h-100 rounded"
                                            style={{
                                                background:
                                                    stepNumber < currentStep
                                                        ? "#D4621B"
                                                        : "#e5e7eb",
                                                transition: "all 0.3s ease",
                                            }}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StepperProgress;
