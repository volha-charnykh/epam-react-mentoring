const {merge} = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const common = require('../webpack.common.config.js');

module.exports = merge(common, {
    name: 'server',
    target: 'node',
    entry: './src/server-renderer.js',
    externals: [nodeExternals()],
    output: {
        filename: 'js/server-renderer.js',
        libraryTarget: 'commonjs2',
    },
});

