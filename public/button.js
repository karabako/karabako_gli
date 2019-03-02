function toc() {
  switch (document.getElementById("host").selectedIndex) {
    case 1:
      document.getElementById("host").selectedIndex = 0;
      case 0:
      post();
        break;
  }
}

function auth() {
  if (document.getElementsByClassName("undernavi")[0]) {
    var wId = document.getElementsByClassName("undernavi")[0].getElementsByTagName("a")[0].getAttribute("href");
    wId = wId.split("/")[wId.split("/").length-2];
    document.getElementById("sCode").value = wId;
  }

  document.getElementById("host").selectedIndex = 1;
  getSource(document.getElementById("sCode").value);
}

function go() {
  switch (document.getElementById("host").selectedIndex) {
    case 0:
      getSource(document.getElementById("sCode").value+"/"+document.getElementById("page").value);
      break;
  }

}

function prev() {
  switch (document.getElementById("host").selectedIndex) {
    case 0:
      if (Number(document.getElementById("page").value) > 1) {
        document.getElementById("page").value = Number(document.getElementById("page").value)-1
      }
      post();
      break;
  }
}
function next() {
  switch (document.getElementById("host").selectedIndex) {
    case 0:
      document.getElementById("page").value = Number(document.getElementById("page").value)+1;
      post();
      break;
  }
}
