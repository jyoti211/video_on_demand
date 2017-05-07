(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Videos.IndexController', Controller);
    
    function Controller(VideoService) {
        var videosList = this;
        videosList.count = null;
        videosList.result = null;
 
        initController();
 
        function initController() {
            VideoService.GetAllVideos().then(function (video) {
                videosList.count = video.result.totalCount;
                videosList.result = video.result.entries;
                console.log(videosList);
            });
        }
    }
 
})();