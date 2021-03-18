const path = require('path')
const glob = require('glob')

const PurgecssPlugin = require('purgecss-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    target: 'web',
    entry: './src/index.js',
    output: {
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
    },
    devServer: {
        port: 8081,
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        watchContentBase: true,
        writeToDisk: true,
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,                
                use: [
                    // MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                type: 'asset/resource'
               /*  use: [
                    {
                        // loader: 'file-loader?emitFile=false&name=[path][name].[ext]'

                        loader: 'url-loader',
                        // options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            // name: '[path][name].[ext]?hash=[hash:20]',
                            // limit: 8192
                        // }
                    },
                ], */
            },
            {
                // Load all icons
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${path.join(__dirname, 'public')}/**/*`, {
                nodir: true,
            }),
        }),
    ],
}
