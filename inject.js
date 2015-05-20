// "Constants"
var messageInputID = 'message-input';
var messageInput = document.getElementById(messageInputID);
var googleImageSearchApiUrl = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0";
var searchModification = "gif tumblr";

function init() {
  // add event listener to input box
  messageInput.addEventListener('keydown', function(event) {
    // if ENTER is pressed
    if (event.keyCode == 13) { 
      var message = this.value.trim();
      // if the message contains "gipher"
      if (message.indexOf("gipher") == 0) {
        // grab everything but the first word
        var query = message.substr(message.indexOf(" ") + 1);
        searchGoogleForGif(query);
      }
    }
  });
}

function searchGoogleForGif(query) {
    var query = escape(query + searchModification);
    var url = googleImageSearchApiUrl + "&q=" + query

    // Cross-Domain Request
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // callback
        imageSearchCallback(xhr.responseText);
      }
    }
    xhr.send();
}

function imageSearchCallback(responseText) {
  var results = JSON.parse(responseText);
  // path to gif of random result
  var gifs = results.responseData.results
  var rand = Math.floor(Math.random() * gifs.length)
  var gif = gifs[rand].unescapedUrl
  gif = addCacheBuster(gif);
  sendGif(gif);
}

function addCacheBuster(gif) {
  return gif + "?cache_buster_9000=" + new Date().getTime()
}

function sendGif(gif) {
  // put the gif url in the text box
  var messageInput = document.getElementById(messageInputID);
  messageInput.value = gif;

  // submit the form
  var javascriptToSendMessage = "TS.view.submit();";
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerText = javascriptToSendMessage;
  document.getElementsByTagName('head')[0].appendChild(script);
}

init();
