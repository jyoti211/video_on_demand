(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('subscribed_videos.IndexController', Controller);
 
    function Controller(VideoService,UserService,$scope,$sce,FlashService) {
        var videosList = this;
 
        videosList.favlist = null;
         videosList.user = null;
          videosList.getFavVideoList = getFavVideoList;
 
        initController();
 
        function initController() {
             UserService.GetCurrent().then(function(user){
              videosList.user = user;

              getFavVideoList(user);
            });
           
        }

        function getFavVideoList(user){
            VideoService.getFavVideoList(user._id).then(function(favVideoList){
                    videosList.favlist = favVideoList;
                });
        }
    }
 
})();