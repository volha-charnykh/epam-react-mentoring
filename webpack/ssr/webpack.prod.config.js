const clientConfig = require('./client/webpack.prod.client.config.js');
const serverConfig = require('./server/webpack.prod.server.config.js');


module.exports = [clientConfig, serverConfig];
