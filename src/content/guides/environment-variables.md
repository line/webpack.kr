---
title: Environment Variables
sort: 8
contributors:
  - simon04
  - grisanu
  - tbroadley
  - legalcodes
  - byzyk
  - jceipek
translators:
  - dkstyle
---

`webpack.config.js`에서 [development와](/guides/development) [production의](/guides/production) 빌드를 명확하게 구분하기 위해 환경 변수를 사용할 수 있습니다.

T> webpack의 환경 변수는 `bash`와 `CMD.exe` 같은 운영체제 쉘에서의 [환경 변수와](https://en.wikipedia.org/wiki/Environment_variable) 다릅니다.

webpack 커맨드라인 [환경 옵션인](/api/cli/#environment-options) `--env` 를 사용하면 원하는 만큼 많은 환경 변수를 전달할 수 있습니다. 환경 변수는 `webpack.config.js`에서 액세스 할 수 있습니다. 예를 들면, `--env production` 나 `--env goal=local`.

```bash
npx webpack --env goal=local --env production --progress
```

T> 할당없이 `env` 변수를 설정하면 `--env production`은 기본적으로 `env.production` 값을 `true`로 설정합니다. 사용할 수 있는 다른 구문도 있습니다. 자세한 내용은 [webpack CLI](/api/cli/#environment-options) 문서를 참고하세요.

webpack 설정을 변경해야 할 사항이 있습니다. 일반적으로, `module.exports`는 설정 객체를 가리킵니다. `env` 변수를 사용하려면 `module.exports`를 함수로 변환해야 합니다.

**webpack.config.js**

```js
const path = require('path');

module.exports = (env) => {
  // 여기에서 env.<변수> 를 사용하세요.
  console.log('Goal: ', env.goal); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
```

T> Webpack CLI는 webpack 설정 내에서 접근할 수 있는 [빌트인 환경 변수](/api/cli/#environment-variables)를 제공합니다.
