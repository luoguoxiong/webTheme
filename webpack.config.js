const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = cssName => {
  return {
    entry: "./css/index.js",
    mode: "production",
    output: {
      path: path.resolve(__dirname, "./build")
    },
    module: {
      rules: [
        {
          test: /\.(css|less)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${cssName}.css`
      })
    ]
  };
};
