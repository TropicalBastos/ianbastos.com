
var followMePopped;
var okToSend = [false,false,false];
var pageLoaded = false;

$(document).ready(function(){

  //add black background to one-half div after its loaded to make animations run nicer
  setTimeout(function(){
    $(".one-half").css("background-color","black");
    $("canvas").addClass("fadingIn");
    pageLoaded = true;
    //start reel in text animation above phones
    $("#phoneGraphic>h1").addClass("slideInForPhone");
    $("#phoneGraphic2>h1").addClass("slideInForPhoneReversed");
  },1000);

   //hide particle canvas if not on about page
   setTimeout(function(){
   if(whichPage!=="pages/about.html"){
        $("canvas").css("display","none");
    }else{
      //start particles
      setup();
    }
  },1000);


    // if follow me pop up has appeared
    var followMePopped = false;
    var op;

    //opacity function
    function calculateOp(){
         op = ($("body").scrollTop()/$(window).height());
         //moz support
         if(op===0){
           op = document.documentElement.scrollTop/$(window).height();
         }
         return op;
     }

     //reverse opacity for top decoration
     function reverseOp(){
         var rop;
         rop = 1-calculateOp();
         return rop;
     }

    //scroll event handler
    $(window).on('scroll',function(){
        $("#waveImage>img").css("opacity",calculateOp());
        $(".phoneGraphic").css("opacity",reverseOp());

        if($("body").scrollTop() >= 400
            || document.documentElement.scrollTop >= 400){
            //turn off event handler only fire once
            if(!followMePopped){
                $(".scrollDiv").addClass("popup");
                followMePopped = true;
            }
            }
        });

    //click nav cog handler
    $(document).on('click touchstart','#cog',function(){
      $("#cog").addClass("spin");
      $(".navCollapse").toggle('fold',function(){
        $("#cog").removeClass("spin");
      })
    });

    //hover over nav buttons
    $(".about>img").mouseover(function(){
       $(this).attr("src","res//aboutBtnHover.png");
    });
    $(".about>img").mouseout(function(){
       $(this).attr("src","res//aboutBtn.png");
    });

    $(".work>img").mouseover(function(){
       $(this).attr("src","res//workBtnHover.png");
    });
    $(".work>img").mouseout(function(){
       $(this).attr("src","res//workBtn.png");
    });

    $(".contact>img").mouseover(function(){
       $(this).attr("src","res//contactBtnHover.png");
    });
    $(".contact>img").mouseout(function(){
       $(this).attr("src","res//contactBtn.png");
    });


    //contact regex input handlers
    $(document).on('blur','#email',function(){
        $("#emailError").remove();
       var regex = /^[0-9a-zA-Z-.]+@[0-9a-zA-Z]+.([a-zA-Z]+.)?((com)|co.[a-zA-Z]{1,2})$/;
       if(!$(this).val().match(regex)){
           var error = document.createElement("p");
           error.textContent = "*Please enter a valid email address";
           error.id = "emailError";
           error.style = "color : red;position: relative;left: 8%;font-size: 9px;";
           $("#email").after(error);
           //for mobile browsers that dont render dynamically
           $("#emailError").addClass("error");
           okToSend[0] = false;
       }else{
           okToSend[0] = true;
       }
    });

    $(document).on('blur','#subject',function(){
        $("#subjectError").remove();
       var regex = /^[0-9A-Za-z-.!? ]{0,18}$/;
       if(!$(this).val().match(regex)){
           var error = document.createElement("p");
           error.textContent = "*Subject must be a maximum of 18 characters";
           error.id = "subjectError";
           error.style = "color : red;position: relative;left: 8%;font-size: 9px;";
           $("#subject").after(error);
           $("#subjectError").addClass("error");
           okToSend[1] = false;
       }else{
           okToSend[1] = true;
       }
    });

    //check the message box if it is over the character limit or 0
    $(document).on('blur','#message',function(){
        $("#messageError").remove();
       if($(this).val().length>500){
           var error = document.createElement("p");
           error.textContent = "*Over character limit!";
           error.id = "messageError";
           error.style = "color : red;position: relative;left: 8%;font-size: 9px;";
           $("#message").after(error);
           $("#messageError").addClass("error");
           okToSend[2] = false;
       }
          else if($(this).val().length===0){
           var error = document.createElement("p");
           error.textContent = "*No message!";
           error.id = "messageError";
           error.style = "color : red;position: relative;left: 8%;font-size: 9px;";
           $("#message").after(error);
           $("#messageError").addClass("error");
           okToSend[2] = false;

       }else{
           okToSend[2] = true;
       }
    });

    //reset pop up
    $(".about, .work, .contact").on('click touchstart',function(){
       followMePopped = false;
    });


    //send button event handler
    //checks if all fields are valid
    $(document).on("click touchstart","form>button.contactButton",function(){

      var allOk = true;
      for(var i = 0; i < okToSend.length; i++){
          if(okToSend[i]===false){
              allOk = false;
          }
      }

      var e = $("#email").val();
      var s = $("#subject").val();
      var m = $("#message").val();
      var dataString = "email="+e+"&subject="+s+"&message="+m;
      var response;

      if(!allOk){
        //if not all fields have been filled correctly show dialog
          $(".messageSent>h3").html("Please check everything has been filled correctly");
          showMessageDialog();
          return;
      }else{
        //load loading icon while ajax sends a request to server
        $(".loader").css("display","flex");
        $("form>button").html("");
              $.ajax({
              method:"POST",
              url:"email.php",
              data:dataString,
              cache:false,
              success: function(data){
                if(data==="Success"){
                  $(".loader").fadeOut(500);
                  $("form>button").html("Send");
                  $(".messageSent>h3").html("Message to Ian sent successfully");
                  showMessageDialog();
                }else{
                  $(".loader").fadeOut(500);
                  $("form>button").html("Send");
                  $(".messageSent>h3").html("Error occured, message to Ian not sent");
                  showMessageDialog();
                }
              }
            });
      }
    });

    function showMessageDialog(){
      $(".messageSent").show(0,function(){
        $(".messageSent").addClass("sent");
      });
    }

    //close message context
    $(document).on("click touchstart",".messageSent>button.contactButton",function(){
        $(".messageSent").fadeOut(200,function(){
           $(".messageSent").removeClass("sent");
        });
    });

//make sure canvas stays the right size
window.requestAnimationFrame(canvasContextualizer);
function canvasContextualizer(){
  if($(document).width()>1072){
    $("canvas").css({"top":"300px"});
  }else{
    $("canvas").css({"top":"0"});
  }
  window.requestAnimationFrame(canvasContextualizer);
}

});

//clicking off nav menu listener
function onNavExitListener(e){
  if(!$(e.target).is(".navCollapse")
&& !$(e.target).is("#cog")){
  if($(".navCollapse").css("display")==="block"){
      $(".navCollapse").hide('fold',function(){
        $("#cog").removeClass("spin");
      })
    }
  }else if($(e.target).is(".nMobile")){
    if($(".navCollapse").css("display")==="block"){
        $(".navCollapse").hide('fold',function(){
          $("#cog").removeClass("spin");
        });
      }
  }
}

function toggleWebsiteTitle(){
  $("#websites").addClass("popped");
}

function animateWorkDivs(){
  var delay = 100;
  $(".work-div").each(function(i,obj){
    var jq = $(this);
    delay = delay + 100;
    setTimeout(function(){
      jq.addClass("emplace");
    },delay);
  });
}

//force click on mobile devices
$(document).on("touchstart","#email",function(){
  $("#email").focus();
});
$(document).on("touchstart","#subject",function(){
  $("#subject").focus();
});
$(document).on("touchstart","#message",function(){
  $("#message").focus();
});
