---
title: Content Security Policies
sort: 10
contributors:
  - EugeneHlushko
  - probablyup
  - wizardofhogwarts
  - koto
translators:
  - dkstyle
related:
  - title: Nonce purpose explained
    url: https://stackoverflow.com/questions/42922784/what-s-the-purpose-of-the-html-nonce-attribute-for-script-and-style-elements
  - title: On the Insecurity of Whitelists and the Future of Content Security Policy
    url: https://ai.google/research/pubs/pub45542
  - title: Locking Down Your Website Scripts with CSP, Hashes, Nonces and Report URI
    url: https://www.troyhunt.com/locking-down-your-website-scripts-with-csp-hashes-nonces-and-report-uri/
  - title: CSP on MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  - title: Trusted Types
    url: https://web.dev/trusted-types
---

webpack은 로드하는 모든 스크립트에 `nonce`를 추가할 수 있습니다. 기능세트를 활성화하려면 엔트리 스크립트에 `__webpack_nonce__` 변수를 포함해야합니다. 고유한 해시 기반 nonce가 생성되고 고유한 페이지 뷰에 대해 각각 제공되어야 합니다. 이것이 바로 `__webpack_nonce__` 가 설정이 아닌 엔트리 파일에 지정된 이유입니다. `nonce`는 항상 base64로 인코딩된 문자열이어야 합니다.

## Examples

엔트리 파일 안의 경우:

```js
// ...
__webpack_nonce__ = 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=';
// ...
```

## Enabling CSP

CSP는 기본적으로 활성화되어 있지 않습니다. 브라우저에 CSP를 사용하도록 지시하려면 해당하는 헤더인 `Content-Security-Policy` 혹은 메타 태그 `<meta http-equiv="Content-Security-Policy" ...>`를 도큐먼트와 함께 보내야 합니다. 다음은 CDN 화이트리스트 URL을 포함한 CSP 헤더의 예시입니다.

```html
Content-Security-Policy: default-src 'self'; script-src 'self'
https://trusted.cdn.com;
```

CSP 및 `nonce` 속성에 대한 자세한 내용은 이 페이지 하단의 **더 읽어보기** 섹션을 참고하세요.

## Trusted Types

Webpack은 또한 Trusted Types을 사용하여 동적으로 구성된 스크립트를 로드하고 CSP [`require-trusted-types-for`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-trusted-types-for) 지시문의 제한을 준수할 수 있습니다. [`output.trustedTypes`](/configuration/output/#outputtrustedtypes) 설정 옵션을 참고하세요.
