const path = require('path')
const glob = require('glob')

const PurgecssPlugin = require('purgecss-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash:5].js',
        assetModuleFilename: 'images/[name].[hash:5][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource'

                // use: [
                    /*  {
                        loader: 'url-loader',
                        options: {
                            name: 'assets/[name].[hash:5].[ext]',
                        },
                    }, */
                   /*  {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[hash:5].[ext]',
                        },
                    }, */
                // ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        }),
        new MiniCssExtractPlugin({
            // filename: '[name].css',
            // chunkFilename: '[id].css',
            filename: 'styles.[hash:5].css',
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${path.join(__dirname, 'public')}/**/*`, {
                nodir: true,
            }),
        }),
    ],
}
