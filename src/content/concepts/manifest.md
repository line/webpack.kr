---
title: The Manifest
sort: 11
contributors:
  - skipjack
  - EugeneHlushko
translators:
  - YukJiSoo
related:
  - title: Separating a Manifest
    url: https://survivejs.com/webpack/optimizing/separating-manifest/
  - title: Predictable Long Term Caching with webpack
    url: https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
  - title: Caching
    url: /guides/caching/
---

webpack으로 빌드된 일반적인 애플리케이션 또는 사이트에는 세 가지 주요 유형의 코드가 있습니다.

1. 개발자 또는 개발팀이 작성한 소스 코드
2. 소스 코드가 의존하는 써드 파티 라이브러리 혹은 "공급 업체" 코드
3. 모든 모듈의 상호 작용을 수행하는 webpack 런타임 및 **매니페스트**.

이 글은 이 세 부분 중 마지막인 런타임과 특히 매니페스트에 초점을 맞추어 설명합니다.

## Runtime

매니페스트 데이터와 함께 런타임은 기본적으로 webpack이 브라우저에서 실행되는 동안 모듈화된 애플리케이션을 연결하는 데 필요한 모든 코드입니다. 모듈이 상호 작용할 때 모듈을 연결하는 데 필요한 로딩 및 해석 로직이 포함되어 있습니다. 여기에는 브라우저에 이미 로드된 모듈 연결과 그렇지 않은 모듈을 지연 로드하는 로직이 포함됩니다.

## Manifest

애플리케이션이 `index.html` 파일 형식으로 브라우저에 도달하면 애플리케이션에 필요한 일부 번들 및 기타 다양한 애셋을 로드하고 연결해야 합니다. 꼼꼼하게 배치한 `/src` 디렉터리는 이제 번들이 되고 압축되며 지연 로딩을 위해 webpack의 [`최적화`](/configuration/optimization/)에 의하여 더 작은 청크로 분할될 수 있습니다. 그렇다면 webpack은 필요한 모든 모듈 간의 상호 작용을 어떻게 관리할까요? 매니페스트 데이터로 관리가 됩니다.

컴파일러가 애플리케이션에 입력, 해석 및 매핑 할 때 모든 모듈에 대한 자세한 메모를 유지합니다. 이 데이터 모음을 "매니페스트"라고 하며, 모듈이 번들링 되고 브라우저에 제공되면 런타임에서 모듈을 해석하고 로드하는데 사용합니다. 선택한 [모듈 구문](/api/module-methods)에 관계없이 `import` 또는 `require`문은 이제 모듈 식별자를 가리키는 `__webpack_require__` 메소드가 됩니다. 매니페스트의 데이터를 사용하여 런타임은 식별자 뒤에 있는 모듈을 검색할 위치를 찾을 수 있습니다.

## The Problem

이제 webpack이 내부적으로 어떻게 작동하는지에 대한 약간의 통찰력을 얻었습니다. "이것이 나에게 어떤 영향을 미칩니까?"라고 질문 할 수 있습니다. 이에 대한 간단한 대답은 대부분 그렇지 않다입니다. 런타임은 매니페스트를 활용하여 작업을 수행하며 애플리케이션이 브라우저에 도달하면 모든 것이 마술처럼 작동하는 것처럼 보입니다. 그러나 브라우저 캐싱을 활용하여 프로젝트의 성능을 향상하기로 결정했다면 이 프로세스는 이해해야 할 중요한 사항이 될 것입니다.

번들 파일 이름 내에서 콘텐츠 해시를 사용하면 파일 콘텐츠가 변경된 시기를 브라우저에 표시하여 캐시를 무효화 할 수 있습니다. 이 작업을 시작하면 즉시 몇 가지 재미있는 행동을 발견 할 수 있습니다. 특정 해시는 내용이 분명히 변경되지 않더라도 변경됩니다. 이는 모든 빌드를 변경하는 런타임 및 매니페스트의 주입으로 인해 발생합니다.

_Output management_ 가이드의 [매니페스트 섹션](/guides/output-management/#the-manifest)을 참조하여 매니페스트를 추출하는 방법을 알아보고 장기 캐싱의 복잡성에 대해 자세히 알아보려면 아래 가이드를 읽어보세요.
