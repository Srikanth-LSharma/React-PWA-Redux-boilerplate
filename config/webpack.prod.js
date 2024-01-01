import commonConfig from './webpack.common';

const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const { EsbuildPlugin } = require('esbuild-loader');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');


export default merge.smart(commonConfig, {
    mode: 'production',
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