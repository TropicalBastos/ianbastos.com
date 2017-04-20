
var whichPage;

//check first if the intro has been played
if(Cookies.get('intro')){
    whichPage = Cookies.get("intro");
    Cookies.remove("intro");
}else{
      window.location = "intro//intro.html";
}

var mainApp = angular.module('mainApp',[]);


mainApp.controller('mainCtrl',['$scope',function($scope){

    $scope.page = whichPage;
    $scope.wordCount = 500;
    $scope.phoneGraphic = $scope.page==="pages/about.html";

    //set pathname for dynamic loaded pieces of html
    $(document).on('click touchend','.about',function(){
       $scope.page = "pages/about.html";
       $scope.phoneGraphic = true;
       $scope.$apply();
       $("canvas").css("display","block");
       $(".one-half").css("background-color","black");
       $(".navCollapse").hide('fold',function(){
         $("#cog").removeClass("spin");
       });
       $scope.wordCount = 500;
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    $(document).on('click touchend','.work',function(){
      $scope.phoneGraphic = false;
       $scope.page = "pages/work.html";
       $scope.$apply();
       $("canvas").css("display","none");
       $(".navCollapse").hide('fold',function(){
         $("#cog").removeClass("spin");
       });
       $scope.wordCount = 500;
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    $(document).on('click touchend','.contact',function(){
       $scope.page = "pages/contact.html";
       $scope.phoneGraphic = false;
       $scope.$apply();
       $("canvas").css("display","none");
       $(".navCollapse").hide('fold',function(){
         $("#cog").removeClass("spin");
       });
       document.body.scrollTop = document.documentElement.scrollTop = 0;
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
