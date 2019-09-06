const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = env => {
    return {
        entry: ['@babel/polyfill', './src/app/app.jsx'],
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'index_bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader', // creates style nodes from JS strings
                        'css-loader', // translates CSS into CommonJS
                        'sass-loader' // compiles Sass to CSS, using Node Sass by default
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-inline-loader'
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                title: 'Volunteer App',
                template: path.resolve(__dirname, './src/app/index.html')
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    BASE_API: JSON.stringify(
                        env.production !== 'false'
                            ? 'https://us-central1-larkspur-volunteer.cloudfunctions.net'
                            : 'http://localhost:8080/api'
                    )
                }
            })
        ],
        resolve: {
            extensions: ['.js', '.jsx']
        }
    };
};
