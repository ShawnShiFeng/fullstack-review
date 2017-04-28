const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const services = require('./service');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/repos/import',  (req, res, next) => {
    var userInput = req.body.data.userInput;
    services.getGithubRepoData(userInput);
    services.updateAndRender(function(arr) {
    console.log("done");
    res.status(201).send(arr);
  });
});

app.get('/repos', function (req, res) {
  services.updateAndRender(function(arr) {
    res.status(200).send(arr);
  });

});

var port = 1128;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

