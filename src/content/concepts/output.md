---
title: Output
sort: 2
contributors:
  - TheLarkInn
  - chyipin
  - rouzbeh84
  - byzyk
  - EugeneHlushko
translators:
  - limong
---

`output` 옵션을 설정하여 컴파일된 파일을 디스크에 쓰는 방법을 webpack에 알려줍니다. 여러 `진입`점이 있을 수 있지만 하나의 `출력` 설정만 지정된다는 점에 주의하세요.

## Usage

webpack 설정의 `output` 프로퍼티는 최소한 객체로 값을 설정해야 하며, 출력 파일에 사용할 [`output.filename`](/configuration/output/#outputfilename)이 제공되어야 합니다.

**webpack.config.js**

```javascript
module.exports = {
  output: {
    filename: 'bundle.js',
  },
};
```

이 설정은 단일 `bundle.js` 파일을 `dist` 디렉터리에 출력합니다.

## Multiple Entry Points

설정에서 하나 이상의 "청크"를 생성하면(다중 엔트리 포인트나 CommonsChunkPlugin과 같은 플러그인을 사용하는 경우) [substitution](/configuration/output/#outputfilename)을 사용하여 파일이 고유한 이름을 갖도록 해야 합니다.

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};

// writes to disk: ./dist/app.js, ./dist/search.js
```

## Advanced

다음은 애셋에서 CDN과 해시를 사용한 조금 더 복잡한 예제입니다.

**config.js**

```javascript
module.exports = {
  //...
  output: {
    path: '/home/proj/cdn/assets/[fullhash]',
    publicPath: 'https://cdn.example.com/assets/[fullhash]/',
  },
};
```

출력 파일의 최종 `publicPath`를 컴파일 시점에 알 수 없는 경우, 공백으로 남겨두고 런타임에 엔트리 포인트 파일의 `__webpack_public_path__`를 통해 동적으로 설정할 수 있습니다.

```javascript
__webpack_public_path__ = myRuntimePublicPath;

// rest of your application entry
```
