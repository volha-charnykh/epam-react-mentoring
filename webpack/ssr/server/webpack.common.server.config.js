const {merge} = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const common = require('../webpack.common.config.js');
const path = require('path');

module.exports = merge(common, {
    name: 'server',
    target: 'node',
    entry: './src/server-renderer.js',
    externals: [nodeExternals()],
    plugins: [
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false
        })
    ],
    module: {
        rules: [
            { test: /\.(scss|css)$/, loader: "ignore-loader" }
        ]
    },
});

