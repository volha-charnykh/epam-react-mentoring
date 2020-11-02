const {merge} = require('webpack-merge');
const common = require('../webpack.common.config.js');
const webpack = require('webpack');
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    name: 'client',
    target: 'web',
    mode: 'production',
    entry: [
        './src/client.js',
    ],
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new ReactLoadablePlugin({ filename: `./build/react-loadable.json` }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
});
