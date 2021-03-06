(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('VideoService', Service);
    
    function Service($http, $q) {
        var service = {};
 
        service.GetAllVideos = GetAllVideos;
        service.addFavVideo = addFavVideo;
        service.getFavVideoList = getFavVideoList;
 
        return service;
 
        function GetAllVideos() {
            return $http.get('/api/videos/allVideos').then(handleSuccess, handleError);
        }

        function addFavVideo(user_id,videolist){
             return $http.put('/api/videos/addFavVideo/'+ user_id,videolist).then(handleSuccess, handleError);
        }

         function getFavVideoList(user_id){
            console.log(user_id);
             return $http.get('/api/videos/getFavVideoList/'+ user_id).then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(res) {
            return $q.reject(res.data);
        }
    }
})();