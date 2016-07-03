
var express = require('express');
var Clarifai = require('clarifai');
var appServer = express();
var port = process.env.PORT || 8080;

Clarifai.initialize({
    'clientId': process.env.CLIENT_ID,
    'clientSecret': process.env.CLIENT_SECRET
});

appServer.get('/', function(serverRequest, serverResponse) {
    return serverResponse.send('Expected url format => htp://host:name/getTags?url=image_url');
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
