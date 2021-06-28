---
title: SourceMapDevToolPlugin
group: webpack
contributors:
  - johnnyreilly
  - simon04
  - neilkennedy
  - byzyk
  - EugeneHlushko
translators:
  - Eunbin-Kim
related:
  - title: Building Source Maps
    url: https://survivejs.com/webpack/building/source-maps/#-sourcemapdevtoolplugin-and-evalsourcemapdevtoolplugin-
---

이 플러그인을 사용하면 소스맵 생성을 더욱더 세밀하게 제어 할 수 있습니다. 이 플러그인은 [`devtool`](/configuration/devtool)의 설정 옵션을 통해 자동으로 활성화됩니다.

```js
new webpack.SourceMapDevToolPlugin(options);
```

## Options

다음과 같은 옵션이 제공됩니다.

- `test` (`string` `RegExp` `[string, RegExp]`): 확장자에 따라 소스맵을 포함합니다. (기본값은 `.js`, `.mjs` 및 `.css`).
- `include` (`string` `RegExp` `[string, RegExp]`): 값과 일치하는 경로의 소스맵을 포함합니다.
- `exclude` (`string` `RegExp` `[string, RegExp]`): 값과 일치하는 모듈을 소스맵 생성에서 제외합니다.
- `filename` (`string`): 소스맵의 파일 이름을 정의합니다 (값이 제공되지 않으면 인라인으로 설정됩니다).
- `append` (`string`): 기존 애셋에 값을 추가합니다. 일반적으로 `#sourceMappingURL` 주석이 사용됩니다. `[url]`은 소스맵 파일의 URL로 대체됩니다. webpack v4.36.0부터는 `[chunk]`, `[filename]` 및 `[contenthash]`와 같은 경로 파라미터가 지원됩니다. `false`로 설정하면 값 추가가 비활성화됩니다.
- `moduleFilenameTemplate` (`string`): [`output.devtoolModuleFilenameTemplate`](/configuration/output/#outputdevtoolmodulefilenametemplate)를 참고하세요.
- `fallbackModuleFilenameTemplate` (`string`): 위 링크를 참고하세요.
- `namespace` (`string`): [`output.devtoolNamespace`](/configuration/output/#outputdevtoolnamespace)를 참고하세요.
- `module = true` (`boolean`): 로더가 소스맵을 생성해야 하는지 여부를 나타냅니다.
- `columns = true` (`boolean`): 열 매핑을 사용해야 하는지 여부를 나타냅니다.
- `noSources = false` (`boolean`): 소스의 내용이 소스맵에 포함되지 않도록 합니다.
- `publicPath` (`string`): public path 접두사와 함께 절대 URL을 내보냅니다. (예: `https://example.com/project/`)
- `fileContext` (`string`): 이 디렉터리를 기준으로 `[file]` 인수를 만듭니다.
- `sourceRoot` (`string`): 소스맵의 `sourceRoot` 프로퍼티에 커스텀 값을 제공합니다.

`fileContext` 옵션은 `../../`가 절대 `[url]`에 나타나지 않도록 상위 디렉터리에 소스맵을 저장하려는 경우에 유용합니다.

T> `module` 또는 `columns`를 `false`로 설정하면 소스맵의 정확도가 떨어지지만, 컴파일 성능이 크게 향상됩니다.

T> [development mode](/configuration/mode/#mode-development)에서 이 플러그인에 대한 설정을 커스텀 하고 싶다면 기본 설정값을 비활성화해야 합니다. 즉, `devtool: false`로 설정해야 합니다.

W> webpack `minimizer`의 기본값이 재정의된 경우 (`TerserPlugin` 옵션 커스텀 등으로 인해), 소스맵 지원을 활성화하려면 `sourceMap: true`로 설정해야 합니다.

## Examples

다음은 이 플러그인의 몇 가지 일반적인 사용 사례입니다.

### Basic Use Case

다음 코드를 사용하여 설정 옵션 `devtool: inline-source-map`을 커스텀 플러그인 설정으로 동등하게 바꿀 수 있습니다.

```js
module.exports = {
  // ...
  devtool: false,
  plugins: [new webpack.SourceMapDevToolPlugin({})],
};
```

### Exclude Vendor Maps

다음 코드는 `vendor.js` 번들 내 모듈의 소스맵을 제외합니다.

```js
new webpack.SourceMapDevToolPlugin({
  filename: '[name].js.map',
  exclude: ['vendor.js'],
});
```

### Host Source Maps Externally

소스맵의 URL을 설정하세요. 인증이 필요한 호스트에 호스팅하는 데 유용합니다.

```js
new webpack.SourceMapDevToolPlugin({
  append: '\n//# sourceMappingURL=https://example.com/sourcemap/[url]',
  filename: '[name].map',
});
```

소스맵이 상위 디렉터리에 저장되는 경우,

```code
project
|- dist
  |- public
    |- bundle-[hash].js
  |- sourcemaps
    |- bundle-[hash].js.map
```

다음과 같이 설정하면

```js
new webpack.SourceMapDevToolPlugin({
  filename: 'sourcemaps/[file].map',
  publicPath: 'https://example.com/project/',
  fileContext: 'public',
});
```

다음 URL을 생성합니다.

```code
https://example.com/project/sourcemaps/bundle-[hash].js.map
```
