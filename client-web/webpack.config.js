const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("node:path");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env) => {
    return {
        mode: env.mode,
        entry: {
            employee_directory: "./src/employee-directory/index.tsx",
            employee_profile: "./src/employee-profile/index.tsx",
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
                {
                    test: /.mp3$/,
                    type: "asset/resource",
                },
            ],
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            plugins: [new TsconfigPathsPlugin()],
        },
        plugins: [
            new ESLintPlugin({
                extensions: ["ts", "tsx"],
                emitWarning: false,
            }),
            new MiniCssExtractPlugin({
                filename:
                    env.mode === "development"
                        ? "[name].css"
                        : "[name].[contenthash].css",
            }),
            new HTMLWebpackPlugin({
                template: "./src/employee-directory/templates/index.html",
                chunks: ["employee_directory"],
                filename: "index.html",
            }),
            new HTMLWebpackPlugin({
                template: "./src/employee-profile/templates/index.html",
                chunks: ["employee_profile"],
                filename: "employee-profile.html",
            }),
            new webpack.EnvironmentPlugin(["GRAPHQL_API", "SIP_SWITCH_HOST"]),
        ],
        devtool: env.mode === "development" ? "eval-source-map" : false,
    };
};
