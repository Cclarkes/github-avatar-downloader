var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');
const https = require('https');
var owner = process.argv[2];
var repo = process.argv[3];

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) { //Take input from CLI and find the proper URL
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
     headers: {
      'User-Agent': secrets // Link to secret token file
    }
  };
  
  request(options, function(err, res, body) { // GET request and declare error conditionals 
    cb(err, body);
    const data = JSON.parse(body);
      if(err || res.statusCode != 200) {
        console.log("oh g*d, oh h*ck, enter a valid Repo and Owner ya nerd!");
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
    function downloadImageByURL(url, filePath) { //convert the URL found through previous function to a write stream
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
getRepoContributors(owner, repo, function(err, result) {
    // console.log("Errors", err);
    // console.log("Result", result);
})