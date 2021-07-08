---
title: HtmlWebpackPlugin
group: Community
contributors:
  - ampedandwired
  - simon04
  - Sibiraj-S
  - EugeneHlushko
translators:
  - 1ilsang
---

[`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin)은 webpack 번들을 제공하는 HTML 파일 생성을 단순화합니다. 이 플러그인은 매번 컴파일에 변경되는 해시로 된 파일 이름을 가진 webpack 번들에 특히 유용합니다. 플러그인이 HTML 파일을 생성하도록 하거나 [lodash 템플릿](https://lodash.com/docs#template)을 사용하여 나만의 템플릿을 제공하거나 나만의 [로더](/loaders)를 사용할 수 있습니다.

## Installation

```bash
npm install --save-dev html-webpack-plugin
```

## Basic Usage

플러그인은 `script` 태그를 사용하여 body에 모든 webpack 번들을 포함하는 HTML5 파일을 생성합니다.
적용은 아래와 같이 webpack에 플러그인을 추가하기만 하면 됩니다.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

그러면 아래의 내용을 포함하는 `dist/index.html` 파일이 생성됩니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

Webpack 엔트리 포인트가 여러 개인 경우, 생성된 HTML에 모두 `<script>` 태그로 포함됩니다.

만약 webpack 출력에 CSS 애셋이 있다면([MiniCssExtractPlugin](/plugins/mini-css-extract-plugin/)으로 추출된 CSS 와 같이) 이들은 생성된 HTML 파일의 `<head>` 요소 안에 `<link>` 태그로 포함됩니다.

## Configuration

모든 설정 옵션은 [plugin 문서](https://github.com/jantimon/html-webpack-plugin#options)를 참고하세요.

## Third party addons

플러그인은 추가 기능을 지원합니다. 목록은 [해당 문서](https://github.com/jantimon/html-webpack-plugin#plugins)를 참고하세요.
