const {merge} = require('webpack-merge');
const common = require('./webpack.common.server.config.js');

module.exports = merge(common, {
    mode: "production",
});
