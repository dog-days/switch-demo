# Switch Demo

react-boilerplate-scripts切换demo命令工具。

### 安装

```shell
npm i -g switch-demo
```

### 配置

这个命令只提供了pacakge.json配置方案，如下：

```json
{
  "name": "switch-demo",
  "switch-demo": {
    "demoDir": "demo"
  },
}
```

修改默认的demo夹位置（相对于根目录），可修改`swtch-demo`字段中的`demoDir`字段，默认值为·`demo`。

`react-boilerplate-app-scripts`字段是这个工具会修改的地方

### 使用

假设package.json的配置为：

```json
{
  "name": "switch-demo",
  "react-boilerplate-app-scripts": {
    "appSrcPath": "demo/demo-default/src",
    "appPublicPath": "demo/demo-default/public"
  },
  "switch-demo": {
    "demoDir": "demo"
  },
}
```

然后运行：

```sh
switch-demo demo-test
```

运行上面的命令后，上面的pacakge.json，就变成了

```json
{
  "name": "switch-demo",
  "react-boilerplate-app-scripts": {
    "appSrcPath": "demo/demo-test/src",
    "appPublicPath": "demo/demo-test/public"
  },
  "switch-demo": {
    "demoDir": "demo"
  },
}
```

