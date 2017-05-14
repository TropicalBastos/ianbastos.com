(function(){

  var contextMenuClass = "contextitem";
  var scroll;
  var contextmenu;
  var contextOffset;
  var webdev;
  var mobile;
  var opensrc;
  var api;
  var windowsdev;
  var otherprojects;
  var scrollSpeed = 200;
  var scrollOffset = 250;

  function setValues(){
      if(document.getElementById("webdev")){
        webdev = document.getElementById("webdev").offsetTop;
        mobile = document.getElementById("mobile").offsetTop;
        opensrc = document.getElementById("opensrc").offsetTop;
        api = document.getElementById("api").offsetTop;
        windowsdev = document.getElementById("windowsdev").offsetTop;
        otherprojects = document.getElementById("otherprojects").offsetTop;
        return true;
    }else{
      return false;
    }
  }

  function highlightMenuItem(id){
    var els = document.getElementsByClassName("contextitem");
    Array.prototype.forEach.call(els, function(el){
      el.classList.remove("active");
    });


    document.getElementById(id).classList.add("active");
  }

  function doScrolling(elementY, duration) {
    var startingY = window.pageYOffset
    var diff = elementY - startingY
    var start

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp
      // Elapsed miliseconds since start of scrolling.
      var time = timestamp - start
      // Get percent of completion in range [0, 1].
      var percent = Math.min(time / duration, 1)

      window.scrollTo(0, startingY + diff * percent)

      // Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimationFrame(step)
      }
    });
  }

  window.addEventListener("scroll",function(){
    scroll = window.scrollY;

    if(contextmenu = document.getElementsByClassName("contextmenu")[0]){

      if(contextmenu.className.indexOf("contextmenufixed")===-1){
        contextmenu.classList.add("onscreen");
      }else{
        contextmenu.classList.remove("onscreen");
      }

      if(!contextOffset) contextOffset = contextmenu.offsetTop;
      if(scroll >= contextOffset){
        contextmenu.classList.add("contextmenufixed");
      }else if(scroll < contextOffset){
        contextmenu.classList.remove("contextmenufixed");
      }
    }

    setValues();

      if(scroll >= webdev && scroll < mobile && setValues()){

        highlightMenuItem("webcontext");

      }else if(scroll >= mobile && scroll < opensrc && setValues()){

        highlightMenuItem("mobilecontext");

      }else if(scroll >= opensrc && scroll < api && setValues()){

        highlightMenuItem("opensrccontext");

      }else if(scroll >= api && scroll < windowsdev && setValues()){

        highlightMenuItem("apicontext");

      }else if(scroll >= windowsdev && scroll < otherprojects && setValues()){

        highlightMenuItem("windowscontext");

      }else if(scroll>=otherprojects && setValues()){

        highlightMenuItem("otherprojectscontext");

      }


  });

  document.addEventListener("click",function(event){
    if(event.target.className.indexOf(contextMenuClass)!==-1
        || event.target.parentNode.className.indexOf(contextMenuClass)!==-1){

        var element;
        if(event.target.tagName!=="DIV"){
          element = event.target.parentNode;
        }else{
          element = event.target;
        }


        if(element.id==="webcontext"){
          doScrolling(webdev+scrollOffset,scrollSpeed);
        }

        if(element.id==="mobilecontext"){
          doScrolling(mobile+scrollOffset,scrollSpeed);
        }

        if(element.id==="opensrccontext"){
          doScrolling(opensrc+scrollOffset,scrollSpeed);
        }

        if(element.id==="apicontext"){
          doScrolling(api+scrollOffset,scrollSpeed);
        }

        if(element.id==="windowscontext"){
          doScrolling(windowsdev+scrollOffset,scrollSpeed);
        }

        if(element.id==="otherprojectscontext"){
          doScrolling(otherprojects+scrollOffset,scrollSpeed);
        }
    }
  });

})();
