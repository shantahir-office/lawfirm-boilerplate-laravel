var script = document.createElement("script");
script.id = "cd360-snippet";
script.defer = true;
script.src =
    "";
document.body.appendChild(script);

function openChatWidget() {
    postMessage({
        method: "showWebWidget",
        type: "cd360Api",
        apiType: "liveChat",
    });
}