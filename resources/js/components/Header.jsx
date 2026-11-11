import React from "react";

const Header = () => {
    const openLiveChat = () => {
        // Check if the LiveChat API is available
        // if (window.LC_API) {
        //     window.LC_API.open_chat_window(); // Open the chat window
        //     console.log("hiiiii")
        // }
        postMessage({
            method: "showWebWidget",
            type: "cd360Api",
            apiType: "liveChat",
        });
        // window.LC_API.open_chat_window(); // Open the chat window
        // console.log(window)
    };
    return (
        <div className="bg-transparent pt-3 pt-lg-4">
            <div
                className="container-fluid d-flex align-items-center justify-content-center gap-2"
                style={{ maxWidth: "clamp(1336px,94vw,1600px)" }}
            >
                <a className="navbar-brand">
                    <img
                        src="/assets/images/logo/logo.webp" // Correct path for public assets
                        alt="logo"
                        width="300"
                        height="55"
                        className="object-fit-contain w-auto"
                        style={{objectFit: "contain", width: "auto"}}
                        fetchpriority="high"
                        loading="eager"
                    />
                </a>
                                            {/* <span class="font-bold text-[50px] text-black">(brandname)</span> */}

            </div>
        </div>
    );
};

export default Header;
