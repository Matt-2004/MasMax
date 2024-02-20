module.exports = {
  // ...
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
