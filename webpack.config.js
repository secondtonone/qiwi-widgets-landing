const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: './main.js',

    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
        filename: 'bundle.[hash].js'
    },

    resolve: {
        extensions: ['.jsx', '.js', '.json', '.scss'],
        modules: [
            path.resolve(__dirname, "src/lib"),
            path.resolve(__dirname, "node_modules"),
            'node_modules'
        ],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },

    module: {
        rules: [

            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: 'css-loader', options: { importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => {
                                autoprefixer({ browsers: [ 'last 2 versions' ] });
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]

            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.(xml|html|txt|md)$/,
                use: 'raw-loader'
            },
            {
                test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5000
                    }
                }]
            }, {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: ([
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(ENV)
        }),
        new HtmlWebpackPlugin({
            template: './index.ejs',
            inject: 'body'
        })
    ]).concat(ENV==='production' ? [
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        })
    ] : [
        new webpack.HotModuleReplacementPlugin()
    ]),


    devtool: ENV==='production' ? 'source-map' : 'cheap-module-eval-source-map',

    devServer: {
        port: process.env.PORT || 9440,
        hot: true,
        publicPath: '/',
        contentBase: './src',
        historyApiFallback: true
    }
};