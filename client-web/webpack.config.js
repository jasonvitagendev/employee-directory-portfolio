const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("node:path");
const webpack = require("webpack");

module.exports = (env) => {
    return {
        mode: env.mode,
        entry: {
            main: "./src/index.tsx",
        },
        output: {
            clean: true,
            filename: "[name].[contenthash].js",
            path: path.resolve(__dirname, "dist"),
        },
        module: {
            rules: [
                {
                    test: /.tsx?$/,
                    loader: "ts-loader",
                },
                {
                    test: /.(c|sa)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [["autoprefixer", {}]],
                                },
                            },
                        },
                        "sass-loader",
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            plugins: [new TsconfigPathsPlugin()],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename:
                    env.mode === "development"
                        ? "[name].css"
                        : "[name].[contenthash].css",
            }),
            new HTMLWebpackPlugin({
                template: "./src/templates/index.html",
            }),
            new webpack.EnvironmentPlugin(["GRAPHQL_API"]),
        ],
        devtool: env.mode === "development" ? "eval-source-map" : false,
    };
};
