const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const { EsbuildPlugin } = require('esbuild-loader');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(commonConfig, {
    mode: 'development',
    performance: {
        hints: false
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        compress: true
    },
    entry: {
        Bundle: path.resolve(__dirname, '..', './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[chunkhash].js'
    }
});