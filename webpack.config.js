const { resolve } = require("path");


// 把html 分离出
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 把css文件分离出来
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// PWA：渐进式网络开发应用程序（离线可访问）
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

// 定义node.js 环境变量， 决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

// css 公用loader配置
const commonCssLoader = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: '..'
        }
    },
    'css-loader',
    {
        // 兼容css
        loader: 'postcss-loader',
    },
]

// 配置项

module.exports = {
    entry: ['./src/js/index.js'],
    output: {
        filename: 'js/[name].[contenthash:5].js',
        path: resolve(__dirname, 'build'),
        clean: true
    },
    module: {
        rules: [
            {
                //    oneOf 表示里面的loader 只会匹配一个
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            ...commonCssLoader
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            ...commonCssLoader,
                            'less-loader'
                        ]
                    },
                    {
                        test: /\.(jpg|png|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[contenthash:5].[ext]',
                            esModule: false,
                            outputPath: 'imgs'
                        }
                    },
                    // html 中与css 引入相同的文件会重复
                    {
                        test: /\.html$/,
                        loader: 'html-loader',
                    },
                {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: [
                                    '@babel/plugin-transform-runtime'
                                  ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 分离html文件
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            title: 'Development'
        }),
        // 分离css 文件
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:5].css'
        }),
        // 文件缓存
        new WorkboxWebpackPlugin.GenerateSW({
            // 帮助serverWork快速启动
            clientsClaim: true,
            // 删除旧的serverWork 文件
            skipWaiting: true
        })
    ],
    mode: 'production',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        hot: true,
        open: true
    },
    // 忽略该资源，不进行打包
    externals: {
        jquery: 'jquery'
    }
}