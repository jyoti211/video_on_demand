var config = require('config/config.json');
var rest = require('restler');
 
var service = {};
 
service.getAllVideos = getAllVideos;
 
module.exports = service;
 
function getAllVideos() {
    rest.get('https://demo2697834.mockable.io/movies').on('complete', function(result) {
      if (result instanceof Error) {
        console.log('Error:', result.message);
        this.retry(5000);
        res = {'status':5000,'result': result.message};
      } else {
      	res = {'status':200,'result': result};
        
      }
    });
    

}
