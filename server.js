// http://ipin.oss.com/set?bg=orange&color=white&oem=oem4
// http://ipin.oem2.com/index.html
const koa = require("koa");
const webpack = require("webpack");
const staticCache = require("koa-static-cache");
const Router = require("koa-router");
const cssConfig = require("./webpack.config");
const path = require("path");
const fs = require("fs");

const app = new koa();
const router = new Router();

router.get("/set", async ctx => {
  const { bg, color, oem } = ctx.query;
  await buildCss(bg, color, oem);
  ctx.body = { cdn: `http://localhost:3000/${oem}.css` };
});
const buildCss = (bg, color, oem) => {
  return new Promise(res => {
    fs.writeFile(
      path.resolve(__dirname, "./css/var.less"),
      `@divBg: ${bg};\n@divColor: ${color};`,
      err => {
        if (err) {
          res(false);
        } else {
          const config = cssConfig(oem);
          webpack(config, (err, stats) => {
            if (err) {
              res(false);
            } else {
              res(true);
              console.log("done");
            }
          });
        }
      }
    );
  });
};
app.use(router.routes());
app.use(
  staticCache(path.resolve(__dirname, "./build"), {
    maxAge: 0
  })
);
app.listen(3000, function() {
  console.log("server is run in 3000");
});
