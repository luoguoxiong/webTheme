const koa = require("koa");
const webpack = require("webpack");
const staticCache = require("koa-static-cache");
const cssConfig = require("./webpack.config");
const path = require("path");
const fs = require("fs");
const open = require("open");
const app = new koa();

const buildCss = (bg, color) => {
  return new Promise(res => {
    fs.writeFile(
      path.resolve(__dirname, "./css/var.less"),
      `@divBg: ${bg};\n@divColor: ${color};`,
      err => {
        if (err) {
          res(false);
        } else {
          webpack(cssConfig, () => {
            const file = fs.readFileSync(
              path.resolve(__dirname, "./build/index.css"),
              "utf8"
            );
            res(file);
          });
        }
      }
    );
  });
};

app.use(
  staticCache(path.resolve(__dirname, "./build"), {
    maxAge: 0
  })
);
app.use(async (ctx, next) => {
  if (!ctx.path.includes("css")) {
    const { bg, color } = ctx.query;
    await buildCss(bg, color);
    open("http://localhost:3000/index.html");
    ctx.body = { cdn: "http://localhost:3000/index.css" };
  }
});
app.listen(3000, function() {
  console.log("server is run in 3000");
});
