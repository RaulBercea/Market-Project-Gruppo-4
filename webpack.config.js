const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'production',
    entry: './src/scripts/main.mjs',
    output: { filename: '[name].bundle.js', path: path.resolve(__dirname, 'dist') },
    devServer: { static: { directory: path.join(__dirname, 'static'), publicPath: './static' } },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new MiniCssExtractPlugin()
    ], module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [[
                            '@babel/preset-env',
                            {
                                targets: { edge: '80', firefox: '74', chrome: '80', safari: '13', ie: '11' },
                                useBuiltIns: 'usage',
                                corejs: '3.6.4'
                            }
                        ]]
                    }
                }
            }
        ]
    }
};