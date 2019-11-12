module.epxorts = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/bundle.js",
    },
    // webpack의 출력을 디버깅할 소스맵을 사용
    devtool: "source-map",
    resolve: {
        // 확인 가능한 확장자로 .ts 및 .tsx
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // .tsx? 파일은 awesome-typescript-loader에 의해 처리
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ],
        preLoaders: [
            // .js 파일의 모든 출력에는 source-map-laoder로 다시 처리된 소스 맵이 존재
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};
    
    
