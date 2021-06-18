---
title: Advanced entry
sort: 25
contributors:
  - EugeneHlushko
translators:
  - dkstyle
---

## Multiple file types per entry

JavaScript의 스타일에 `import`를 사용하지 않는 애플리케이션(싱글 페이지 애플리케이션 혹은 다른 이유로인해)에서 CSS 및 JavaScript와 기타 파일에 대해 각각 별도의 번들을 얻기 위해 [엔트리에](/configuration/entry-context/#entry) 값 배열을 사용하여 다른 유형의 파일을 제공할 수 있습니다.

예를 들어 보겠습니다. 홈과 계정을 위한 두 가지 페이지 유형이 있는 PHP 애플리케이션이 있습니다. 홈 페이지는 다른 레이아웃을 갖고 있고, 나머지 애플리케이션(계정 페이지)과는 공유할 수 없는 JavaScript가 있습니다. 홈 페이지를 위해 애플리케이션 파일에서 `home.js`와 `home.css`를 출력하고, 계정 페이지를 위해 `account.js`와 `account.css`를 출력하려고 합니다.

**home.js**

```javascript
console.log('home page type');
```

**home.scss**

```scss
// 홈 페이지의 개별 스타일
```

**account.js**

```javascript
console.log('account page type');
```

**account.scss**

```scss
// 계정 페이지의 개별 스타일
```

CSS를 위한 `프로덕션` 모드에서 [`MiniCssExtractPlugin`](/plugins/mini-css-extract-plugin/)을 모범사례로 사용하겠습니다.

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    home: ['./home.js', './home.scss'],
    account: ['./account.js', './account.scss'],
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // 개발환경에서는 style-loader로 대체 합니다
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
```

위의 구성으로 webpack을 실행하면 다른 출력경로를 지정하지 않았기 때문에 `./dist`로 출력됩니다. `./dist` 디렉터리는 이제 4개의 파일이 포함됩니다.

- home.js
- home.css
- account.js
- account.css
