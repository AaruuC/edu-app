const http = require('http');

console.log('Closing open handles...');
http.globalAgent.destroy();
