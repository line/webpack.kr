---
title: Targets
sort: 10
contributors:
  - TheLarkInn
  - rouzbeh84
  - johnstew
  - srilman
  - byzyk
  - EugeneHlushko
translators:
  - limong
---

JavaScript는 서버와 클라이언트 모두 작성이 가능하기 때문에 webpack은 webpack [설정](/configuration)에서 다수의 배포 _대상을_ 제공합니다.

W> webpack의 `target` 프로퍼티를 `output.libraryTarget` 프로퍼티와 혼동하지 않아야 합니다. 자세한 내용은 `output` 프로퍼티에 대한 [가이드](/concepts/output/)를 확인해 주세요.

## Usage

`target` 프로퍼티를 설정하려면 webpack 설정에서 target 값을 설정하기만 하면 됩니다.

**webpack.config.js**

```javascript
module.exports = {
  target: 'node',
};
```

위 예제에서 `node` webpack을 사용하면 Node.js와 유사한 환경에서 사용할 수 있도록 컴파일됩니다. (Node.js의 `require`를 사용하여 청크를 로드하고 `fs`나 `path`와 같은 모듈은 수정하지 않습니다.)

각 _target은_ 배포와 환경에 관련된 다양한 추가 기능이 있으며, 필요에 맞게 지원됩니다. [사용 가능한 target](/configuration/target/)을 확인하세요.

?> 다른 인기 있는 target 값에 대한 추가 확장

## Multiple Targets

webpack에서는 한 개 이상의 문자열을 `target` 프로퍼티에 전달할 수 **없습니다**. 하지만 두 개의 개별 설정을 번들링하여 동일한 라이브러리를 생성할 수 있습니다.

**webpack.config.js**

```javascript
const path = require('path');
const serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js',
  },
  //…
};

const clientConfig = {
  target: 'web', // <=== 기본값은 'web'이므로 생략 가능
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js',
  },
  //…
};

module.exports = [serverConfig, clientConfig];
```

위 예제에서는 `dist` 폴더에 `lib.js`와 `lib.node.js` 파일을 생성합니다.

## Resources

위의 옵션에서 볼 수 있듯이 여러 배포 _target을_ 선택할 수 있습니다. 다음은 참고할 수 있는 예제 및 리소스 목록입니다.

- **[compare-webpack-target-bundles](https://github.com/TheLarkInn/compare-webpack-target-bundles)**: 다양한 webpack _target을_ 테스트하고 볼 수 있는 유용한 리소스 입니다. 그리고 버그 리포팅에도 유용합니다.
- **[Boilerplate of Electron-React Application](https://github.com/chentsulin/electron-react-boilerplate)**: electron의 메인 프로세스와 렌더러 프로세스에 대한 빌드 프로세스의 좋은 예입니다.

?> 라이브 코드나 보일러플레이트에서 사용되는 webpack target의 최신 예제를 찾아야 합니다.
