const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    return {
        mode: env.mode,
        entry: {
            main: "./src/index.tsx",
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
            new MiniCssExtractPlugin(),
            new HTMLWebpackPlugin({
                template: "./src/templates/index.html",
            }),
        ],
        devtool: env.mode === "development" ? "eval-source-map" : false,
    };
};
