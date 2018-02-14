"use strict";

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let entryPoint = './src/app.js';
let cssAssets = './src/assets/index.js';
let materializeJs = './node_modules/materialize-css/dist/js/materialize.min.js';
let outputPath = path.resolve(__dirname, './public');
let fileName = 'app.js';

let plugins = [];

// Get the environment variable defined in the command (see package.json)
let env = process.env.WEBPACK_ENV;

// When compiling for production we want the app to be uglified.
if (env === 'production') {
    let UglifyPlugin = webpack.optimize.UglifyJsPlugin;

    plugins.push(new UglifyPlugin({minimize: true}));

    // We also add it as a global, the Vue lib needs it to determine if Dev tool should be active or not.
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));
    // Change file name extension to min.js
    fileName = fileName.replace(/js/g, 'min.js');
}

// Main webpack config
module.exports = {
    entry: {
        app: [ entryPoint, materializeJs , cssAssets]
    },
    output: {
        path: outputPath,
        filename: fileName
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'] // Transpile the ES6 to es2015 standard
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            { // sass / scss loader for webpack
                test: /\.(sass|scss|css)$/,
                use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 5000,
                            name: 'assets/images/[hash].[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            name: 'assets/fonts/[hash].[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',  // Resolving the vue var for standalone build
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src', 'index.html'),
            hash: true
        }),
        new ExtractTextPlugin({ // define where to save the file
            filename: 'main.bundle.css',
            allChunks: true,
        }),
    ],
    devServer: {
        port: 8085,
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        historyApiFallback: true,
        stats: {
            cached: false,
            colors: true
        }
    },
};