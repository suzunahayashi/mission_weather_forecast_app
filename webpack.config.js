const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    target: 'web',
    watch: true,
    entry: './src/js/index.js',
    output: {
        path: `${__dirname}/dist`,
        filename: 'js/index.js'
    },
    module: {
        rules: [
            //SASS 及び CSS 用のローダー
            {
                test: /\.(scss|sass|css)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        // CSSファイルを外だしにするプラグイン
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                preserveLineBreaks: true
            }
        })
    ],
    devServer: {
        static: 'dist'
    }
};
