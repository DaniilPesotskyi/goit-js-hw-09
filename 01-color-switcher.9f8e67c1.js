!function(){var t={startButton:document.querySelector("[data-start]"),stopButton:document.querySelector("[data-stop]"),pageBody:document.querySelector("body")};t.startButton.addEventListener("click",(function(){o&&(o=!1,e=setInterval(a,1e3),t.stopButton.removeAttribute("disabled","disabled"),t.startButton.setAttribute("disabled","disabled"))})),t.stopButton.addEventListener("click",(function(){o=!0,clearInterval(e),t.stopButton.setAttribute("disabled","disabled"),t.startButton.removeAttribute("disabled","disabled")}));var e=null,o=!0;function a(){t.pageBody.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}}();
//# sourceMappingURL=01-color-switcher.9f8e67c1.js.map