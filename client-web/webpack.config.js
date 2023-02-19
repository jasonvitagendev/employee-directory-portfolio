const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    return {
        mode: env.mode,
        entry: {
            main: "./src/index.tsx",
        },
        module: {
            rules: [
                {
                    test: /.ts|x$/,
                    loader: "ts-loader",
                },
            ],
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            plugins: [new TsconfigPathsPlugin()],
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: "./src/templates/index.html",
            }),
        ],
        devtool: env.mode === "development" ? "eval-source-map" : false,
    };
};
