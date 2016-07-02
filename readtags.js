
var url = require('url');
var http = require('http');
var dispatcher = require('httpdispatcher');
var Clarifai = require('clarifai');


Clarifai.initialize({
'clientId': 'hERl8Zvb63fJpRtpCwp1bGP_7JiyCfwUqlzfq2kS',
'clientSecret': 'LQDwDlvFV6jKr9F0Gw2NvUHv3pUtKFsfQmXeY00q'
});

dispatcher.onGet("/getTags", function(serverRequest, serverResponse) {
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

var server = http.createServer(function(request, response) {
    dispatcher.dispatch(request, response);
});
server.listen(8080);