---
title: Configuration
sort: 5
contributors:
  - TheLarkInn
  - simon04
  - EugeneHlushko
  - byzyk
translators:
  - choilim
---

webpack 설정이 정확히 동일한 경우는 거의 없습니다. 이것은 **webpack의 설정 파일이 webpack [설정](/configuration/)을 내보내는 JavaScript 파일이기 때문입니다.** 설정은 정의된 속성에 따라 webpack에서 처리됩니다.

webpack은 표준 Node.js CommonJS 모듈이므로, **다음과 같은 작업을 할 수 있습니다.**

- `require(...)`를 통해 다른 파일 가져오기
- `require(...)`를 통해 npm 유틸리티 사용하기
- `?:` 연산자 같은 JavaScript 제어 흐름 표현식 사용하기
- 자주 사용되는 값에 상수 또는 변수 사용하기
- 설정 일부를 만들어 내는 함수 작성 및 실행하기

상황에 따라 적절한 기능을 사용하세요.

기술적으로는 가능하지만, **아래 방법의 사용은 피해야 합니다.**

- webpack CLI를 사용할 때 자체 CLI를 작성하거나 [`--env`](/configuration/configuration-types/)를 사용하는 대신, CLI 인자에 접근하기
- 결정되지 않은 값을 내보내기 (webpack을 두 번 호출하면 동일한 출력 파일이 생성됩니다)
- 긴 설정 작성하기 (대신 설정을 여러 파일로 분할)

T> 이 문서에서 가장 중요한 부분은 webpack 설정을 형식화하고 스타일을 지정하는 다양한 방법이 있다는 것입니다. 핵심은 이해하고 유지보수할 수 있는 방식을 선택하여 일관된 형식을 유지하는 것입니다.

아래의 예제는 webpack 설정이 **코드이기** 때문에 표현적이면서 설정 가능하다는 것을 설명합니다.

## Introductory Configuration

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js',
  },
};
```

지원하는 모든 설정 옵션에 대해서는 [설정 섹션](/configuration/)을 _봐주세요._

## Multiple Targets

단일 설정을 객체, [함수](/configuration/configuration-types/#exporting-a-function) 또는 [promise](/configuration/configuration-types/#exporting-a-promise)로 export 하는 것과 함께, 다중 설정을 export 할 수 있습니다.

[다중 설정 내보내기](/configuration/configuration-types/#exporting-multiple-configurations)를 _봐주세요._

## Using other Configuration Languages

webpack은 다양한 프로그래밍 및 데이터 언어로 작성된 설정 파일을 허용합니다.

[설정 언어](/configuration/configuration-languages/)를 _봐주세요._
