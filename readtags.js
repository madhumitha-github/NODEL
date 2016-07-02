
var url = require('url');
var express = require('express');
var Clarifai = require('clarifai');
var appServer = express();
var port = process.env.PORT || 8080;

Clarifai.initialize({
    'clientId': 'hERl8Zvb63fJpRtpCwp1bGP_7JiyCfwUqlzfq2kS',
    'clientSecret': 'LQDwDlvFV6jKr9F0Gw2NvUHv3pUtKFsfQmXeY00q'
});

appServer.get('/', function(serverRequest, severResponse) {
    var imageUrl = url.parse(serverRequest.url, true).query['url'];
    Clarifai.getTagsByUrl(imageUrl).then(
  	    function(response) {
    		serverResponse.end(JSON.stringify({'Tags' : response["results"][0].result["tag"]["classes"]}));
        },
  	    function(error) {
    		console('error: ' + error);
  	    }
    );
});

appServer.listen(port, function() {
    console.log('App is running');
});
