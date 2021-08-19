---
title: Resolvers
group: Plugins
sort: 15
contributors:
  - EugeneHlushko
  - chenxsan
translators:
  - dkstyle
---

리졸버는 `enhanced-resolve` 패키지를 사용하여 생성됩니다.
`Resolver` 클래스는 `tapable` 클래스를 확장하고 `tapable`을 사용하여 몇 가지 hook을 제공합니다.
`enhanced-resolve` 패키지를 사용하여 새 리졸버를 직접 만들 수 있습니다.
하지만 모든 [`컴파일러` 인스턴스](/api/node/#compiler-instance)에는 탭 할 수 있는 몇 가지 리졸버 인스턴스가 있습니다.

계속 읽기 전에
[`enhanced-resolve`](https://github.com/webpack/enhanced-resolve) 및 [`tapable`](/api/plugins/#tapable) 문서를 확인하세요.

## Types

`compiler` 클래스에서 사용할 수 있는 내장 리졸버에는 세 가지 유형이 있습니다.

- `normal`: 절대 또는 상대 경로를 통해 모듈을 해석합니다.
- `context`: 주어진 컨텍스트 내에서 모듈을 해석합니다.
- `loader`: webpack [로더](/loaders)를 해석합니다.

필요에 따라 `컴파일러`에서 사용하는 내장 리졸버 중 하나를,
플러그인을 통해 사용자 지정할 수 있습니다.

```js
compiler.resolverFactory.hooks.resolver
  .for('[type]')
  .tap('name', (resolver) => {
    // 이제 resolver.hooks를 활용할 수 있습니다.
    resolver.hooks.result.tap('MyPlugin', (result) => {
      return result;
    });
  });
```

여기에서 `[type]`은 위에서 언급한 세 가지 리졸버 중 하나입니다.

hook의 전체 목록과 설명은 [`enhanced-resolve` 문서](https://github.com/webpack/enhanced-resolve)를 참고하세요.

## Configuration Options

위에서 언급한 리졸버는 [`resolve`](/configuration/resolve/) 또는 [`resolveLoader`](/configuration/resolve/#resolveloader) 옵션이 있는
설정 파일을 통해 사용자 지정할 수도 있습니다.
이러한 옵션을 통해 사용자는 resolve `플러그인`을 비롯한 다양한 옵션을 통해 해석 동작을 변경할 수 있습니다.

예를 들면 [`DirectoryNamedPlugin`](https://github.com/shaketbaby/directory-named-webpack-plugin)과 같은 리졸버 플러그인은 [`플러그인` 설정 옵션](/configuration/plugins/#plugins)에서 사용하는 대신 `resolve.plugins`에 직접 포함될 수 있습니다.

T> `resolve` 설정은 `normal` 및 `context` 리졸버에 영향을 미치지만 `resolveLoader`는 `loader` 리졸버를 수정하는 데 사용됩니다.
