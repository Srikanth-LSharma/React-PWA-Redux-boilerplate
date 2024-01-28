const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const { EsbuildPlugin } = require('esbuild-loader');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    mode: process.env.REACT_APP_WEBPACK_MODE,
    performance: {
        hints: false
    },
    entry: {
        Bundle: path.resolve(__dirname, '..', './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '..', 'build'),
        filename: '[name].[chunkhash].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimize: true,
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ['optipng', { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                'svgo',
                                {
                                    plugins: [
                                        {
                                            name: 'preset-default',
                                            params: {
                                                overrides: {
                                                    removeViewBox: false,
                                                    addAttributesToSVGElement: {
                                                        params: {
                                                            attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }]
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        ]
                    }
                }
            }),
            new EsbuildPlugin({
                target: 'es2015',
                css: true
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(jpe?go|pngo|gifo|svgo)$/i,
                type: 'asset'
            },
            // Use esbuild to compile JavaScript & TypeScript
            {
                // Match `.js`, `.jsx`, `.ts` or `.tsx` files
                test: /\.[jt]sx?$/,
                exclude: path.resolve(__dirname, '..', 'node_modules'),
                loader: 'esbuild-loader',
                options: {
                    // Treat `.js` files as `.jsx` files
                    loader: 'jsx',
                    // JavaScript version to compile to
                    target: 'es2015'
                }
            },
            {
                test: /\.(scss|css)$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'esbuild-loader',
                        options: {
                            minify: true
                        }
                    }
                ]
            },
            // {
            //     test: /\.(scss|css)$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 importLoaders: 2,
            //                 sourceMap: false,
            //                 modules: false
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.(png|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { name: '[name].[ext]' }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.config$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: '[name].[ext]' }
                    }
                ]
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                use: [
                    {
                        loader: 'json-loader',
                        options: { name: '[name].[ext]' }
                    }
                ]
            },
            {
                test: /\.ya?ml$/,
                use: 'yaml-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/assets/root/favicon.ico', to: '' },
                { from: './src/assets/root/logo192.png', to: '' },
                { from: './src/assets/root/logo512.png', to: '' },
                { from: './src/manifest.json', to: '' }
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
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'public/index.html'),
            favicon: path.resolve(__dirname, '..', './src/assets/root/favicon.ico')
        }),
        // new MiniCssExtractPlugin({
        //     filename: 'styles.[contenthash].css',
        //     chunkFilename: '[id].css'
        // }),
        new Dotenv({
            path: path.resolve(__dirname, '..', '.env.development')
        })
        // ,
        // new WorkboxPlugin.GenerateSW({
        //     // these options encourage the ServiceWorkers to get in there fast
        //     // and not allow any straggling "old" SWs to hang around
        //     clientsClaim: true,
        //     skipWaiting: true
        // }),

    ]
};