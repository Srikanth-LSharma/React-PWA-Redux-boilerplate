// craco.config.js
const CracoEsbuildPlugin = require('craco-esbuild');
const path = require('path');

console.log("Craco");

module.exports = {
    mode:'development',
    devServer: {
        port: 8001
    },
    plugins: [
        {
            plugin: CracoEsbuildPlugin,
            options: {
                esbuildLoaderOptions: {
                    // Optional. Defaults to auto-detect loader.
                    loader: 'jsx', // Set the value to 'tsx' if you use typescript
                    target: 'es2015',
                    entryPoints: {
                        Bundle: path.resolve(__dirname, '..', './src/index.js')
                    }
                },
                esbuildMinimizerOptions: {
                    // Optional. Defaults to:
                    target: 'es2015',
                    css: true, // if true, OptimizeCssAssetsWebpackPlugin will also be replaced by esbuild.
                    minify: true,  // Enable minification
                    bundle: true,  // Enable bundling
                    outfile: path.resolve(__dirname, '..', 'build', '[name].[chunkhash].js') // Specify the output file
                },
                skipEsbuildJest: false, // Optional. Set to true if you want to use babel for jest tests,
                esbuildJestOptions: {
                    loaders: {
                        '.ts': 'ts',
                        '.tsx': 'tsx'
                    }
                }
            }
        }
    ]
};