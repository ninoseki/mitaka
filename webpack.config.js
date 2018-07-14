const webpack = require("webpack");
const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        background: path.join(__dirname, 'src/background.ts'),
        content: path.join(__dirname, 'src/content.ts'),
        options: path.join(__dirname, 'src/options.ts'),
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist/js'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'all',
        }
    }
};
