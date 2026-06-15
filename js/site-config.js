(function () {
  "use strict";

  var host = window.location.hostname;
  var isLocal = host === "127.0.0.1" || host === "localhost";

  window.CANCRI_SITE = {
    blogOrigin: isLocal ? "http://127.0.0.1:8081" : "https://www.nexusvai.xyz",
    chatOrigin: isLocal ? "http://127.0.0.1:8081/chat" : "https://www.nexusvai.xyz/chat",
  };
})();
