import React from "react";
import "./sidebar.css";
const Sidebar = ({ progressnumber, steps, hideAll }) => {
    // console.log(progressnumber);
    return (
        <>
            <div
                className="p-4 rounded-3 text-center mb-5 py-5 bg-primary"
                // style={{ background: "#071a3d" }}
            >
                <h1 className="text-white fw-medium font-xxs-22px font-md-32px">
                    {progressnumber?.topBarName}
                </h1>
                {progressnumber?.topBarDescription && (
                    <p className=" text-white mb-0">
                        {progressnumber?.topBarDescription}
                    </p>
                )}
                {!hideAll &&
                    (steps === false ? (
                        <p className="text-white mb-0">
                            A Clear Path to Securing Your Trademark
                        </p>
                    ) : (
                        <div class="progress">
                            <div
                                class="progress-bar progress-bar-striped progress-bar-animated"
                                role="progressbar"
                                style={{ width: `${progressnumber?.percent}` }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {progressnumber?.percent}
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Sidebar;
