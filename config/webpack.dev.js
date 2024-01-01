export default merge.smart(commonConfig, {
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