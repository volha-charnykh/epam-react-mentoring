const {merge} = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.server.config.js');

module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, '../../../build'),
        filename: './js/app.js',
        libraryTarget: 'commonjs2'
    },
});
