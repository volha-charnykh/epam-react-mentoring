const path = require('path');
const {merge} = require('webpack-merge');
const common = require('../webpack.common.config.js');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = merge(common, {
    name: 'client',
    target: 'web',
    mode: 'production',
    entry: [
        './src/client.js',
    ],
    output: {
        path: path.resolve(__dirname, '../../../build')
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
    ],
});
