var config = require('config/config.json');
var express = require('express');
var router = express.Router();
var videoService = require('services/video.service');
var rest = require('restler');
 
// routes
router.get('/allVideos', getAllVideos);
router.put('/addFavVideo/:_id',addFavVideo);
router.get('/getFavVideoList/:_id', getFavVideoList);

module.exports = router;
 
function getAllVideos(req, res) {
    //res = videoService.getAllVideos();
     rest.get('https://demo2697834.mockable.io/movies').on('complete', function(result) {
      if (result instanceof Error) {
        console.log('Error:', result.message);
        this.retry(5000);
        result = {'status':5000,'result': result.message};
      } else {
      	result = {'status':200,'result': result};
        
      }
      res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
      res.send(result);
    });
}

function addFavVideo(req,res){
  var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }
 
    videoService.addFavVideo(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getFavVideoList(req, res) {
  var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }
  
    videoService.getFavVideoById(req.user.sub)
        .then(function (favVideos) {
          console.log(favVideos);
            if (favVideos) {
                res.send(favVideos);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}