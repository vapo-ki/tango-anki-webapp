const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            favicon: './src/favicon.ico'
        })
    ],
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 8196
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        allowedHosts: 'all'
    }
}