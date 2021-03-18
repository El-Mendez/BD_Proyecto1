const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: "./app/src/index.js",
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/src/index.html"
        })
    ],


    module: {
        rules: [
            {
                test: /\.(svg|png|jpg|gif)$/i,
                use: {
                    loader: "file-loader",
                    options: {
                        esModule: false,
                        name: "[name].[ext]",
                        outputPath: "imgs",
                    }
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules)/,
            },
        ]
    },

}