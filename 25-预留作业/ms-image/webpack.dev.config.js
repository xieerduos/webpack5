const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'http://localhost:9002/'
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 9002,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: ['file-loader']
            },

            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                path.join(process.cwd(), 'build/**/*')
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'ms-image',
            // filename: "suibianqi/content.html",
            meta: {
                description: 'ms-image'
            }
        }),
        new ModuleFederationPlugin({
            name: 'MsButtonApp',
            remotes: {
                MsButtonApp: 'MsButtonApp@http://localhost:9001/remoteEntry.js'
            }
        }),
        // 一定要填写：output.publicPath，否则出不来效果
        new ModuleFederationPlugin({
            name: 'MsImageApp',
            filename: 'remoteEntry.js', // http://localhost:9002/remoteEntry.js
            exposes: {
                './MsImage': './src/components/ms-image/ms-image.js'
            }
        })
    ]
};
