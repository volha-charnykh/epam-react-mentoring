const {merge} = require('webpack-merge');
const common = require('./webpack.common.server.config.js');
const path = require('path');

module.exports = merge(common, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, '../../../dev'),
        filename: './js/app.js',
        libraryTarget: 'commonjs2'
    },
});
