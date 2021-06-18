---
title: Dependency Graph
sort: 9
contributors:
  - TheLarkInn
  - EugeneHlushko
translators:
  - choilim
related:
  - title: HTTP2 Aggressive Splitting Example
    url: https://github.com/webpack/webpack/tree/master/examples/http2-aggressive-splitting
  - title: webpack & HTTP/2
    url: https://medium.com/webpack/webpack-http-2-7083ec3f3ce6
---

하나의 파일이 다른 파일에 의존할 때마다, webpack은 이것을 _의존성으로_ 취급합니다. 이를 통해 webpack은 이미지 또는 웹 폰트와 같은 코드가 아닌 애셋을 가져와, 애플리케이션에 _의존성으로_ 제공할 수 있습니다.

webpack은 애플리케이션을 처리할 때, 커맨드 라인 또는 설정 파일에 정의 된 모듈 목록에서 시작합니다.
[_엔트리 포인트_](/concepts/entry-points/)에서 시작하여, webpack은 애플리케이션에서 필요한 모든 모듈을 포함하는 _디펜던시 그래프를_ 재귀적으로 빌드한 다음, 모든 모듈을 브라우저에 의해 로드 되는 작은 수(보통 하나)의 _번들로_ 묶습니다.

T> 애플리케이션 번들링은 브라우저가 새 요청을 시작하는 동안 앱이 기다려야 하는 횟수를 최소화하므로 _HTTP/1.1_ 클라이언트에 특히 강력합니다. _HTTP/2의_ 경우, [코드 스플리팅](/guides/code-splitting/)을 사용하여 좋은 결과를 얻을 수도 있습니다.
