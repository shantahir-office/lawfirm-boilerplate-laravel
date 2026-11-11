import React from "react";

const Sidebar = () => {
    return (
        <div className="col-lg-2 overflow-hidden overflow-x-auto">
            <nav className="cover-steps-sidemenu d-flex flex-lg-column gap-5 gap-lg-14 flex-nowrap pt-lg-5">
                {[
                    "Trademark Information",
                    "Goods/services Information",
                    "Owner Information",
                    "Search Packages",
                    "Filing Packages",
                    "Payment Information",
                ].map((item, index) => (
                    <div
                        key={index}
                        className="steps-sidemenu text-center text-lg-start d-flex align-items-center justify-content-center justify-content-lg-start gap-2 gap-lg-3 flex-wrap flex-lg-nowrap"
                    >
                        <div></div>
                        <span className="fw-semibold lh-sm fst-italic">
                            {item}
                        </span>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
