const path = require('path');
const {merge} = require('webpack-merge');
const common = require('../webpack.common.config.js');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = merge(common, {
    name: 'client',
    target: 'web',
    mode: 'development',

    entry: [
        'webpack-hot-middleware/client',
        './src/client.js',
    ],

    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../../../dev')
    },
    devtool: 'source-map',

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});
