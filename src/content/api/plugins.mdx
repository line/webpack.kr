---
title: Plugin API
group: Plugins
sort: 14
contributors:
  - thelarkinn
  - pksjce
  - e-cloud
  - byzyk
  - EugeneHlushko
  - wizardofhogwarts
translators:
  - Eunbin-Kim
---

플러그인은 webpack 생태계의 핵심 요소이며
커뮤니티에 webpack의 컴파일 프로세스를 활용할 수 있는 강력한 방법을 제공합니다.
플러그인은 각 컴파일 과정에서 발생하는 주요 이벤트에 [후킹](/api/compiler-hooks/#hooks) 할 수 있습니다.
모든 단계에서 플러그인은 `컴파일러`,
경우에 따라서는 현재 진행 중인 `컴파일`에 완전한 접근 권한을 가집니다.

T> 더 높은 수준의 플러그인 작성을 위해서는
[플러그인 작성하기](/contribute/writing-a-plugin)를 참고하세요.

먼저 webpack 플러그인 인터페이스의 근간을 제공하는
`tapable` 유틸리티에 대해 살펴보겠습니다.

## Tapable

이 작은 라이브러리는 webpack의 핵심 유틸리티이지만
유사한 플러그인 인터페이스를 제공하기 위해 다른 곳에서도 사용할 수 있습니다.
webpack의 많은 객체가 `Tapable` 클래스를 확장합니다.
`Tapable` 클래스가 제공하는 `tap`, `tapAsnyc`, `tapPromise` 메소드를 플러그인에서 사용하여
컴파일 과정에서 실행될 커스텀 빌드 단계를 삽입할 수 있습니다.

자세한 내용은 [문서](https://github.com/webpack/tapable)를 참고하세요.
세 가지 `tap` 메소드와
이를 제공하는 훅을 이해하는 것은 중요합니다.
`Tapable`을 확장한 객체(예: 컴파일러),
훅, 각 훅의 타입(예: `SyncHook`)에 대해 알게 될 것입니다.

## Plugin Types

사용된 훅과 적용된 `tap` 메소드에 따라
플러그인은 다양한 방식으로 작동할 수 있습니다.
작동 방식은 `Tapable`이 제공하는 [훅](https://github.com/webpack/tapable#tapable)과 밀접한 관련이 있습니다.
[컴파일러 훅](/api/compiler-hooks/#hooks)은 상황에 따라 `Tapable` 훅을 통해
어떤 `tap` 메소드가 사용 가능한지 알 수 있습니다.

따라서 어떤 이벤트에 `tap` 하느냐에 따라 플러그인은 다르게 동작할 수 있습니다.
예를 들어, `컴파일` 단계에 후킹 하는 경우
동기식 `tap` 메소드만 사용할 수 있습니다.

```js
compiler.hooks.compile.tap('MyPlugin', (params) => {
  console.log('Synchronously tapping the compile hook.');
});
```

그러나 `AsyncHook`을 활용하는 `run`의 경우
`tap`뿐만 아니라 `tapAsync` 또는 `tapPromise`도 사용할 수 있습니다.

```js
compiler.hooks.run.tapAsync(
  'MyPlugin',
  (source, target, routesList, callback) => {
    console.log('Asynchronously tapping the run hook.');
    callback();
  }
);

compiler.hooks.run.tapPromise('MyPlugin', (source, target, routesList) => {
  return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    console.log('Asynchronously tapping the run hook with a delay.');
  });
});

compiler.hooks.run.tapPromise(
  'MyPlugin',
  async (source, target, routesList) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Asynchronously tapping the run hook with a delay.');
  }
);
```

즉, `컴파일러`에 `후킹` 하는 다양한 방법이 있으며,
각 방법은 플러그인에 적합하다면 실행될 수 있습니다.

## Custom Hooks

다른 플러그인이 `tap` 할 수 있도록 컴파일에 새 훅을 추가하려면
`tapable`에서 필요한 훅 클래스를 `require` 하여 만들면 됩니다.

```js
const SyncHook = require('tapable').SyncHook;

if (compiler.hooks.myCustomHook) throw new Error('Already in use');
compiler.hooks.myCustomHook = new SyncHook(['a', 'b', 'c']);

// 언제 어디서든 훅을 발생시키고 싶을 때에 작성
compiler.hooks.myCustomHook.call(a, b, c);
```

다양한 훅 클래스와 동작 방식에 대해 자세히 알고 싶다면
`tapable` [문서](https://github.com/webpack/tapable)를 참고하세요.

## Reporting Progress

플러그인은 기본적으로 진행 상황을 stderr에 출력하는 `ProgressPlugin`을 통해 진행 상황을 확인할 수 있습니다. 진행률을 확인하려면 [webpack CLI](/api/cli/)를 실행할 때 `--progress` 인수를 전달하세요.

[`ProgressPlugin`](/plugins/progress-plugin/)의 `reportProgress` 함수에 다른 인수를 전달하여 메시지 출력을 커스텀 할 수 있습니다.

진행 상황을 확인하기 위해서는 `context: true` 옵션을 사용하여 훅에 `tap` 해야 합니다.

```js
compiler.hooks.emit.tapAsync(
  {
    name: 'MyPlugin',
    context: true,
  },
  (context, compiler, callback) => {
    const reportProgress = context && context.reportProgress;
    if (reportProgress) reportProgress(0.95, 'Starting work');
    setTimeout(() => {
      if (reportProgress) reportProgress(0.95, 'Done work');
      callback();
    }, 1000);
  }
);
```

`reportProgress` 함수는 다음과 같은 인수를 사용하여 호출할 수 있습니다.

```js
reportProgress(percentage, ...args);
```

- `percentage`: 이 인수는 사용되지 않습니다. 대신 [`ProgressPlugin`](/plugins/progress-plugin/)이 현재 훅을 기반으로 백분율을 계산합니다.
- `...args`: `ProgressPlugin` 핸들러로 전달되는 임의의 수의 문자열입니다.

컴파일러 및 컴파일 훅의 하위 집합만이 `reportProgress`를 지원합니다. 전체 목록은 [`ProgressPlugin`](/plugins/progress-plugin/#supported-hooks)를 참고하세요.

## Logging

로깅 API는 webpack 4.37 릴리스부터 사용할 수 있습니다. [`stats 설정`](/configuration/stats/#statslogging)에서 `logging`이 활성화된 경우 또는 `infrastructure logging`이 활성화된 경우 플러그인은 각 로거 형식(stats, infrastructure)으로 메시지를 로깅 할 수 있습니다.

- 플러그인은 로깅을 위해 `compilation.getLogger('PluginName')`를 사용하는 것이 좋습니다. 로그는 형식에 따라 포매팅 되어 Stats에 저장됩니다. 로그는 사용자가 필터링하고 내보낼 수 있습니다.
- 플러그인은 로깅을 위해 `compiler.getInfrastructureLogger('PluginName')`를 사용할 수 있습니다. `infrastructure` 로깅은 Stats에 저장되지 않기 때문에 형식이 지정되지 않습니다. 일반적으로 콘솔 / 대시보드 / GUI에 직접 기록됩니다. 사용자가 필터링 할 수 있습니다.
- 플러그인은 로깅 지원 여부를 확인하기 위해 특별한 폴백 로직 `compilation.getLogger ? compilation.getLogger('PluginName') : console`을 사용하여 `컴파일` 객체에서 `getLogger` 메소드를 지원하지 않는 이전 webpack 버전이 사용되는 경우에 대한 폴백을 제공 할 수 있습니다.

## Next Steps

사용 가능한 모든 `컴파일러` 훅 및 파라미터에 대한 자세한 목록은
[컴파일러 훅](/api/compiler-hooks/) 섹션을 참고하세요.
