var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');
console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': secrets
      }
    };
  
    request(options, function(err, res, body) {
      cb(err, body);
      var data = JSON.parse(body);
        if(err) {
            console.log("Error, oh god oh h*ck" + error);
        } else {
            for(var i = 0; i < data.length; i++) {
                var avatar = data[i];
                console.log(avatar.avatar_url)
            }
        }
    });
  }
getRepoContributors("jquery","jquery", function(err, result) {
    // console.log("Errors", err);
    // console.log("Result", result);
})