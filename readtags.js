
var url = require('url');
var express = require('express');
var Clarifai = require('clarifai');
var appServer = express();
var port = process.env.PORT || 8080;

Clarifai.initialize({
    'clientId': 'hERl8Zvb63fJpRtpCwp1bGP_7JiyCfwUqlzfq2kS',
    'clientSecret': 'LQDwDlvFV6jKr9F0Gw2NvUHv3pUtKFsfQmXeY00q'
});

appServer.get('/getTags/', function(serverRequest, serverResponse) {
    var imageurl = serverRequest.param('url');
    
    console.log('Before: ' + serverRequest.param('url'));
    if(imageurl == undefined) {
        return serverResponse.send('Pass Image url in the request params');
    }
  	        
    Clarifai.getTagsByUrl(imageurl).then(
  	    function(response) {
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
