---
title: webpack
sort: -1
---

<div class="index-sub-title">코드를 작성해 보세요</div>

<div class="splash__wrap">
<div class="splash__left">

**src/index.js**

```js
import bar from './bar.js';

bar();
```

</div>
<div class="splash__right">

**src/bar.js**

```js
export default function bar() {
  //
}
```

</div>
</div>

<div class="index-sub-title">번들해 보세요</div>

<div class="splash__wrap">
<div class="splash__left">

**[설정 없이도](https://youtu.be/3Nv9muOkb6k?t=21293)** 번들할 수 있고 사용자 지정 **webpack.config.js를** 제공할 수도 있어요.

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

</div>
<div class="splash__right">

**page.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    ...
  </head>
  <body>
    ...
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

</div>
</div>

그다음 커멘드 라인에서 `webpack` 명령어를 실행해 `bundle.js`를 생성하세요.

<div class="index-sub-title">멋지지 않나요? 좀 더 알아보세요!</div>

**가이드를** 따라 빠르게 **[시작해](/guides/getting-started)** 보거나, **[Concepts](/concepts)에서** webpack의 핵심 개념을 자세히 알아보세요.
