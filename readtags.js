
var url = require('url');
var express = require('express');
var Clarifai = require('clarifai');
var appServer = express();
var port = process.env.PORT || 8080;

Clarifai.initialize({
    'clientId': 'hERl8Zvb63fJpRtpCwp1bGP_7JiyCfwUqlzfq2kS',
    'clientSecret': 'LQDwDlvFV6jKr9F0Gw2NvUHv3pUtKFsfQmXeY00q'
});

appServer.get('/getTags/', function(serverRequest, severResponse) {
    var imageurl = serverRequest.param('url');
    
    console.log('Before: ' + serverRequest.param('url'));
    Clarifai.getTagsByUrl(imageurl).then(
  	    function(response) {
  	        if(imageurl == undefined) {
                return res.send('Pass Image url in the request params');
            }
  	        console.log('imageUrl');
  	        console.log('response: ' + JSON.stringify(response));
    		serverResponse.json({'Tags' : response["results"][0].result["tag"]["classes"]});
        },
  	    function(error) {
  	        console.log('error');
    		serverResponse.end(error);
  	    }
    );
});

appServer.listen(port, function() {
    console.log('App is running');
});
