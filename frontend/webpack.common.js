const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: "./app/src/index.js",
        dashboard: "/app/src/dashboard.js"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/src/index.html",
            filename: "index.html",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            template: "./app/src/dashboard.html",
            filename: "dashboard.html",
            chunks: ["dashboard"]
        }),
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