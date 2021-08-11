---
title: Devtool
sort: 12
contributors:
  - sokra
  - skipjack
  - SpaceK33z
  - lricoy
  - madhavarshney
  - wizardofhogwarts
  - anikethsaha
  - snitin315
translators:
  - keipark
related:
  - title: Enabling Source Maps
    url: https://survivejs.com/webpack/developing-with-webpack/enabling-sourcemaps/
  - title: webpack's Devtool Source Map
    url: http://cheng.logdown.com/posts/2016/03/25/679045
---

devtool 옵션은 소스맵 생성 여부와 방법을 제어합니다.

보다 세밀한 설정을 위해 [`SourceMapDevToolPlugin`](/plugins/source-map-dev-tool-plugin)을 사용하세요. 기존 소스맵을 처리하려면 [`source-map-loader`](/loaders/source-map-loader)를 참고하세요.

## `devtool`

`string = 'eval'` `false`

디버깅 과정 향상을 위해 [source mapping](http://blog.teamtreehouse.com/introduction-source-maps) 스타일을 선택합니다. 이 값은 빌드 및 리빌드 속도에 큰 영향을 미칠 수 있습니다.

T> webpack 저장소에는 [모든 `devtool` 변형 효과를 보여주는 예제](https://github.com/webpack/webpack/tree/master/examples/source-map)가 포함되어 있습니다. 이 예제는 차이점을 이해하는 데 도움이 될 것입니다.

T>`devtool` 옵션을 사용하는 대신, 더 많은 옵션이 있는 `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin`을 직접 사용할 수도 있습니다. `devtool` 옵션과 플러그인을 함께 사용해서는 안 됩니다. `devtool` 옵션은 내부적으로 플러그인을 추가하므로 플러그인을 두 번 적용하는 것과 같습니다.

| devtool                                    | 성능                                                   | 프로덕션 | 품질           | 코멘트                                                                    |
| ------------------------------------------ | ------------------------------------------------------ | -------- | -------------- | ------------------------------------------------------------------------- |
| (none)                                     | **build**: 가장 빠름<br /><br />**rebuild**: 가장 빠름 | 가능     | bundle         | 최대 성능을 갖춘 프로덕션 빌드를 위해 추천하는 옵션입니다.                |
| **`eval`**                                 | **build**: 빠름<br /><br />**rebuild**: 가장 빠름      | no       | generated      | 최대 성능을 갖춘 개발 빌드를 위해 추천하는 옵션입니다.                    |
| `eval-cheap-source-map`                    | **build**: 보통<br /><br />**rebuild**: 빠름           | no       | transformed    | 개발 빌드를 위한 균형 잡힌 옵션입니다.                                    |
| `eval-cheap-module-source-map`             | **build**: 느림<br /><br />**rebuild**: 빠름           | no       | original lines | 개발 빌드를 위한 균형 잡힌 옵션입니다.                                    |
| **`eval-source-map`**                      | **build**: 가장 느림<br /><br />**rebuild**: 보통      | no       | original       | 고품질 소스맵을 포함한 개발 빌드를 위해 추천하는 옵션입니다.              |
| `cheap-source-map`                         | **build**: 보통<br /><br />**rebuild**: 느림           | no       | transformed    |
| `cheap-module-source-map`                  | **build**: 느림<br /><br />**rebuild**: 느림           | no       | original lines |
| **`source-map`**                           | **build**: 가장 느림<br /><br />**rebuild**: 가장 느림 | yes      | original       | 고품질 소스맵을 포함한 프로덕션 빌드를 위해 추천하는 옵션입니다.          |
| `inline-cheap-source-map`                  | **build**: 보통<br /><br />**rebuild**: 느림           | no       | transformed    |
| `inline-cheap-module-source-map`           | **build**: 느림<br /><br />**rebuild**: 느림           | no       | original lines |
| `inline-source-map`                        | **build**: 가장 느림<br /><br />**rebuild**: 가장 느림 | no       | original       | 단일 파일을 내보낼 때 선택할 수 있습니다.                                 |
| `eval-nosources-cheap-source-map`          | **build**: 보통<br /><br />**rebuild**: 빠름           | no       | transformed    | 소스 코드를 포함하지 않습니다.                                            |
| `eval-nosources-cheap-module-source-map`   | **build**: 느림<br /><br />**rebuild**: 빠름           | no       | original lines | 소스 코드를 포함하지 않습니다.                                            |
| `eval-nosources-source-map`                | **build**: 가장 느림<br /><br />**rebuild**: 보통      | no       | original       | 소스 코드를 포함하지 않습니다.                                            |
| `inline-nosources-cheap-source-map`        | **build**: 보통<br /><br />**rebuild**: 느림           | no       | transformed    | 소스 코드를 포함하지 않습니다.                                            |
| `inline-nosources-cheap-module-source-map` | **build**: 느림<br /><br />**rebuild**: 느림           | no       | original lines | 소스 코드를 포함하지 않습니다.                                            |
| `inline-nosources-source-map`              | **build**: 가장 느림<br /><br />**rebuild**: 가장 느림 | no       | original       | 소스 코드를 포함하지 않습니다.                                            |
| `nosources-cheap-source-map`               | **build**: 보통<br /><br />**rebuild**: 느림           | no       | transformed    | 소스 코드를 포함하지 않습니다.                                            |
| `nosources-cheap-module-source-map`        | **build**: 느림<br /><br />**rebuild**: 느림           | no       | original lines | 소스 코드를 포함하지 않습니다.                                            |
| `nosources-source-map`                     | **build**: 가장 느림<br /><br />**rebuild**: 가장 느림 | yes      | original       | 소스 코드를 포함하지 않습니다.                                            |
| `hidden-nosources-cheap-source-map`        | **build**: 보통<br /><br />**rebuild**: 느림           | no       | transformed    | 참조가 없으며, 소스 코드를 포함하지 않습니다.                             |
| `hidden-nosources-cheap-module-source-map` | **build**: 느림<br /><br />**rebuild**: 느림           | no       | original lines | 참조가 없으며, 소스 코드를 포함하지 않습니다.                             |
| `hidden-nosources-source-map`              | **build**: 가장 느림<br /><br />**rebuild**: 가장 느림 | yes      | original       | 참조가 없으며, 소스 코드를 포함하지 않습니다.                             |
| `hidden-cheap-source-map`                  | **build**: 보통<br /><br />**rebuild**: 느림           | no       | transformed    | 참조가 없습니다.                                                          |
| `hidden-cheap-module-source-map`           | **build**: 느림<br /><br />**rebuild**: 느림           | no       | original lines | 참조가 없습니다.                                                          |
| `hidden-source-map`                        | **build**: 가장 느림<br /><br />**rebuild**: 가장 느림 | yes      | original       | 참조가 없으며, 에러 보고 목적으로 소스맵을 사용할 때 선택 할 수 있습니다. |

| 단축 명령어             | 설명                                                                                                                                                                                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| performance: build      | 초기 빌드 성능은 devtool 설정에 어떻게 영향을 받습니까?                                                                                                                                                                                                     |
| performance: rebuild    | 증분 빌드 성능은 devtool 설정에 어떻게 영향을 받습니까? 느린 devtool은 watch 모드에서 개발 피드백 루프를 줄일 수 있습니다. 보통 빌드보다 리빌드 속도가 빠를 것으로 예상하기 때문에 빌드 성능과 비교했을 때 규모가 다릅니다.                                 |
| production              | 프로덕션 빌드에 이 devtool 을 사용하는 것이 합리적인가요? devtool이 사용자 경험에 부정적인 영향을 미칠 경우 일반적으로 `아니오` 입니다.                                                                                                                     |
| quality: bundled        | 단일 코드 blob에서 생성된 모든 청크 코드를 볼 수 있습니다. 이것은 devtooling 지원이 없는 원시 출력 파일입니다.                                                                                                                                              |
| quality: generated      | 생성된 코드를 표시합니다. 하지만 브라우저 devtool에서는 각 모듈이 별도의 코드 파일로 표시됩니다.                                                                                                                                                            |
| quality: transformed    | 생성된 코드를 표시합니다. 코드는 로더에 의한 사전 처리가 되었으나, 추가 webpack 변환은 적용되지 않았습니다. 소스 라인만 매핑되고 생성되지 않은 열 정보는 폐기됩니다. 이를 통해 최소화 도구와 함께 작동하지 않는 줄 중간에 중단점을 설정할 수 없도록 합니다. |
| quality: original lines | 모든 로더가 소스맵핑을 지원한다고 가정하여 개발자가 작성한 원본 코드가 표시됩니다. 소스 라인만 매핑되고 생성되지 않은 열 정보는 폐기됩니다. 이를 통해 최소화 도구와 함께 작동하지 않는 줄 중간에 중단점을 설정할 수 없도록 합니다.                          |
| quality: original       | 모든 로더가 소스맵핑을 지원한다고 가정하여 개발자가 작성한 원본 코드가 표시됩니다.                                                                                                                                                                          |
| `eval-*` addition       | 모듈별로 소스맵을 생성하고 eval을 통해 추가합니다 (attach it via eval). 리빌드 성능이 개선되어 개발에 권장합니다. 윈도우즈 디펜더의 바이러스 검사로 인해 속도가 크게 저하되는 문제가 있습니다.                                                              |
| `inline-*` addition     | 소스맵을 별도의 파일을 만드는 대신 원본 파일에 인라인으로 추가합니다.                                                                                                                                                                                       |
| `hidden-*` addition     | 소스맵에 대한 참조가 추가되지 않았습니다. 오류 보고 목적 등, 소스맵을 배포히지 않지만 반드시 생성되어야 하는 경우에 사용합니다.                                                                                                                             |
| `nosources-*` addition  | 소스 코드가 소스맵에 포함되어 있지 않습니다. 이것은 원본 파일을 참조해야 할 때 유용 할 수 있습니다 (추가 설정 옵션이 필요함).                                                                                                                               |

T> webpack은 devtool의 이름 유효성을 검사할 때 특정한 패턴을 예상합니다. 이 점을 숙지하고 devtool 문자열의 순서를 뒤섞지않아야 합니다. 패턴은 `[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`입니다.

이 값 중 일부는 개발에, 일부는 프로덕션에 적합합니다. 개발의 경우 일반적으로 번들 크기 보다는 빠른 소스맵이 필요합니다. 하지만 프로덕션의 경우 정확하고 최소화를 지원하는 별도의 소스맵이 필요합니다.

T> 생성된 소스맵의 파일 이름을 사용자 지정하려면 [`output.sourceMapFilename`](/configuration/output/#outputsourcemapfilename)을 참조하세요.

### Qualities

`bundled code` - 생성된 모든 코드가 큰 코드 blob으로 표시됩니다. 모듈은 서로 분리되어 있지 않습니다.

`generated code` - 각 모듈은 서로 분리되고 모듈 이름으로 주석이 표시됩니다. webpack에 의해 생성된 코드가 표시됩니다. 예를 들면 `import {test} from "module"; test();` 대신, `var module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42); module__WEBPACK_IMPORTED_MODULE_1__.a();`이 표시됩니다.

`transformed code` - 각 모듈은 서로 분리되고 모듈 이름으로 주석이 표시됩니다. webpack이 변환하기 전이지만, 로더가 트랜스파일한 후의 코드가 표시됩니다. 예를 들면, `import {test} from "module"; class A extends test {}` 대신, `import {test} from "module"; var A = function(_test) { ... }(test);`와 같은 코드가 표시됩니다.

`original source` - 각 모듈은 서로 분리되고 모듈 이름으로 주석이 표시됩니다. 개발자가 작성한 트랜스파일 전의 코드를 볼 수 있습니다. 이것은 로더 지원에 따라 다릅니다.

`without source content` - 소스맵에 소스의 내용이 포함되지 않습니다. 일반적으로 브라우저는 웹 서버 또는 파일 시스템에서 소스를 로드합니다. 소스 URL과 일치하도록 [`output.devtoolModuleFilenameTemplate`](/configuration/output/#outputdevtoolmodulefilenametemplate)을 올바르게 설정해야 합니다.

`(lines only)` - 소스맵이 한 줄당 하나의 매핑으로 단순화됩니다. 이것은 일반적으로 구문당 단일 매핑을 의미합니다 (이 방식으로 개발자가 작성했다고 가정합니다). 이를 통해 구문 레벨에서 디버깅 실행을 방지하고, 하나의 라인에서 열에 중단점을 설정할 수 없습니다. 최소화 도구는 보통 한 줄로 내보내므로 최소화와 함께 사용하는 것은 불가능합니다.

### Development

다음 옵션은 개발에 이상적입니다.

`eval` - 각 모듈을 `eval()` 및 `//@ sourceURL`을 통해 실행합니다. 이것은 꽤 빠릅니다. 원본 코드 대신 트랜스파일된 코드에 매핑되기 때문에 줄 번호가 올바르게 표시되지 않는 것이 가장 큰 단점입니다. (로더의 소스맵이 없음)

`eval-source-map` - 각 모듈을 `eval()`으로 실행되고 소스맵을 `eval()`에 DataUrl로 추가합니다. 처음에는 느리지만, 리빌드를 빠르게 제공하고 실제 파일을 생성합니다. 줄 번호는 원본 코드에 매핑되므로 올바르게 매핑됩니다. 최고 품질의 개발용 소스맵을 생성합니다.

`eval-cheap-source-map` - `eval-source-map`과 유사하며 각 모듈을 `eval()`으로 실행합니다. 열 매핑이 없고 줄 번호만 매핑하므로 비용이 "저렴"합니다. 로더의 소스맵을 무시하고 `eval` devtool과 비슷하게 트랜스파일 된 코드만 표시합니다.

`eval-cheap-module-source-map` - `eval-cheap-source-map`과 유사하지만, 이 경우 더 나은 결과를 위해 로더의 소스맵을 사용합니다. 그러나 로더의 소스맵은 라인 당 단일 매핑으로 단순화됩니다.

### Special cases

다음 옵션은 개발이나 프로덕션에 적합하지 않습니다. 써드 파티 도구를 사용하는 등, 특별한 경우에 필요합니다.

`inline-source-map` - 소스맵을 DataUrl로 번들에 추가합니다.

`cheap-source-map` - 로더 소스맵을 무시하고 열 매핑이 없는 소스맵입니다.

`inline-cheap-source-map` - `cheap-source-map`과 유사하지만, 소스맵을 DataUrl로 번들에 추가합니다.

`cheap-module-source-map` - 열 매핑이없는 소스맵이며 로더의 소스맵을 줄 당 단일 매핑으로 단순화합니다.

`inline-cheap-module-source-map` - `cheap-module-source-map`과 비슷하지만, 소스맵을 DataUrl로 번들에 추가합니다.

### Production

아래의 옵션은 일반적으로 프로덕션에서 사용됩니다.

`(none)`(`devtool` 옵션 생략) - 소스맵을 내보내지 않습니다. 이것은 시작하기에 좋은 옵션입니다.

`source-map` - 전체 소스맵을 별도의 파일로 내보냅니다. 번들에 참조 주석을 추가하여 개발 도구에서 찾을 수 있도록 합니다.

W> 일반 사용자가 소스맵 파일에 접근 할 수 없도록 서버를 구성해야합니다!

`hidden-source-map` - `source-map`과 동일하지만 번들에 참조 주석을 추가하지 않습니다. 오류 보고서의 오류 스텍 추적에만 소스맵을 매핑하고 브라우저 개발 도구에는 소스맵을 노출하지 않는 경우에 유용합니다.

W> 소스맵 파일을 웹 서버에 배포해서는 안됩니다. 오류 보고 툴링에만 사용하세요.

`nosources-source-map` - `sourcesContent`없이 소스맵이 생성됩니다. 모든 소스 코드를 노출하지 않고 클라이언트에서 스텍 추적을 매핑하는 데 사용할 수 있습니다. 소스맵 파일을 웹 서버에 배포 할 수 있습니다.

W> 디컴파일을 위한 파일 이름과 구조를 노출하지만 원본 코드는 노출하지 않습니다.

T> 기본 webpack `minimizer`가 재정의된 경우 (예를 들어 `terser-webpack-plugin` 옵션 사용자 정의한 경우), 소스맵 지원을 활성화하려면 `sourceMap: true`를 대신 구성해야 합니다.
