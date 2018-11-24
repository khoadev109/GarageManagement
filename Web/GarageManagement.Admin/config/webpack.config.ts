import * as path from "path";
import * as webpack from "webpack";

const projectRootPath = path.resolve(__dirname, "../");
const sourcePath = path.resolve(projectRootPath, "./app");
const assetsPath = path.resolve(projectRootPath, "./dist/static");

let localEntryParameters = [
    "webpack-dev-server/client?http://localhost:3000", 
    "webpack/hot/only-dev-server"
];

let entryParameters = ["react-hot-loader/patch", path.join(sourcePath, "index.tsx")];
//entryParameters = entryParameters.concat(localEntryParameters);

const config: webpack.Configuration = {
    context: path.resolve(__dirname, ".."),
    entry: entryParameters,
    output: {
        path: assetsPath,
        filename: "bundle.js",
        publicPath: "/dist/static"
    },
    // watch: true,
    devtool: "#source-map",
    devServer: {
        historyApiFallback: true,
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
