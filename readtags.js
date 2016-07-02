
var url = require('url');
var express = require('express');
var Clarifai = require('clarifai');
var appServer = express();
var port = process.env.PORT || 8080;

Clarifai.initialize({
    'clientId': 'hERl8Zvb63fJpRtpCwp1bGP_7JiyCfwUqlzfq2kS',
    'clientSecret': 'LQDwDlvFV6jKr9F0Gw2NvUHv3pUtKFsfQmXeY00q'
});

appServer.get('/getTags', function(serverRequest, serverResponse) {
    
    var imageurl = serverRequest.param('url');
    if(imageurl == undefined) {
        return serverResponse.send('Expected url format => htp://host:name/getTags?url=image_url');
    }
  	        
    Clarifai.getTagsByUrl(imageurl).then(
  	    function(response) {
  	        serverResponse.json({'Tags' : response["results"][0].result["tag"]["classes"]});
        },
  	    function(error) {
  	        serverResponse.end(error);
  	    }
    );
});

appServer.listen(port, function() {
    console.log('Sever is listening');
});
