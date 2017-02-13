
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


    //set pathname for dynamic loaded pieces of html
    $(".about").click(function(){
       $scope.page = "pages/about.html";
       $scope.$apply();
       $("canvas").css("display","block");
       $(".one-half").css("background-color","black");
       $(".navCollapse").toggle('fold',function(){
         $("#cog").removeClass("spin");
       });
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    $(".work").click(function(){
       $scope.page = "pages/work.html";
       $("canvas").css("display","none");
       $(".navCollapse").toggle('fold',function(){
         $("#cog").removeClass("spin");
       });
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    $(".contact").click(function(){
       $scope.page = "pages/contact.html";
       $scope.$apply();
       $("canvas").css("display","none");
       $(".navCollapse").toggle('fold',function(){
         $("#cog").removeClass("spin");
       });
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    //listener for word count
    $(document).on('input','#message',function(){
       var count = $(this).val().length;
       var remaining = 500 - count;
       $scope.wordCount = remaining;
       $scope.$apply();
    });

}]);
