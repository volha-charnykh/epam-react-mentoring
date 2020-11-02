const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',

    output: {
        filename: 'js/[name].js',
        path: path.resolve('./build'),
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                include: /src/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                include: /src/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '/'
                }
            }
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/img/favicon.png' },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css",
            chunkFilename: '[name].css'
        }),
    ]
};
