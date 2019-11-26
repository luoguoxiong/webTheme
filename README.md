# webTheme

> 开发需求：不同域名下的 web,可以自定义主题样式

> 解决方案：node+webpack+less 打包成对应的主题样式

> gitbub: [webTheme](<[https://github.com/Peroluo/webTheme](https://github.com/Peroluo/webTheme)>)

> 解决思路：
>
> 1. node 封装接口接受主题参数，修改对应的 less 变量文件，机器实现打包生成对应的 css 文件，然后上传到对应的 cdn 上，返回对应的 css 所对应的 cdn 地址。
> 2. 在客户端，根据域名，动态匹配对应的 css 文件，挂载到 link 标签上。

```shell
  cnpm install
  node server.js
```

  浏览器打开： http://localhost:3000/?color=white&bg=blue

