
const post = function(moves) {
  const xhr = new XMLHttpRequest();
  const data = {};
  for (var i = 0; i < document.getElementsByClassName("postValue").length; i++) {
    if (document.getElementsByClassName("postValue")[i].getAttribute("id") !== null) {
      data[document.getElementsByClassName("postValue")[i].getAttribute("id")] =
        document.getElementsByClassName("postValue")[i].tagName == "select" ?
          document.getElementsByClassName("postValue")[i].selectedIndex :
          document.getElementsByClassName("postValue")[i].value;
    }
  }

  xhr.open('POST', '/api/getSource');
  xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(data));
console.log(data);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // console.log(xhr.responseText);
    document.getElementById("source").innerHTML = xhr.responseText;
  }
}
}
