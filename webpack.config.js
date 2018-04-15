const webpack = require("webpack");
const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        options: path.join(__dirname, 'src/options.ts'),
        background: path.join(__dirname, 'src/background.ts')
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].js'
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
