const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  plugins: [
    new PurgeCSSPlugin({
      paths: glob.sync("src/**/*", { nodir: true }),
    }),
    new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "[name].[hash].[ext]",
            },
          },
        ],
      },
    ],
  },
};
