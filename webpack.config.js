const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');


const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = path.join(__dirname, 'node_modules');
const dirDist = path.join(__dirname, 'dist');
const dirSrc = path.join(__dirname, 'src');

const htmlMinifyConfig = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
};


module.exports = {
    entry: path.join(dirSrc, 'app', 'app'),
    resolve: {
        modules: [
            dirNode,
            dirSrc
        ]
    },
    output: {
        pathinfo: IS_DEV,
        path: dirDist,
        filename: '[name].[chunkhash].js'
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 0
        },
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                mangle: false,
            },
        })],
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: path.join(dirSrc, 'index.html'),
            minify: IS_DEV ? false : htmlMinifyConfig
        }),

    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                ]
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
                            ],
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [ path.join(dirSrc, 'scss')]
                        }
                    }
                ]
            }
        ]
    }
};