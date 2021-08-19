---
title: Why webpack
sort: 13
contributors:
  - debs-obrien
  - montogeek
  - jeremenichelli
  - EugeneHlushko
translators:
  - limong
---

webpack을 사용해야 하는 이유를 이해하기 위해서 번들러가 사용되기 전에 어떻게 자바스크립트를 사용했었는지 요약해 보겠습니다.

브라우저에서 JavaScript가 동작하는 두 가지 방법이 있습니다. 먼저 각 기능이 있는 스크립트를 추가합니다. 이 방식은 너무 많은 스크립트로 인해 네트워크의 병목을 유발하는 원인이 될 수 있어서 확장이 어렵습니다. 두 번째 옵션은 모든 프로젝트에 하나의 거대한 `.js` 파일을 만들어 사용하는 것입니다. 그러나 이것은 유효범위와 크기, 가독성, 유지보수에 문제를 발생시킬 수 있습니다.

## IIFEs - Immediately invoked function expressions

IIFE는 대규모 프로젝트에서 유효범위 문제를 해결합니다. 스크립트 파일을 IIFE로 감싸면 유효범위에 대한 걱정 없이 파일을 안전하게 연결하거나 결합 할 수 있습니다.

IIFE의 사용은 Make, Gulp, Grunt, Broccoli, Brunch와 같은 툴과 연관이 있습니다. 이 툴들은 태스크 러너라고 하며, 모든 프로젝트 파일들을 함께 연결합니다.

그러나 하나의 파일을 변경해도 전체를 다시 빌드해야 합니다. 연결하면 파일 간의 스크립트를 쉽게 재사용 할 수 있지만, 빌드 최적화를 더욱더 어렵게 합니다. 코드가 실제로 사용되고 있는지 어떻게 알 수 있을까요?

만약 lodash에서 하나의 함수만 사용해도, 전체 라이브러리를 추가하고 모든 것을 뭉쳐야 합니다. 코드의 의존성을 어떻게 treeshaking 할까요? 지연 로딩 청크 코드는 확장이 어렵고 개발자의 많은 수동 작업을 필요로 합니다.

## Birth of JavaScript Modules happened thanks to Node.js

webpack은 브라우저 외부 환경의 서버나 컴퓨터에서 사용할 수 있는 JavaScript 런타임인 Node.js에서 동작합니다.

Node.js가 출시되었을 때 새로운 시대가 시작되었으며, 새로운 도전이었습니다. 현재 JavaScript는 브라우저에서 동작하지 않는데 어떻게 Node 애플리케이션은 새로운 코드 청크를 불러오는 것일까요? 여기에는 추가 할 수 있는 스크립트 태그나 html 파일이 없습니다.

`require`를 도입한 CommonJS가 출시되었는데 이는 현재 파일에서 모듈을 불러오고 사용할 수 있습니다. 이것은 필요한 곳에 모듈을 가져와 별도의 구성 없이 바로 사용할 수 있도록 하여 유효범위 문제를 해결했습니다.

## npm + Node.js + modules – mass distribution

Javascript는 언어로서, 플랫폼으로서, 빠른 개발 방식, 빠른 애플리케이션을 만드는 방법으로 세계적으로 사용되고 있습니다.

그러나 CommonJS에 대한 브라우저의 지원은 없습니다. [라이브 바인딩](https://medium.com/webpack/the-state-of-javascript-modules-4636d1774358)도 없습니다. 순환 참조의 문제가 있으며, 동기적인 모듈 해석과 로딩이 느립니다. CommonJS가 Node.js 프로젝트에서는 뛰어난 솔루션이었지만 브라우저는 모듈을 지원하지 않았습니다. 때문에 브라우저에서 CommonJS의 실행을 가능하게 하는 Browserify와 RequireJS, SystemJS 같은 번들러와 툴들이 만들어졌습니다.

## ESM - ECMAScript Modules

웹 프로젝트에서 좋은 소식은 모듈이 ECMAScript 표준에서 공식 기능이 되고 있다는 것입니다. 그러나 브라우저 지원은 불완전하고, 번들링이 여전히 더 빠르기 때문에 현재 초기 구현 모듈보다 권장되고 있습니다.

## Automatic Dependency Collection

구식의 태스크 러너와 Google Closure Compiler 조차 모든 의존성을 미리 수동으로 선언해야 합니다. webpack같은 번들러는 자동으로 빌드하고, 가져오거나 내보낸 항목을 기반으로 [디펜던시 그래프](/concepts/dependency-graph/)를 추론합니다. 이는 다른 [플러그인](/concepts/plugins/)과 [로더](/concepts/loaders/)와 함께 훌륭한 개발자 경험을 제공합니다.

## Wouldn't it be nice…

모듈을 작성할 수도 있고, 어떠한 포맷의 모듈(적어도 ESM에 도달하기 전까지)도 지원하며, 리소스와 애셋을 동시에 처리 가능한 것이 있으면 좋지 않을까요?

이것이 webpack이 존재하는 이유입니다. JavaScript 애플리케이션을 번들로 묶을 수 있는(ESM과 CommonJS 모두 지원) 도구이며, 이미지나 폰트, 스타일 시트 같은 다양한 애셋을 지원하도록 확장할 수 있습니다.

webpack은 성능과 로딩 시간을 중요하게 생각합니다. 프로젝트나 사용자에게 최고의 경험을 제공하기 위해 항상 비동기 청크 로딩이나 프리패칭 같은 새로운 기능을 추가하거나 개선하고 있습니다.
