(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Videos.IndexController', Controller);
    
    function Controller(VideoService,UserService,$scope,$sce,FlashService) {

        var videosList = this;
        videosList.count = null;
        videosList.result = null;
        $scope.GetAllVideos = null;
          videosList.links_url = [];
          $scope.selectedList = {};
          videosList.favlist = [];
        videosList.user = null;
        videosList.getFavVideoList = getFavVideoList;
       
        initController();
 
        function initController() {
            UserService.GetCurrent().then(function(user){
              videosList.user = user;
            });
            VideoService.GetAllVideos().then(function (video) {
                videosList.count = video.result.totalCount;
                videosList.result = video.result.entries;
                angular.forEach(videosList.result, function(value, key) {
                
                   
                    var html = "<video  width='400' controls='controls'>\
                                <source src='"+value.contents[0].url+"' id = '"+key+"' type='video/mp4'></video>\
                                 ";
                     videosList.links_url.push({'video':html,'id':value.id});

                });
                for (var i = 0; i <  videosList.links_url.length; i++) {
                        videosList.links_url[i].video = $sce.trustAsHtml( videosList.links_url[i].video);
                    } 
                 
                
            });
        }

        
       
        $scope.addToFav = function () {
            
            angular.forEach($scope.selectedList, function (selected, video) {
                if (selected) {
                    videosList.favlist.push(video);
                }
            });
             VideoService.addFavVideo(videosList.user._id,videosList.favlist)
              .then(function(){
                FlashService.Success('video added to fav list');
              })
              .catch(function(error){
                FlashService.Error(error);
              });
        };


        function getFavVideoList(){
          console.log("fav clicked");
            VideoService.getFavVideoList().then(function(favVideoList){
                    videosList.favVideoList = favVideoList;
                });
        }


    }
 
})();
