var config = require('config/config.json');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

 
var service = {};
 
service.addFavVideo = addFavVideo;
service.getFavVideoById = getFavVideoById;
 
module.exports = service;
 
function addFavVideo(_id, userParam) {
	console.log(userParam);
    var deferred = Q.defer();
 	console.log(JSON.stringify(userParam));
    
        // fields to update
        var set = {
            fav_video: {'_video_id':userParam}
        };
 
       
        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err);
 
                deferred.resolve();
            });
 
    return deferred.promise;
}

function getFavVideoById(_id) {
    var deferred = Q.defer();
    console.log(_id);

    db.users.find({"_id":ObjectId(_id)},{fav_video:1}, function (err, favVideos) {
        console.log(favVideos);
        /*if (err) deferred.reject(err);
 
        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }*/
    });
 
    //return deferred.promise;
}
