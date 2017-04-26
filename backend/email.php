<?php

    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $to = "ian-bastos@live.com";
    $headers = "From: webmaster@ianbastos.com\r\n";

    if(mail($to,$subject,$message,$headers)){
      echo "Success";
    }else{
      echo "Error";
    }

 ?>
