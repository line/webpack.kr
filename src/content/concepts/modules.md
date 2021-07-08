---
title: Modules
sort: 6
contributors:
  - TheLarkInn
  - simon04
  - rouzbeh84
  - EugeneHlushko
  - byzyk
translators:
  - keipark
related:
  - title: JavaScript Module Systems Showdown
    url: https://auth0.com/blog/javascript-module-systems-showdown/
---

[모듈형 프로그래밍(modular programmming)](https://en.wikipedia.org/wiki/Modular_programming)에서 개발자는 *모듈*이라는 개별 기능으로 프로그램을 나눕니다.

각 모듈은 전체 프로그램보다 영향 범위가 좁기 때문에 검증과 디버깅 및 테스트가 간단합니다.
잘 작성된 _모듈은_ 견고한 추상화와 캡슐화의 경계를 만들므로 각 모듈은 전체 애플리케이션에서 일관성 있는 설계와 명확한 목적을 가질 수 있습니다.

Node.js는 거의 시작부터 모듈형 프로그래밍을 지원했습니다.
하지만 웹에서는 _모듈의_ 지원이 느리게 정착해왔습니다.
웹에서 모듈형 JavaScript를 지원하는 여러 도구가 존재하며 다양한 이점과 제한이 있습니다.
webpack은 이러한 시스템에서 얻은 교훈을 바탕으로 제작되어 프로젝트의 모든 파일에 _모듈의_ 개념을 사용합니다.

## What is a webpack Module

[Node.js 모듈](https://nodejs.org/api/modules.html)과 달리 webpack _모듈은_ 다양한 방식으로 _의존성을_ 표현할 수 있습니다. 몇 가지 예는 다음과 같습니다.

- [ES2015 `import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 문
- [CommonJS](http://www.commonjs.org/specs/modules/1.0/) `require()` 문
- [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) `define` 과 `require` 문
- css/sass/less 파일 내의 [`@import` 문](https://developer.mozilla.org/en-US/docs/Web/CSS/@import).
- 스타일 시트 `url(...)` 의 이미지 URL 또는 HTML `<img src=...>` 파일

## Supported Module Types

webpack은 기본적으로 다음 유형의 모듈을 지원합니다.

- [ECMAScript 모듈](/guides/ecma-script-modules)
- CommonJS 모듈
- AMD 모듈
- [Assets](/guides/asset-modules)
- WebAssembly 모듈

그 밖에도 webpack은 여러 언어로 작성된 모듈과 *로더*를 통한 다양한 전처리기를 지원합니다. _로더는_ webpack에서 네이티브가 아닌 _모듈을_ **어떻게** 처리하고 이러한 _의존성을_ _번들에_ 포함할지 정의합니다.
webpack 커뮤니티에서는 다음과 같이 널리 사용되는 다양한 언어와 언어 프로세서를 위한 _로더를_ 제작했습니다.

- [CoffeeScript](http://coffeescript.org)
- [TypeScript](https://www.typescriptlang.org)
- [ESNext (Babel)](https://babeljs.io)
- [Sass](http://sass-lang.com)
- [Less](http://lesscss.org)
- [Stylus](http://stylus-lang.com)
- [Elm](https://elm-lang.org/)

그 외 다른 많은 것들을 지원합니다! 종합하면, webpack은 커스터마이징을 위한 강력하고 풍부한 API를 제공하여 **어떤 환경에서도** webpack을 사용할 수 있도록 하는 동시에, 개발과 테스트 및 프로덕션 작업 흐름을 **유연하게** 유지하도록 합니다.

전체 목록은 [**로더 목록**](/loaders) 또는 [**로더 직접 작성하기(write your own)**](/api/loaders)를 참고하세요.
