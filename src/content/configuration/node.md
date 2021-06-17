---
title: Node
sort: 17
contributors:
  - sokra
  - skipjack
  - oneforwonder
  - Rob--W
  - byzyk
  - EugeneHlushko
  - anikethsaha
  - chenxsan
translators:
  - choilim
---

다음의 Node.js 옵션은 특정 [Node.js globals](https://nodejs.org/docs/latest/api/globals.html)을 폴리필할지 mock할지 설정합니다.

이 기능은 webpack 내부 [`NodeStuffPlugin`](https://github.com/webpack/webpack/blob/master/lib/NodeStuffPlugin.js) 플러그인에서 제공합니다.

W> webpack5 부터, `node` 옵션에서 `global`, `__filename` 또는 `__dirname`만 설정할 수 있습니다. webpack5의 Node.js에서 `fs`를 폴리필할 방법을 찾고 있다면 [resolve.fallback](/configuration/resolve/#resolvefallback)를 참고하세요.

## `node`

`boolean: false` `object`

**webpack.config.js**

```javascript
module.exports = {
  //...
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
};
```

webpack 3.0.0부터, `node` 옵션을 `false`로 설정하여 `NodeStuffPlugin` 플러그인을 완전히 끌 수 있습니다.

## `node.global`

`boolean`

T> 전역변수가 필요한 모듈을 사용하는 경우 `global` 대신 `ProvidePlugin`을 사용하세요.

이 객체의 정확한 동작은 [Node.js 문서](https://nodejs.org/api/globals.html#globals_global)를 참고하세요.

옵션:

- `true`: 폴리필 제공.
- `false`: 아무것도 제공하지 않습니다. 이 객체를 예상하는 코드는 `ReferenceError`가 발생할 수 있습니다.

## `node.__filename`

`boolean` `string: 'mock' | 'eval-only'`

옵션:

- `true`: [`context` 옵션](/configuration/entry-context/#context)에 상대적인 **입력** 파일의 dirname.
- `false`: Webpack은 `__filename` 코드를 건드리지 않습니다. 즉 일반적인 Node.js `__filename` 동작이 있음을 의미합니다. Node.js 환경에서 실행할 때 **출력** 파일 이름입니다.
- `'mock'`: 고정값 `'/index.js'`.
- `'eval-only'`

## `node.__dirname`

`boolean` `string: 'mock' | 'eval-only'`

옵션:

- `true`: [`context` 옵션](/configuration/entry-context/#context)에 상대적인 **입력** 파일의 dirname.
- `false`: Webpack은 `__dirname` 코드를 건드리지 않습니다. 즉 일반적인 Node.js `__dirname` 동작이 있음을 의미합니다. Node.js 환경에서 실행할 때 **출력** 파일 이름입니다.
- `'mock'`: 고정값 `'/'`.
- `'eval-only'`
