---
title: Module Resolution
sort: 7
contributors:
  - pksjce
  - pastelsky
  - byzyk
  - EugeneHlushko
  - wizardofhogwarts
translators:
  - YukJiSoo
---

리졸버는 절대 경로로 모듈을 찾는 데 도움이 되는 라이브러리입니다.
모듈은 다음과 같이 다른 모듈의 의존성으로서 필요할 수 있습니다.

```js
import foo from 'path/to/module';
// 또는
require('path/to/module');
```

의존성 모듈은 애플리케이션 코드 또는 써드 파티 라이브러리에서 가져올 수 있습니다.
리졸버는 webpack이 모든 `require`/`import` 문에 대해 번들에 포함되어야 하는 모듈의 코드를 찾는 데 도움을 줍니다.
webpack은 모듈을 번들링하는 동안 파일 경로를 확인하기 위해 [enhanced-resolve](https://github.com/webpack/enhanced-resolve)를 사용합니다.

## Resolving rules in webpack

`enhanced-resolve`를 사용하여 webpack은 세 가지 종류의 파일 경로를 확인할 수 있습니다.

### Absolute paths

```js
import '/home/me/file';

import 'C:\\Users\\me\\file';
```

이미 파일에 대한 절대 경로가 있으므로 추가 분석이 필요하지 않습니다.

### Relative paths

```js
import '../src/file1';
import './file2';
```

이 경우 `import` 또는 `require`가 발생하는 리소스 파일의 디렉터리를 컨텍스트 디렉터리로 간주합니다. `import/require`에 지정된 상대 경로는 이 컨텍스트 경로에 결합되어 모듈에 대한 절대 경로를 생성합니다.

### Module paths

```js
import 'module';
import 'module/lib/file';
```

모듈은 [`resolve.modules`](/configuration/resolve/#resolvemodules)에 지정된 모든 디렉터리 내에서 검색됩니다.
[`resolve.alias`](/configuration/resolve/#resolvealias) 구성 옵션을 사용하여 별칭을 만들어 원래 모듈 경로를 대체 경로로 바꿀 수 있습니다.

- 패키지에 `package.json`파일이 포함된 경우 [`resolve.exportsFields`](/configuration/resolve/#resolveexportsfields) 구성 옵션에 지정된 필드를 순서대로 조회하고 `package.json`의 첫 번째 필드는 [패키지 내보내기 가이드라인](/guides/package-exports/)에 따라 패키지에서 사용 가능한 내보내기를 결정합니다.

위의 규칙에 따라 경로가 확인되면 리졸버는 경로가 파일 또는 디렉터리를 가리키는지 확인합니다. 경로가 파일을 가리키는 경우 다음 단계를 수행합니다.

- 경로에 파일 확장자가 있으면 파일이 바로 번들로 제공됩니다.
- 그렇지 않으면 파일 확장자는 [`resolve.extensions`](/configuration/resolve/#resolveextensions) 옵션을 사용하여 확인됩니다. 예시: `.js`, `.jsx`.

경로가 폴더를 가리키는 경우 올바른 확장자를 가진 올바른 파일을 찾기 위해 다음 단계를 수행합니다.

- 폴더에 `package.json` 파일이 포함되어 있으면 [`resolve.mainFields`](/configuration/resolve/#resolvemainfields) 구성 옵션에 지정된 필드가 순서대로 조회되고 `package.json`의 첫 번째 필드가 파일 경로를 결정합니다.
- `package.json`이 없거나 [`resolve.mainFields`](/configuration/resolve/#resolvemainfields)가 유효한 경로를 반환하지 않는 경우 [`resolve.mainFields`](/configuration/resolve/#resolvemainfields) 구성 옵션에 지정된 파일 이름을 순서대로 검색하여 imported/required 된 디렉터리에 일치하는 파일 이름이 있는지 확인합니다.
- 그런 다음 [`resolve.extensions`](/configuration/resolve/#resolveextensions) 옵션을 사용하여 비슷한 방식으로 파일 확장자를 확인합니다.

webpack은 빌드 대상에 따라 이러한 옵션에 대해 합리적인 [기본값](/configuration/resolve)을 제공합니다.

## Resolving Loaders

파일 분석에 명시된 것과 동일한 규칙을 따릅니다. 그러나 [`resolveLoader`](/configuration/resolve/#resolveloader) 구성 옵션을 사용하여 로더에 대한 별도의 분석 규칙을 가질 수 있습니다.

## Caching

모든 파일 시스템 액세스가 캐시되므로 동일한 파일에 대한 여러 병렬 또는 직렬 요청이 더 빠르게 발생합니다. [watch 모드](/configuration/watch/#watch)에서는 수정된 파일만 캐시에서 제거됩니다. watch 모드가 꺼져 있으면 모든 컴파일 전에 캐시가 제거됩니다.

위에서 언급한 구성 옵션에 대한 자세한 내용은 [Resolve API](/configuration/resolve)를 참고하세요.
