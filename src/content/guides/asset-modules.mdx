---
title: Asset Modules
sort: 25
contributors:
  - smelukov
  - EugeneHlushko
  - chenxsan
  - anshumanv
  - spence-s
translators:
  - keipark
related:
  - title: webpack 5 - Asset Modules
    url: https://dev.to/smelukov/webpack-5-asset-modules-2o3h
---

애셋 모듈은 로더를 추가로 구성하지 않아도 애셋 파일(폰트, 아이콘 등)을 사용할 수 있도록 해주는 모듈입니다.

webpack 5 이전에는 아래의 로더를 사용하는 것이 일반적이었습니다.

- [`raw-loader`](/loaders/raw-loader/) 파일을 문자열로 가져올 때
- [`url-loader`](/loaders/url-loader/) 파일을 data URI 형식으로 번들에 인라인 추가 할 때
- [`file-loader`](/loaders/file-loader/) 파일을 출력 디렉터리로 내보낼 때

이러한 로더를 대체하기 위해서 애셋 모듈에는 4개의 새로운 모듈 유형이 추가되었습니다.

- `asset/resource`는 별도의 파일을 내보내고 URL을 추출합니다. 이전에는 `file-loader`를 사용하여 처리할 수 있었습니다.
- `asset/inline`은 애셋의 data URI를 내보냅니다. 이전에는 `url-loader`를 사용하여 처리할 수 있었습니다.
- `asset/source`는 애셋의 소스 코드를 내보냅니다. 이전에는`raw-loader`를 사용하여 처리할 수 있었습니다.
- `asset`은 data URI와 별도의 파일 내보내기 중에서 자동으로 선택합니다. 이전에는 애셋 크기 제한이 있는 `url-loader`를 사용했습니다.

webpack 5의 애셋 모듈과 함께 이전 애셋 로더(예 :`file-loader`/`url-loader`/`raw-loader`)를 사용할 때 애셋 모듈이 애셋을 중복으로 처리하지 않도록 할 수 있습니다. 이는 애셋의 모듈 유형을 `'javascript/auto'`로 설정하여 적용 가능합니다.

**webpack.config.js**

```diff
module.exports = {
  module: {
   rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          },
        ],
+       type: 'javascript/auto'
      },
   ]
  },
}
```

애셋 로더의 새로운 URL 호출에서 발생한 애셋을 제외하려면 로더 설정에 `dependency : {not: ['url']}`을 추가합니다.

**webpack.config.js**

```diff
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
+       dependency: { not: ['url'] },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  }
}
```

## Resource assets

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
+ module: {
+   rules: [
+     {
+       test: /\.png/,
+       type: 'asset/resource'
+     }
+   ]
+ },
};
```

**src/index.js**

```js
import mainImage from './images/main.png';

img.src = mainImage; // '/dist/151cfcfa1bd74779aadb.png'
```

모든 `.png` 파일을 출력 디렉터리로 내보내고 해당 경로를 번들에 삽입합니다.

### Custom output filename

파일을 출력 디렉터리로 내보낼 때 `asset/resource` 모듈은 기본적으로 `[hash][ext][query]` 파일명을 사용합니다.

webpack 설정에서 [`output.assetModuleFilename`](/configuration/output/#outputassetmodulefilename)을 설정하여 이 템플릿을 수정할 수 있습니다.

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
+   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
  },
};
```

특정 디렉터리에 애셋을 내보낼때 출력 파일명을 사용자 정의하는 경우도 있습니다.

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
+   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
-     }
+     },
+     {
+       test: /\.html/,
+       type: 'asset/resource',
+       generator: {
+         filename: 'static/[hash][ext][query]'
+       }
+     }
    ]
  },
};
```

이 설정을 통해 모든 `html` 파일을 출력 디렉터리 내의 `static` 디렉터리로 내보내게 됩니다.

`Rule.generator.filename`은 [`output.assetModuleFilename`](/configuration/output/#outputassetmodulefilename)과 같으며 `asset` 및 `asset/resource` 모듈에서만 동작합니다.

## Inlining assets

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
-   assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
-       test: /\.png/,
-       type: 'asset/resource'
+       test: /\.svg/,
+       type: 'asset/inline'
-     },
+     }
-     {
-       test: /\.html/,
-       type: 'asset/resource',
-       generator: {
-         filename: 'static/[hash][ext][query]'
-       }
-     }
    ]
  }
};
```

**src/index.js**

```diff
- import mainImage from './images/main.png';
+ import metroMap from './images/metro.svg';

- img.src = mainImage; // '/dist/151cfcfa1bd74779aadb.png'
+ block.style.background = `url(${metroMap})`; // url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo...vc3ZnPgo=)
```

모든 `.svg` 파일은 data URI로 번들에 삽입됩니다.

### Custom data URI generator

기본적으로 webpack에서 내보낸 data URI는 Base64 알고리즘을 사용하여 인코딩된 파일 콘텐츠를 의미합니다.

커스텀 인코딩 알고리즘을 사용하려면, 파일 콘텐츠 인코딩을 위한 커스텀 함수를 지정해야 합니다.

**webpack.config.js**

```diff
const path = require('path');
+ const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        type: 'asset/inline',
+       generator: {
+         dataUrl: content => {
+           content = content.toString();
+           return svgToMiniDataURI(content);
+         }
+       }
      }
    ]
  },
};
```

이제 모든 `.svg` 파일이 `mini-svg-data-uri` 패키지를 통해 인코딩됩니다.

## Source assets

**webpack.config.js**

```diff
const path = require('path');
- const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
-       test: /\.svg/,
-       type: 'asset/inline',
-       generator: {
-         dataUrl: content => {
-           content = content.toString();
-           return svgToMiniDataURI(content);
-         }
-       }
+       test: /\.txt/,
+       type: 'asset/source',
      }
    ]
  },
};
```

**src/example.txt**

```text
Hello world
```

**src/index.js**

```diff
- import metroMap from './images/metro.svg';
+ import exampleText from './example.txt';

- block.style.background = `url(${metroMap}); // url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo...vc3ZnPgo=)
+ block.textContent = exampleText; // 'Hello world'
```

모든 `.txt` 파일은 있는 그대로 번들에 삽입됩니다.

## URL assets

`new URL('./path/to/asset', import.meta.url)`을 사용할 때 webpack은 애셋 모듈도 함께 생성합니다.

**src/index.js**

```js
const logo = new URL('./logo.svg', import.meta.url);
```

설정의 [`target`](/configuration/target/)에 따라 webpack은 위 코드를 다른 결과로 컴파일합니다.

```js
// target: web
new URL(
  __webpack_public_path__ + 'logo.svg',
  document.baseURI || self.location.href
);

// target: webworker
new URL(__webpack_public_path__ + 'logo.svg', self.location);

// target: node, node-webkit, nwjs, electron-main, electron-renderer, electron-preload, async-node
new URL(
  __webpack_public_path__ + 'logo.svg',
  require('url').pathToFileUrl(__filename)
);
```

## General asset type

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
+       test: /\.txt/,
+       type: 'asset',
      }
    ]
  },
};
```

이제 webpack은 기본 조건에 따라서 `resource`와 `inline` 중에서 자동으로 선택합니다. 크기가 8kb 미만인 파일은 `inline` 모듈로 처리되고 그렇지 않으면 `resource` 모듈로 처리됩니다.

webpack 설정의 module rule 단계에서 [`Rule.parser.dataUrlCondition.maxSize`](/configuration/module/#ruleparserdataurlcondition) 옵션을 설정하여 이 조건을 변경할 수 있습니다.

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
+       parser: {
+         dataUrlCondition: {
+           maxSize: 4 * 1024 // 4kb
+         }
+       }
      }
    ]
  },
};
```

또한 [함수를 지정](/configuration/module/#ruleparserdataurlcondition)하여 모듈의 인라인 여부를 결정할 수 있습니다.

## Replacing Inline Loader Syntax

Asset Modules 및 Webpack 5 이전에는, 위에 언급한 레거시 로더와 함께 [inline syntax](https://webpack.js.org/concepts/loaders/#inline)를 사용할 수 있었습니다.

현재는 모든 인라인 로더 구문을 제거하고 resourceQuery 조건을 사용하여 인라인 구문의 기능을 모방하는 것이 좋습니다.

예를 들어, `raw-loader`를 `asset/source` 유형으로 바꾸는 경우입니다.

```diff
- import myModule from 'raw-loader!my-module';
+ import myModule from 'my-module?raw';
```

webpack 설정입니다.

```diff
module: {
    rules: [
    // ...
+     {
+       resourceQuery: /raw/,
+       type: 'asset/source',
+     }
    ]
  },
```

원시 애샛을 다른 로더에서 처리하지 못하도록 제외하려면, 부정적 조건을 사용하십시오.

```diff
module: {
    rules: [
    // ...
+     {
+       test: /\.m?js$/,
+       resourceQuery: { not: [/raw/] },
+       use: [ ... ]
+     },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      }
    ]
  },
```

또는 `oneOf` 규칙 목록입니다. 여기에서는 첫 번째로 일치하는 규칙만 적용됩니다.

```diff
module: {
    rules: [
    // ...
+     { oneOf: [
        {
          resourceQuery: /raw/,
          type: 'asset/source',
        },
+       {
+         test: /\.m?js$/,
+         use: [ ... ]
+       },
+     ] }
    ]
  },
```
