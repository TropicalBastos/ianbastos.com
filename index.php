<?php
require("config.php");
 ?>

<!DOCTYPE html>
<html ng-app='mainApp'>
    <head>
        <title>Ian Bastos</title>
        <!--build:css css/main.min.css-->
        <link rel="stylesheet" type="text/css" href="css/mainStyle.css">
        <link rel='stylesheet' type='text/css' href='bower_components/font-awesome/css/font-awesome.min.css'>
        <link rel='stylesheet' type='text/css' href='css/loader.css'>
        <link rel="stylesheet" type="text/css" href="css/work.css">
        <!--endbuild-->
        <link rel="shortcut icon" type="image/png" href="favicon.png">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--build:js js/main.min.js-->
        <script src="bower_components/js-cookie/src/js.cookie.js"></script>
        <script src="bower_components/angular/angular.min.js"></script>
        <script src='bower_components/p5.js/lib/p5.min.js'></script>
        <script src="bower_components/jquery/dist/jquery.min.js"></script>
        <script src="bower_components/jquery-ui/jquery-ui.min.js"></script>
        <script src="js/main.js"></script>
        <script src='js/mainCtrl.js'></script>
        <script src="js/workcontextmenu.js"></script>
        <!--endbuild-->
    </head>
    <body ng-controller='mainCtrl'>
        <div id="topWrapper">
            <h1>Ian Bastos</h1>
        </div>
        <div class="navWrapper">
            <nav>
                <div class="navbar">
                    <ul class="listNav">
                        <li class="about">
                            <img src="res/aboutBtn.png"/>
                        </li>
                        <li class="work">
                            <img src="res/workBtn.png"/>
                        </li>
                        <li class="contact">
                            <img src="res/contactBtn.png"/>
                        </li>
                    </ul>
                </div>
                <div class="navbar-mobile">
                  <img id="cog" src="res/cog.png" alt="cog"/>
                  <h1 id="navbarHeader">Ian Bastos</h1>
                  <ul class="navCollapse">
                    <li class="about">
                      <div class="nMobile">
                        <h4>About</h4>
                    </div>
                  </li>
                      <li class="work">
                        <div class="nMobile">
                        <h4>Work</h4>
                      </div>
                      </li>
                      <li class="contact">
                        <div class="nMobile">
                        <h4>Contact</h4>
                      </div>
                      </li>
                      <li class="replayintro">
                        <div class="nMobile">
                        <h4>Replay Intro</h4>
                      </div>
                      </li>
                  </ul>
                </div>
            </nav>
        </div>
        <div id='includer' ng-include src="page">
        </div>
<?php if($isMobile): ?>
  <script>
    document.addEventListener('touchend',onNavExitListener);

    //link click event
    $(document).on('click touchstart',".scrollDiv>h1",function(){
      if($(this).parent().hasClass("github")){
        window.location = "https://github.com/TropicalBastos";
      }else{
        window.location = "https://www.instagram.com/tropicalbastos/";
      }
    });
  </script>
<?php else: ?>
  <script>
    document.addEventListener('click',onNavExitListener);
    //mobile buggy with css transitions so only available in desktop
    document.getElementsByTagName('body')[0].classList.add("blueFlash");

    //link click event for desktops
    $(document).on('click touchstart',".scrollDiv>h1",function(){
      if($(this).parent().hasClass("github")){
        window.open("https://github.com/TropicalBastos");
      }else{
        window.open("https://www.instagram.com/tropicalbastos/");
      }
    });
  </script>
<?php endif; ?>

  <script src="js/particles.js"></script>

    </body>
</html>
