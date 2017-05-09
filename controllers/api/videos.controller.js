var config = require('config/config.json');
var express = require('express');
var router = express.Router();
var videoService = require('services/video.service');
var rest = require('restler');
 
// routes
router.get('/allVideos', getAllVideos);
 
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
      res.header('Access-Control-Allow-Origin', "*");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

      res.send(result);
    });
   
    
        
}
