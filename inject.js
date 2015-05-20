var messageInputID = 'message-input';
var messageInput = document.getElementById(messageInputID);
messageInput.addEventListener('keydown', function(event) {
  if (event.keyCode == 13) { // Enter
    var message = this.value.trim();
    if (message.indexOf("gipher") == 0) {
      var query = message.substr(message.indexOf(" ") + 1);
      searchGoogleForGif(query);
    }
  }
});

function searchGoogleForGif(query) {

    var googleImageSearchApiUrl = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0"
    var query = escape(query + " gif tumblr");
    var url = googleImageSearchApiUrl + "&q=" + query

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        imageSearchCallback(xhr.responseText);
      }
    }
    xhr.send();
}

function imageSearchCallback(responseText) {
  var results = JSON.parse(responseText);
  var gif = results.responseData.results[0].unescapedUrl
  sendGif(gif);
}

function sendGif(gif) {
  var messageInput = document.getElementById(messageInputID);
  messageInput.value = gif;
  var javascriptToSendMessage = "TS.view.submit();";
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerText = javascriptToSendMessage;
  document.getElementsByTagName('head')[0].appendChild(script);
}
