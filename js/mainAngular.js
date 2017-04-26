
var whichPage;

//check first if the intro has been played
if(Cookies.get('intro')){
    whichPage = Cookies.get("intro");
    Cookies.remove("intro");
}else{
      window.location = "intro/intro.html";
}

var mainApp = angular.module('mainApp',[]);


mainApp.controller('mainCtrl',['$scope',function($scope){

    $scope.page = whichPage;
    $scope.wordCount = 500;

    //set pathname for dynamic loaded pieces of html
    $(document).on('click touchend','.about',function(){
      $scope.goToAboutPage();
    });

    $(document).on('click touchend','.work',function(){
       $scope.goToWorkPage();
    });

    $(document).on('click touchend','.contact',function(){
      $scope.goToContactPage();
    });

    $(document).on('click touchend','.replayintro',function(){
      window.location.href="/";
    });

    //listener for word count
    $(document).on('input','#message',function(){
       var count = $(this).val().length;
       var remaining = 500 - count;
       $scope.wordCount = remaining;
       $scope.$apply();
    });

    $scope.goToAboutPage = function(){
      $scope.page = "pages/about.html";
      $scope.$apply();

      $("canvas").css("display","block");
      $(".one-half").css("background-color","black");
      $(".navCollapse").hide('fold',function(){
        $("#cog").removeClass("spin");
      });
      $scope.wordCount = 500;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      $("#phoneGraphic>h1").addClass("slideInForPhone");
      $("#phoneGraphic2>h1").addClass("slideInForPhoneReversed");

      //restart particles
      setTimeout(function(){
        setup();
      },500);
    }

    $scope.goToWorkPage = function(){
      $scope.page = "pages/work.html";
      $scope.$apply();
      $("canvas").css("display","none");
      $(".navCollapse").hide('fold',function(){
        $("#cog").removeClass("spin");
      });
      $scope.wordCount = 500;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      $(".phoneGraphic>h1").removeClass("slideInForPhone");
    }

    $scope.goToContactPage = function(){
      $scope.page = "pages/contact.html";
      $scope.$apply();
      $("canvas").css("display","none");
      $(".navCollapse").hide('fold',function(){
        $("#cog").removeClass("spin");
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      $(".phoneGraphic>h1").removeClass("slideInForPhone");
    }

    //eventlisteners for the phonegraphic gifs
    $(document).on("click","#phoneGraphic",function(){
      $scope.goToContactPage();
    });

    $(document).on("click","#phoneGraphic2",function(){
      window.location.href = "/";
    });

}]);

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
