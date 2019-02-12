var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');
const https = require('https');

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
      const data = JSON.parse(body);
        if(err) {
            console.log("Error! oh god, oh h*ck" + error);
        } else {
            for(var i = 0; i < data.length; i++) {
                var avatar = data[i];
                var images = avatar.avatar_url;
                var username = avatar.login;
                console.log(images);
                downloadImageByURL(images, `./avatars/${username}` )
            }
        }
        
    });
    function downloadImageByURL(url, filePath) {
      https.get(url, function (response) {
          response.on('data', function(response) {
              console.log("Downloading Image..." + "\n");
          })
            .pipe(fs.createWriteStream(filePath))
          response.on('end', function(end) {
              console.log("Download complete.");
          })

      })
      }
      
  }
getRepoContributors("jquery","jquery", function(err, result) {
    // console.log("Errors", err);
    // console.log("Result", result);
})