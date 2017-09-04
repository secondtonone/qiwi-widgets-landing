const path = require('path');
const querystring = require('querystring');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const widgetTemps = require('./src/widgetTemps.json');

const tempsData = widgetTemps.map((temp) => {
    temp.params = querystring.stringify(temp.params);
    return temp;
});



module.exports = {
    devtool: 'eval-source-map',
    entry:{
        app: [
            './src/main.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /.js?$/,
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }
                ]
            }, {
                test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }, {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.ejs$/,
                use:[ 'ejs-loader?variable=data']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            inject: 'body',
            env:{
                Prod: false,
                widgets: tempsData
            }
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        port: 9380,
        historyApiFallback: true,
        publicPath: '/'
    }
};
