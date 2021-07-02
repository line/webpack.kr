---
title: Logger Interface
sort: 6
contributors:
  - EugeneHlushko
  - wizardofhogwarts
  - chenxsan
translators:
  - dkstyle
---

T> webpack 4.39.0 부터 사용 가능

로깅 출력은 최종 사용자에게 메시지를 표시하는 추가적인 방법입니다.

webpack 로거는 [로더](/loaders/) 및 [플러그인](/api/plugins/#logging)에서 사용할 수 있습니다. [통계](/api/stats/)의 일부로 내보내고 [webpack 설정](/configuration/)에서 사용자가 설정합니다.

webpack애서 사용자 정의 로깅 API의 이점:

- [로깅 설정](/configuration/stats/#statslogging) 표시 레벨의 공통 위치
- `stats.json`의 일부로 export 할 수 있는 로깅 출력입니다.
- 통계 프리셋은 로깅 출력에 영향을 줍니다.
- 플러그인이 로깅 캡처 및 표시 레벨에 영향을 줄 수 있습니다.
- 여러 플러그인 및 로더를 사용하는 경우 공통 로깅 솔루션을 사용합니다.
- CLI, webpack용 UI 도구는 로깅을 표시하는 다른 방법을 선택할 수 있습니다.
- webpack 코어는 로깅 출력을 내보낼 수 있습니다. 예) 타이밍 데이터

webpack 로깅 API를 도입함으로써 webpack 플러그인 및 로더가 로그를 내보내는 방식을 통합하고 빌드 문제를 검사하는 더 나은 방법을 제공하기를 바랍니다. 통합 로깅 솔루션은 개발 경험을 개선하여 플러그인 및 로더 개발자를 지원합니다. 대시보드 또는 기타 UI와 같은 CLI가 아닌 wepack 솔루션을 위한 기반을 마련합니다.

W> **로그에서 노이즈 방지!** 여러 플러그인과 로더가 함께 사용된다는 점에 유의하세요. 로더는 일반적으로 여러 파일을 처리하고 모든 파일에 대해 호출됩니다. 로그 출력을 유용한 정보로 유지하려면 로깅 레벨을 가능한 낮게 선택하세요.

## Examples of how to get and use webpack logger in loaders and plugins

**my-webpack-plugin.js**

```js
const PLUGIN_NAME = 'my-webpack-plugin';
export class MyWebpackPlugin {
  apply(compiler) {
    // 컴파일러에서 로거에 액세스 할 수 있습니다.
    const logger = compiler.getInfrastructureLogger(PLUGIN_NAME);
    logger.log('log from compiler');

    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      // 컴파일에서도 로거에 액세스 할 수 있습니다.
      const logger = compilation.getLogger(PLUGIN_NAME);
      logger.info('log from compilation');
    });
  }
}
```

**my-webpack-loader.js**

```js
module.exports = function (source) {
  // webpack 로더에서 `this.getLogger`로 로거를 얻을 수 있습니다.
  const logger = this.getLogger('my-webpack-loader');
  logger.info('hello Logger');
  return source;
};
```

## Logger methods

- `logger.error(...)`: 에러 메시지용입니다.
- `logger.warn(...)`: 경고용입니다.
- `logger.info(...)`: **중요** 정보성 메시지용입니다. 이러한 메시지는 기본적으로 표시됩니다. 사용자가 실제로 봐야하는 메시지에만 사용합니다.
- `logger.log(...)`: **중요하지 않은** 정보성 메시지용입니다. 이러한 메시지는 사용자가 볼 수 있도록 선택한 경우에만 표시됩니다.
- `logger.debug(...)`: 디버깅 정보용입니다. 이러한 메시지는 사용자가 특정 모듈에 대한 디버그 로깅을 보기로 선택한 경우에만 표시됩니다.
- `logger.trace()`: 스택 추적을 표시하기 위해 사용합니다. `logger.debug`처럼 표시됩니다.
- `logger.group(...)`: 메시지를 그룹화하기 위해 사용합니다. `logger.log`처럼 접힌 채로 표시됩니다.
- `logger.groupEnd()`: 로깅 그룹을 종료하기 위해 사용합니다.
- `logger.groupCollapsed(...)`: 메시지를 함께 그룹화하기 위해 사용합니다. `logger.log`처럼 접힌 채로 표시됩니다. 로깅 수준이 `'verbose'` 나 `'debug'`로 설정된 경우 확장되어 표시됩니다.
- `logger.status`: 임시 메시지를 작성하고, 새 상태를 설정하고, 이전 메시지를 재정의합니다.
- `logger.clear()`: 수평 라인을 출력합니다. `logger.log`처럼 표시됩니다.
- `logger.profile(...)`, `logger.profileEnd(...)`: 프로파일을 캡처하기 위해 사용합니다. 지원되는 경우 `console.profile`에 위임됩니다.

## Runtime Logger API

런타임 로거 API는 개발 도구로만 사용할 수 있고 [프로덕션 모드](/configuration/mode/#mode-production)에 포함할 수 없습니다.

- `const logging = require('webpack/lib/logging/runtime')`: 런타임에서 로거를 사용하려면 webpack에서 직접 require 해야 합니다.
- `logging.getLogger('name')`: 이름으로 개별 로거를 가져오기 위해 사용합니다.
- `logging.configureDefaultLogger(...)`: 기본 로거를 재정의합니다.

```javascript
const logging = require('webpack/lib/logging/runtime');
logging.configureDefaultLogger({
  level: 'log',
  debug: /something/,
});
```

- `logging.hooks.log`: 런타임 로거에 플러그인을 적용하기 위해 사용합니다.
