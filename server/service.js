const request = require('request');
const Repo = require('../database/index.js');



module.exports.updateAndRender = (callback) => {

    var resultArray = [];
    var stream = Repo.find().stream();

    stream.on('data', function(doc) {
        resultArray.push(doc);
    })

    .on('error', function (err) {
      console.error(err);
    })

    .on('close', function () {
      resultArray = resultArray.slice(0,25);
      callback(resultArray);
    });


}

module.exports.getGithubRepoData = (userInput) => {

    const GITHUB_API_TOKEN_URL = '5e9176108e23f75b0c45d359174c89fc2b041b1b';

    const preUserNameUrl = 'https://api.github.com/users/';
    const postUserNameUrl = '/repos?access_token=' + GITHUB_API_TOKEN_URL;
    const finalURL = preUserNameUrl + userInput + postUserNameUrl;

    var options = {
        url: finalURL,
        headers: {
            'User-Agent': 'request'
        }
    }
    request(options, (error, response, body) => {
        var data = JSON.parse(body)
        if (error) {
            return;
        }

        for (var i = 0; i < data.length; i++) {

            var obj = {
                handle: userInput,
                id: data[i].id,
                name: data[i].name,
                html_url: data[i].html_url,
                description: data[i].description,
                fork_url: data[i].fork_url,
                created_at: data[i].created_at,
                forks: data[i].forks
            }

            var newRepo = new Repo(obj);

            newRepo.save(function (err, newRepo) {
                if (err) return console.error(err);
            });
        }

    })
}



