(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Videos.IndexController', Controller);
    
    function Controller(VideoService,$scope,$sce) {

        var videosList = this;
        videosList.count = null;
        videosList.result = null;
        videosList.arrayToReturn = null;
        $scope.GetAllVideos = null;
          videosList.links_url = [];
          $scope.selectedList = {};

        initController();
 
        function initController() {
            VideoService.GetAllVideos().then(function (video) {
                videosList.count = video.result.totalCount;
                videosList.result = video.result.entries;
                $scope.url = {};
                var arrayToReturn ={};
                $scope.tempData = [];
                angular.forEach(videosList.result, function(value, key) {
                
                    $scope.url[key] = value.contents[0].url ;
                   
                    var html = "<video  width='400' controls='controls'>\
                                <source src='"+value.contents[0].url+"' id = '"+key+"' type='video/mp4'></video>\
                                <input name = 'fav[]' type='checkbox' id='"+value.id+"' ng-model='selectedList["+value.id+"]'/>\
                                <label for='"+value.id+"'>'"+value.id+"'</label> ";
                     videosList.links_url.push(html);
                     
                });
                for (var i = 0; i <  videosList.links_url.length; i++) {
                        videosList.links_url[i] = $sce.trustAsHtml( videosList.links_url[i]);
                    } 
                    $scope.list = videosList.links_url;
                 
                
            });
        }

        
       
        $scope.addToFav = function () {
            var favlist = {};
            console.log($scope.selectedList);
            console.log($sce.valueOf(videosList.links_url));
            angular.forEach($scope.selectedList, function (selected, video) {
                if (selected) {
                    favlist.push(video);
                   console.log(video);
                }
                 console.log(favlist);
            });
        };
    }
 
})();