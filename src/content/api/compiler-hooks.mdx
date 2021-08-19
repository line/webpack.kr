---
title: Compiler Hooks
group: Plugins
sort: 9
contributors:
  - rishantagarwal
  - byzyk
  - madhavarshney
  - misterdev
  - EugeneHlushko
  - superburrito
  - chenxsan
translators:
  - YukJiSoo
---

`Compiler` 모듈은 [CLI](/api/cli) 또는 [Node API](/api/node)를 통해 전달된 모든 옵션으로 컴파일 인스턴스를 생성하는 메인 엔진입니다.
플러그인 등록 및 호출을 위해 `Tapable`클래스를 확장합니다.
대부분의 사용자용 플러그인은 먼저 `Compiler`에 등록됩니다.

webpack 플러그인을 개발할 때, 훅이 어디서 호출되는지 알고 싶을 수 있습니다. 이를 알아 보려면 webpack 소스코드에서 `hooks.<hook name>.call`을 검색해보세요.

## Watching

`Compiler`는 파일 시스템을 모니터링하고 파일이 변경되면 다시 컴파일하는 [watching](/api/node/#watching)을 지원합니다.
watch 모드에서 컴파일러는 `watchRun`, `watchClose` 및 `invalid`와 같은 추가 이벤트를 내보냅니다.
이것은 일반적으로 [development](/guides/development)에서 사용되며 `webpack-dev-server`와 같은 도구의 내부에서 사용되어 개발자가 매번 수동으로 다시 컴파일할 필요 없게 도와줍니다.
watch 모드는 [CLI](/api/cli/#watch-options)를 통해서도 시작 할 수 있습니다.

## Hooks

아래에서 소개할 라이프 사이클 훅들은 `compiler`에 의해 노출됩니다.
아래와 같이 접근 할 수 있습니다.

```js
compiler.hooks.someHook.tap('MyPlugin', (params) => {
  /* ... */
});
```

훅 타입에 따라서 `tapAsync`와 `tapPromise`를 사용할 수 있습니다.

훅 타입에 대한 설명은 [Tapable 문서](https://github.com/webpack/tapable#tapable)를 참고하세요.

### `environment`

`SyncHook`

설정 파일에서 플러그인을 초기화한 직후, 컴파일러 환경을 준비하는 동안 호출됩니다.

### `afterEnvironment`

`SyncHook`

컴파일러 환경 설정이 완료된 때인 `environment` 훅 바로 뒤에 호출됩니다.

### `entryOption`

`SyncBailHook`

webpack 옵션의 [`entry` 설정](/configuration/entry-context/#entry)이 처리된 후 호출됩니다.

- 콜백 파라미터: [`context`](/configuration/entry-context/#context), [`entry`](/configuration/entry-context/#entry)

```js
compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {
  /* ... */
});
```

### `afterPlugins`

`SyncHook`

내부 플러그인의 초기 설정이 완료된 후 호출됩니다.

- 콜백 파라미터: `compiler`

### `afterResolvers`

`SyncHook`

리졸버 설정이 완료된 후 트리거됩니다.

- 콜백 파라미터: `compiler`

### `initialize`

`SyncHook`

컴파일러 객체가 초기화될 때 호출됩니다.

### `beforeRun`

`AsyncSeriesHook`

컴파일러를 실행하기 직전에 훅을 추가합니다.

- 콜백 파라미터: `compiler`

### `run`

`AsyncSeriesHook`

컴파일러가 [`records`](/configuration/other-options/#recordspath)를 읽기 시작하기 전에 연결합니다.

- 콜백 파라미터: `compiler`

### `watchRun`

`AsyncSeriesHook`

새 컴파일이 트리거된 후 컴파일이 실제로 시작되기 전에 watch 모드에서 플러그인을 실행합니다.

- 콜백 파라미터: `compiler`

### `normalModuleFactory`

`SyncHook`

[NormalModuleFactory](/api/normalmodulefactory-hooks)가 생성된 후 호출됩니다.

- 콜백 파라미터: `normalModuleFactory`

### `contextModuleFactory`

`SyncHook`

[ContextModuleFactory](/api/contextmodulefactory-hooks)가 생성된 후 플러그인을 실행합니다.

- 콜백 파라미터: `contextModuleFactory`

### `beforeCompile`

`AsyncSeriesHook`

컴파일 파라미터가 생성된 후 플러그인을 실행합니다.

- 콜백 파라미터: `compilationParams`

`compilationParams` 변수는 다음과 같이 초기화됩니다.

```js
compilationParams = {
  normalModuleFactory,
  contextModuleFactory,
};
```

이 훅은 컴파일 파라미터를 추가 또는 수정하는 데 사용할 수 있습니다.

```js
compiler.hooks.beforeCompile.tapAsync('MyPlugin', (params, callback) => {
  params['MyPlugin - data'] = 'important stuff my plugin will use later';
  callback();
});
```

### `compile`

`SyncHook`

새 컴파일이 생성되기 전인 `beforeCompile` 바로 뒤에 호출됩니다.

- 콜백 파라미터: `compilationParams`

### `thisCompilation`

`SyncHook`

컴파일을 초기화하는 동안 `compilation` 이벤트를 생성하기 직전에 실행됩니다.

- 콜백 파라미터: `compilation`, `compilationParams`

### `compilation`

`SyncHook`

컴파일이 생성된 후 플러그인을 실행합니다.

- 콜백 파라미터: `compilation`, `compilationParams`

### `make`

`AsyncParallelHook`

컴파일을 완료하기 전에 실행됩니다.

- 콜백 파라미터: `compilation`

### `afterCompile`

`AsyncSeriesHook`

컴파일을 완료하고 봉인한 후 호출됩니다.

- 콜백 파라미터: `compilation`

### `shouldEmit`

`SyncBailHook`

애셋을 방출하기 전에 호출됩니다. 방출 여부를 알려주는 boolean을 반환해야 합니다.

- 콜백 파라미터: `compilation`

```js
compiler.hooks.shouldEmit.tap('MyPlugin', (compilation) => {
  // 출력을 내보내려면 true를 반환하고, 그렇지 않으면 false를 반환합니다.
  return true;
});
```

### `emit`

`AsyncSeriesHook`

애셋을 출력 디렉터리로 방출하기 직전에 실행됩니다.

- 콜백 파라미터: `compilation`

### `afterEmit`

`AsyncSeriesHook`

출력 디렉터리에 애셋을 내보낸 후 호출됩니다.

- 콜백 파라미터: `compilation`

### `assetEmitted`

`AsyncSeriesHook`

애셋이 방출되었을 때 실행됩니다. 출력 경로 및 바이트 콘텐츠와 같은 내보낸 애셋의 정보에 대한 접근을 제공합니다.

- 콜백 파라미터: `file`, `info`

예를 들어 `info.content`를 통해 애셋의 콘텐츠 버퍼에 접근할 수 있습니다.

```js
compiler.hooks.assetEmitted.tap(
  'MyPlugin',
  (file, { content, source, outputPath, compilation, targetPath }) => {
    console.log(content); // <Buffer 66 6f 6f 62 61 72>
  }
);
```

### `done`

`AsyncSeriesHook`

컴파일이 완료되면 실행됩니다.

- 콜백 파라미터: `stats`

### `additionalPass`

`AsyncSeriesHook`

이 훅을 사용하면 빌드를 한 번 더 추가할 수 있습니다.

### `failed`

`SyncHook`

컴파일이 실패하면 호출됩니다.

- 콜백 파라미터: `error`

### `invalid`

`SyncHook`

감시중인 컴파일이 무효가 되었을 때 실행됩니다.

- 콜백 파라미터: `fileName`, `changeTime`

### `watchClose`

`SyncHook`

감시중인 컴파일이 중지되었을 때 호출됩니다.

### `infrastructureLog`

`SyncBailHook`

[`infrastructureLogging` 옵션](/configuration/other-options/#infrastructurelogging)을 통해 설정에서 활성화된 경우 인프라 로깅을 사용할 수 있습니다.

- 콜백 파라미터: `name`, `type`, `args`

### `log`

`SyncBailHook`

활성화되면 [stats](/configuration/stats/)에 로그를 작성할 수 있습니다. [`stats.logging`, `stats.loggingDebug` 및 `stats.loggingTrace` 옵션](/configuration/stats/#stats-options)을 참고하세요.

- 콜백 파라미터: `origin`, `logEntry`
