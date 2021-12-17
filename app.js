var version = "0.1.3";

function loaded() {
    var iframe = document.querySelector("#frame");
    var cookies = document.cookie;
    var cookie = cookies.split(";");
    var form = cookie[0].split("=");

    if (form[1] == null) {
        iframe.src = "Sub/404.html";
    } else {
        iframe.src = form[1];
    }

    var versionP = document.querySelector(".versionP");
    versionP.innerHTML = version;
}

function loadFrame(subpage) {
    var iframe = document.querySelector("#frame");
    iframe.src = subpage;
    document.cookie = `currentFrame=${subpage}; SameSite=None; Secure`;
}