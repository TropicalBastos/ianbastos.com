<?php

//Global Constants
define("EMAIL","backend/email.php");
define("MOBILE_DETECT","backend/dependencies/Mobile_Detect.php");

//Global Modules
require_once(MOBILE_DETECT);

//Check if user is mobile
$detect = new Mobile_Detect;
$isMobile = $detect->isMobile();

 ?>
