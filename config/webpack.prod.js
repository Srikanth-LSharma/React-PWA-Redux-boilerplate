const { merge } = require('webpack-merge');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const commonConfig = require('./webpack.common');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const { EsbuildPlugin } = require('esbuild-loader');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(commonConfig, {
    mode: 'production',
    performance: {
        hints: false
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        compress: true,
        historyApiFallback: true,
        contentBase: './',
        hot: true
    },
    entry: {
        Bundle: path.resolve(__dirname, '..', './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '..', 'build'),
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/assets/root/favicon.ico', to: '' },
                { from: './src/assets/root/logo192.png', to: '' },
                { from: './src/assets/root/logo512.png', to: '' },
                { from: './src/manifest.json', to: '' },
                { from: './public/web.config', to: '' }
            ]
        }),
        new InjectManifest({
            swSrc: './src/src-sw.js',
            swDest: 'sw.js'
        }),
        new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
});