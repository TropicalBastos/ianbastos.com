<?php
require("config.php");
 ?>

<!DOCTYPE html>
<html ng-app='mainApp'>
    <head>
        <title>Ian Bastos</title>
        <link rel="stylesheet" href="css/main.min.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="js/main.min.js"></script>
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
  </script>
<?php else: ?>
  <script>
    document.addEventListener('click',onNavExitListener);
    //mobile buggy with css transitions so only available in desktop
    document.getElementsByTagName('body')[0].classList.add("blueFlash");
  </script>
<?php endif; ?>
  <script src="js/particles.js"></script>
    </body>
</html>
