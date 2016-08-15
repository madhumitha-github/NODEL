
var http = require('http');

var options = {
  host: 'https://hu4xwdeme9.execute-api.us-east-1.amazonaws.com',
  https://hu4xwdeme9.execute-api.us-east-1.amazonaws.com/DEV/bankingbot/accountsummary?userKey=1000&accountType=CHECKING
  path: '/DEV/bankingbot/accountsummary?userKey=1000&accountType=CHECKING',
  method: 'GET'
};

http.request(options, function(response) {
  response.on('data', function (dat) {
    console.log('BODY: ' + dat);
  });
}).end();
