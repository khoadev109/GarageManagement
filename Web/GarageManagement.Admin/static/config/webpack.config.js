import * as path from "path";
import * as webpack from "webpack";
const projectRootPath = path.resolve(__dirname, "../");
const sourcePath = path.resolve(projectRootPath, "./app");
const assetsPath = path.resolve(projectRootPath, "./dist/static");
const config = {
    context: path.resolve(__dirname, ".."),
    entry: [
        "webpack-dev-server/client?http://localhost:3000",
        // "webpack-dev-server/client?http://120.72.98.63:3000",
        "webpack/hot/only-dev-server",
        "react-hot-loader/patch",
        path.join(sourcePath, "index.tsx")
    ],
    output: {
        path: assetsPath,
        filename: "bundle.js",
        publicPath: "/dist/static"
    },
    devtool: "#source-map",
    devServer: {
        inline: true,
        port: 3000
    },
    resolve: {
        extensions: ["*", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                include: sourcePath,
                use: [
                    {
                        loader: "react-hot-loader/webpack"
                    },
                    {
                        loader: "awesome-typescript-loader"
                    }
                ]
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
export default config;
//# sourceMappingURL=webpack.config.js.map