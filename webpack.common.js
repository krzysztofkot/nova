const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    devServer: {
        contentBase: './src',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
    ],
}