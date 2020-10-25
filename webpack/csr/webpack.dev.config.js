const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
    mode: 'development',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dev')
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dev'),
        compress: true,
        port: 3060,
        open: true
    },
});
