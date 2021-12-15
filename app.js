function loaded() {
  var iframe = document.getElementById("frame");
  var cookies = document.cookie;
  var cookie = cookies.split(";");
  var form = cookie[0].split("=");

  console.log(form[1]);
  if (form[1] == null) {
    iframe.src = "Sub/404.html";
  } else {
    iframe.src = form[1];
  }
}

function loadFrame(subpage) {
  var iframe = document.getElementById("frame");
  iframe.src = subpage;
  document.cookie = `currentFrame=${subpage}; SameSite=None; Secure`;
  console.log(subpage);
}
