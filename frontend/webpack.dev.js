const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");

module.exports = merge(common,{
    mode: "development",
    devtool: false,

    output: {
        filename: "[name]-bundle.js",
        Path: path.resolve(__dirname, "dist"),
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ]
    }

});
