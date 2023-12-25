const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { EsbuildPlugin } = require('esbuild-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
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
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
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
                loader: 'esbuild-loader',
                options: {
                    // Treat `.js` files as `.jsx` files
                    loader: 'jsx',
                    // JavaScript version to compile to
                    target: 'es2015'
                }
            },
            {
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'esbuild-loader',
                        options: {
                            minify: true
                        }
                    }
                ],
                test: /\.css$/,
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
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
                test: /\.(config|ttf)$/,
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
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'public/index.html'),
            favicon: path.resolve(__dirname, '..', 'public/favicon.ico')
        }),
        new Dotenv({
            path: path.resolve(__dirname, '..', '.env.int')
        })
    ]
};