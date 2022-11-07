"use strict";
onload = function () {
  document.getElementsByTagName("iframe")[0].src = location.search.replace("?", "") ? location.search.replace("?", "") : "content.html";
};