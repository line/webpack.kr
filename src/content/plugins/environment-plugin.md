---
title: EnvironmentPlugin
group: webpack
contributors:
  - simon04
  - einarlove
  - rouzbeh84
  - byzyk
translators:
  - moonheekim0118
---

`EnvironmentPlugin`을 사용해 [`process.env`](https://nodejs.org/api/process.html#process_process_env) 키에 [`DefinePlugin`](/plugins/define-plugin)을 간단히 적용할 수 있습니다.

## Usage

`EnvironmentPlugin`은 키로 구성된 배열 혹은 키에 기본값이 매핑된 객체를 받습니다.

```javascript
new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']);
```

이는 다음과 같은 `DefinePlugin` 적용과 동일합니다.

```javascript
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
});
```

T> 환경 변수를 정의하지 않으면 "`EnvironmentPlugin` - `${key}` environment variable is undefined" 오류가 발생합니다.

## Usage with default values

또는, `EnvironmentPlugin`은 키에 기본값을 매핑한 객체를 지원합니다. 키가 `process.env`에 정의되지 않은 경우에는 기본값을 사용합니다.

```javascript
new webpack.EnvironmentPlugin({
  NODE_ENV: 'development', // process.env.NODE_ENV가 정의되지 않은 경우 'development'를 사용하세요.
  DEBUG: false,
});
```

W> `process.env`의 모든 변수는 문자열이어야 합니다.

T> [`DefinePlugin`](/plugins/define-plugin)과 달리 `EnvironmentPlugin`에 의해서 기본값에 `JSON.stringify`가 적용됩니다.

T> 기본값이 `null`인 경우와 `undefined`인 경우는 다르게 동작합니다. 변수가 번들링 시점에 _제공되어야 한다면_ `undefined`를 사용하고, 선택 사항이라면 `null`을 사용합니다.

W> 만약 환경 변수가 번들링 시점에 발견되지 않는다면 기본값이 제공되지 않습니다. 이때 webpack은 경고 대신 오류를 띄웁니다.

**Example:**

지금까지 구성해온 `EnvironmentPlugin` 설정을 테스트 파일 `entry.js`에 적용했을 때 어떻게 동작하는지 알아봅시다.

```javascript
if (process.env.NODE_ENV === 'production') {
  console.log('Welcome to production');
}
if (process.env.DEBUG) {
  console.log('Debugging output');
}
```

빌드하기 위해 터미널에서 `NODE_ENV=production webpack`을 실행했을 때 `entry.js`는 다음과 같습니다.

```javascript
if ('production' === 'production') {
  // <-- NODE_ENV의 'production'이 사용됩니다.
  console.log('Welcome to production');
}
if (false) {
  // <-- 기본값이 사용됩니다.
  console.log('Debugging output');
}
```

`DEBUG=false webpack`을 실행하면 다음과 같습니다.

```javascript
if ('development' === 'production') {
  // <-- 기본값이 사용됩니다.
  console.log('Welcome to production');
}
if ('false') {
  // <-- DEBUG의 'false'가 사용됩니다.
  console.log('Debugging output');
}
```

## Use Case: Git Version

다음과 같은 `EnvironmentPlugin` 설정은 저장소의 마지막 커밋에 따른 `process.env.GIT_VERSION` (예시 "v5.4.0-2-g25139f57f")과 `process.env.GIT_AUTHOR_DATE` (예시 "2020-11-04T12:25:16+01:00")를 제공합니다.

```javascript
const child_process = require('child_process');
function git(command) {
  return child_process.execSync(`git ${command}`, { encoding: 'utf8' }).trim();
}

new webpack.EnvironmentPlugin({
  GIT_VERSION: git('describe --always'),
  GIT_AUTHOR_DATE: git('log -1 --format=%aI'),
});
```

## `DotenvPlugin`

써드 파티 [`DotenvPlugin`](https://github.com/mrsteele/dotenv-webpack) (`dotenv-webpack`)을 사용해 [dotenv 변수](https://www.npmjs.com/package/dotenv)를 사용할 수 있습니다.

```bash
// .env
DB_HOST=127.0.0.1
DB_PASS=foobar
S3_API=mysecretkey
```

```javascript
new Dotenv({
  path: './.env', // .env 파일 경로 (기본값)
  safe: true, // .env.example 로드 (기본값은 dotenv-safe를 사용하지 않는 "false")
});
```
