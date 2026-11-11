import React from "react";
import "./brooksprogress.css";
const NewBrooksProgress = ({ progressnumber }) => {
    console.log(progressnumber);
    return (
        <>
            <div
                className="p-4 rounded-3 text-center mb-5 py-4"

            >

                {progressnumber.topBarDescription && (
                    <p className=" text-white mb-3 mb-lg-5">
                        {progressnumber.topBarDescription}
                    </p>
                )}
                <div className="progress__container">
                    <div class="progress">
                        <div
                            class="progress-bar "
                            role="progressbar"
                            aria-labelledby="ProgressLabel"
                            style={{ width: `${progressnumber.percent}%` }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            {/* {progressnumber.percent} */}
                            <img src="/assets/img/hand.png" className="hand__img" style={{left:`${progressnumber.percent + 1}%`}} />
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
};

export default NewBrooksProgress;
