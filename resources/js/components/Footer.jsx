import React from "react";

const Footer = () => {
    const currentDate = new Date().getFullYear();
    return (
        <>
            <footer className="py-2 py-lg-3 bg-primary">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-6">
                            <p className=" text-white m-0 font-xxs-14px font-lg-15px text-center text-lg-start">
                                Copyright © {currentDate} (brandname) All
                                Rights Reserved.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <ul className="d-flex align-items-center gap-2 justify-content-center justify-content-lg-end flex-wrap">
                                <li>
                                    <a
                                        href="/lp/privacy-policy"
                                        className="text-white font-xxs-15px link-primary link-light hover_opacity-08"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li className="text-white font-24px">|</li>
                                <li>
                                    <a
                                        href="/lp/terms-and-conditions"
                                        className="text-white font-xxs-15px link-primary link-light hover_opacity-08"
                                    >
                                        Terms and Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
