const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/index[contentHash].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets' },
            ],
            options: {
                concurrency: 100,
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|woff(2)?|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
        ]
    }
});