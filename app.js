function loaded() {
    var iframe = document.getElementById("frame");
    var cookies = document.cookie;
    var cookie = cookies.split(";");
    var form = cookie[0].split("=");
    console.log(form[1]);
    iframe.src = form[1];
}

function loadFrame(subpage) {
    var iframe = document.getElementById("frame");
    iframe.src = subpage;
    document.cookie = `currentFrame=${subpage}`;
}