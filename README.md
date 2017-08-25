# React Router Controller CLI

react-router-controller命令工具。

### 安装

```shell
npm i -g react-router-controller
```

### 使用

目前只有i18n的命令，用来导出默认的语言excel，用作翻译使用。

#### 配置

这个命令只提供了pacakge.json配置方案，如下：

```json
{
  "name": "react-router-controller-cli",
  "react-router-controller": {
    "language": "zh_CN",
    "appSrcPath": "demo/src",
    "appLocalePath": "demo/src/i18n"
  }
}
```

需要在package.json文件的`react-router-controller`字段下做配置（为了做一些兼容，这个特地的支持了另外一个字段`react-boilerplate-app-scripts`，如果没有`react-router-controller`字段就读取这个字段）：

- language

  默认是`zh_CN`。

- appSrcPath

  文件读取目录，`create-i18n-excel`命令读取目录，默认是当前npm项目根目录src文件夹。

- appLocalePath

  i18n目录设置，i18n目录用于i18n文件生成的excel和代码使的语言列表文件存放。

#### create-i18n-excel

```shell
react-router-controller-cli create-i18n-excel
```

这个命令会读取，设定文件夹（**默认是npm项目根目录的src文件夹**，项目代码目录，不是i18n目录）的所有文件，提取所有符合`t('xx')或t("xx")`函数中的参数值到excel文件中，如下面代码：

```jsx
import React from 'react';
class AboutView extends React.Component {
  render() {
    console.debug('about页面');
    const { i18n: { t } } = this.props;
    return (
      <div>
        {t('关于页面')}
      </div>
    );
  }
}
export default AboutView;
```

上面的`{t('关于页面')}`中的`关于页面`文案就会被提取。

excel文件会保存在设定`i18n`文件夹目下的`./excel`文件夹中，excel文件夹包括三个excel文件：

- multi-language(file-position).xlsx

  这个文件是包括所有文件位置的（文案会有重复，不去重），可以用来查找文件，没其他用处，可删除。

- multi-language(no repetition).xlsx

  这个文件是去重后的文案列表，这个文件会用于对比录的，不要去修改这个文件。首次生成大致的表格如下：

  | zh_CN |
  | ----- |
  | 关于    |
  | 关于页面  |
  | 主页    |
  | 主页页面  |

- multi-language(translated).xlsx

  这个文件是提供给翻译者使用的，未翻译前跟`multi-language(no repetition).xlsx`一样。翻译后大致如下：

  | zh_CN | en_US      | it_IT                     |
  | ----- | ---------- | ------------------------- |
  | 关于    | about      | su                        |
  | 关于页面  | About page | Informazioni sulla pagina |
  | 主页    | home       | home                      |
  | 主页页面  | Home page  | Home page                 |

  这个文件会用来后续生成配置的i18n js文件，表格的第一行是文件命名，如zh_CN.js。

  >如果翻译者已经翻译好并提供了这个文件，但是发现有些文案在代码中已经修改了，怎么办？
  >
  >没关系，还是按照正常命令运行，修改的文案会放这个excel文件最后面（这些文案是没有翻译的一眼就知道了）。
  >
  >而已经不使用的文案则会被删掉。

#### create-i18n-list

```sh
create-react-controller-cli create-i18n-list
```

这个命令会读取`multi-language(translated).xlsx`并在设定的`i18n`文件夹目录下生成对应的i18n文件。