---
title: Asset Management
sort: 2
contributors:
  - skipjack
  - michael-ciniawsky
  - TheDutchCoder
  - sudarsangp
  - chenxsan
  - EugeneHlushko
  - AnayaDesign
  - wizardofhogwarts
  - astonizer
translators:
  - keipark
---

처음부터 가이드를 따라왔다면 이제 "Hello webpack"을 표시하는 작은 프로젝트가 생성되었을 것입니다. 이제 이미지와 같은 다른 애셋을 통합하고, 애셋이 어떻게 처리되는지 살펴보겠습니다.

webpack 이전에 프런트엔드 개발자는 [grunt](https://gruntjs.com/)와 [gulp](https://gulpjs.com/) 같은 도구를 사용하여 애셋을 처리하고 `/src` 폴더에서 `/dist` 또는 `/build` 디렉터리로 옮겼습니다. JavaScript 모듈에도 동일한 아이디어가 사용되었지만, webpack과 같은 도구는 모든 의존성을 **동적으로 번들합니다.** ([디펜던시 그래프](/concepts/dependency-graph)로 알려진 것을 생성합니다). 이것이 좋은 이유는 이제 모든 모듈이 **의존성을 명확하게 명시하고** 사용하지 않는 모듈을 번들에서 제외할 수 있기 때문입니다.

webpack의 가장 멋진 기능 중 하나는 JavaScript 외에도 로더 또는 내장 [애셋 모듈](/guides/asset-modules/)이 지원하는 **다른 유형의 파일도 포함** 할 수 있다는 것입니다. 즉, 위에 나열된 JavaScript의 이점(예: 명시적 의존성)을 웹 사이트 또는 웹 앱을 만드는 데 사용한 모든 것에 적용할 수 있습니다. 이미 설정에 익숙 할 수 있는 CSS부터 시작해 보겠습니다.

## Setup

시작하기 전에 프로젝트를 조금 변경해 보겠습니다.

**dist/index.html**

```diff
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8" />
-    <title>Getting Started</title>
+    <title>Asset Management</title>
   </head>
   <body>
-    <script src="main.js"></script>
+    <script src="bundle.js"></script>
   </body>
 </html>
```

**webpack.config.js**

```diff
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
-    filename: 'main.js',
+    filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

## Loading CSS

JavaScript 모듈 내에서 CSS 파일을 `import` 하려면 [style-loader](/loaders/style-loader)와 [css-loader](/loaders/css-loader)를 설치하고 [`module` 설정](/configuration/module)에 추가해야 합니다.

```bash
npm install --save-dev style-loader css-loader
```

**webpack.config.js**

```diff
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
+  module: {
+    rules: [
+      {
+        test: /\.css$/i,
+        use: ['style-loader', 'css-loader'],
+      },
+    ],
+  },
 };
```

모듈 로더는 체인으로 연결할 수 있습니다. 체인의 각 로더는 리소스에 변형을 적용합니다. 체인은 역순으로 실행됩니다. 첫 번째 로더는 결과(변형이 적용된 리소스)를 다음 로더로 전달합니다. 마지막으로 webpack은 체인의 마지막 로더가 JavaScript를 반환할 것으로 예상합니다.

위의 로더 순서는 유지되어야 합니다. [`'style-loader'`](/loaders/style-loader)가 먼저 오고 그 뒤에 [`'css-loader'`](/loaders/css-loader)가 따라오게 됩니다. 이 컨벤션을 따르지 않으면 webpack에서 오류가 발생할 수 있습니다.

T> webpack은 정규 표현식을 사용하여 어떤 파일을 찾아 특정 로더에 전달해야 하는지 알아냅니다. 이 경우 `.css`로 끝나는 모든 파일은 `style-loader`와 `css-loader`에 전달됩니다.

이렇게 하면 스타일이 필요한 파일에 `import './style.css'`하여 가져올 수 있습니다. 이제 모듈이 실행될 때 html 파일의 `<head>`에 문자열화 된 CSS가 `<style>`태그로 삽입됩니다.

이제 새로운 `style.css` 파일을 프로젝트에 추가하고 `index.js`로 가져와 볼까요?

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- style.css
    |- index.js
  |- /node_modules
```

**src/style.css**

```css
.hello {
  color: red;
}
```

**src/index.js**

```diff
 import _ from 'lodash';
+import './style.css';

 function component() {
   const element = document.createElement('div');

   // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+  element.classList.add('hello');

   return element;
 }

 document.body.appendChild(component());
```

이제 빌드 커맨드를 실행합니다.

```bash
$ npm run build

...
[webpack-cli] Compilation finished
asset bundle.js 72.6 KiB [emitted] [minimized] (name: main) 1 related asset
runtime modules 1000 bytes 5 modules
orphan modules 326 bytes [orphan] 1 module
cacheable modules 539 KiB
  modules by path ./node_modules/ 538 KiB
    ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
    ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 6.67 KiB [built] [code generated]
    ./node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
  modules by path ./src/ 965 bytes
    ./src/index.js + 1 modules 639 bytes [built] [code generated]
    ./node_modules/css-loader/dist/cjs.js!./src/style.css 326 bytes [built] [code generated]
webpack 5.4.0 compiled successfully in 2231 ms
```

브라우저에서 `dist/index.html`을 다시 열면 이제 `Hello webpack`이 빨간색으로 표시됩니다. webpack이 무엇을 했는지 확인하려면 페이지를 검사하여 head 태그를 살펴보세요. (`<style>`태그는 JavaScript를 통해 동적으로 생성되며 결과를 표시하지 않으므로 페이지 소스를 확인하지 마세요) head 태그에 `index.js`에서 가져온 스타일 블록이 포함되어 있을 것입니다.

대부분의 경우 필수겠지만, 이제 프로덕션에서 로드 시간을 단축하기 위해 [css를 압축](/plugins/mini-css-extract-plugin/#minimizing-for-production) 할 수 있습니다. 또한 생각할 수 있는 거의 모든 종류의 CSS 로더가 존재합니다. 몇 가지 예를 들면 [postcss](/loaders/postcss-loader), [sass](/loaders/sass-loader) 및 [less](/loaders/less-loader) 등이 있습니다.

## Loading Images

이제 CSS는 가져왔는데, 배경이나 아이콘과 같은 이미지는 어떻게 할까요? 이미지도 webpack 5부터 내장된 [Asset Modules](/guides/asset-modules/)를 사용하여 시스템에 쉽게 통합할 수 있습니다.

**webpack.config.js**

```diff
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
+      {
+        test: /\.(png|svg|jpg|jpeg|gif)$/i,
+        type: 'asset/resource',
+      },
     ],
   },
 };
```

이제 `import myImage from './my-image.png'`를 사용하면 해당 이미지가 처리되어 `output` 디렉터리에 추가됩니다. _그리고_ `MyImage` 변수는 이미지의 최종 URL을 포함합니다. 위와 같이 [css-loader](/loaders/css-loader)를 사용하면 CSS 내의 `url('./my-image.png')`에도 유사한 프로세스가 적용됩니다. 로더는 이것이 로컬 파일임을 인식하고` './my-image.png'` 경로를 `output` 디렉터리에 있는 이미지의 최종 경로로 변경합니다. [html-loader](/loaders/html-loader)는 `<img src="./my-image.png" />`를 동일한 방식으로 처리합니다.

이제 프로젝트에 이미지를 추가하고 어떻게 작동하는지 살펴볼까요? 원하는 이미지를 아무거나 사용해도 좋습니다.

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

**src/index.js**

```diff
 import _ from 'lodash';
 import './style.css';
+import Icon from './icon.png';

 function component() {
   const element = document.createElement('div');

   // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');

+  // 원래 있던 div 에 이미지를 추가합니다.
+  const myIcon = new Image();
+  myIcon.src = Icon;
+
+  element.appendChild(myIcon);
+
   return element;
 }

 document.body.appendChild(component());
```

**src/style.css**

```diff
 .hello {
   color: red;
+  background: url('./icon.png');
 }
```

새 빌드를 만들고 `index.html` 파일을 다시 엽니다.

```bash
$ npm run build

...
[webpack-cli] Compilation finished
assets by status 9.88 KiB [cached] 1 asset
asset bundle.js 73.4 KiB [emitted] [minimized] (name: main) 1 related asset
runtime modules 1.82 KiB 6 modules
orphan modules 326 bytes [orphan] 1 module
cacheable modules 540 KiB (javascript) 9.88 KiB (asset)
  modules by path ./node_modules/ 539 KiB
    modules by path ./node_modules/css-loader/dist/runtime/*.js 2.38 KiB
      ./node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
      ./node_modules/css-loader/dist/runtime/getUrl.js 830 bytes [built] [code generated]
    ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
    ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 6.67 KiB [built] [code generated]
  modules by path ./src/ 1.45 KiB (javascript) 9.88 KiB (asset)
    ./src/index.js + 1 modules 794 bytes [built] [code generated]
    ./src/icon.png 42 bytes (javascript) 9.88 KiB (asset) [built] [code generated]
    ./node_modules/css-loader/dist/cjs.js!./src/style.css 648 bytes [built] [code generated]
webpack 5.4.0 compiled successfully in 1972 ms
```

모든 것이 순조롭게 진행되었다면 이제 아이콘이 반복해서 배경으로 표시되고, `Hello webpack` 텍스트 옆에 `img` 요소가 보이게 됩니다. 이 요소를 살펴보면 실제 파일 이름이 `29822eaa871e8eadeaa4.png`와 같이 변경된 것을 볼 수 있습니다. 이것은 webpack이 `src` 폴더에서 파일을 찾아서 처리했음을 의미합니다!

## Loading Fonts

그렇다면 폰트와 같은 다른 애셋은 어떨까요? 애셋 모듈은 로드한 모든 파일을 가져와 빌드 디렉터리로 내보냅니다. 즉, 폰트를 포함한 모든 종류의 파일에 사용할 수 있습니다. 폰트 파일을 처리하도록 `webpack.config.js`를 업데이트해 보겠습니다.

**webpack.config.js**

```diff
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
+      {
+        test: /\.(woff|woff2|eot|ttf|otf)$/i,
+        type: 'asset/resource',
+      },
     ],
   },
 };
```

프로젝트에 몇 개의 폰트 파일을 추가합니다.

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- my-font.woff
+   |- my-font.woff2
    |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

로더를 설정하고 폰트가 맞는 위치에 있으면 `@font-face` 선언을 통해 적용 할 수 있습니다. 로컬 `url(...)` 지시문은 이미지와 마찬가지로 webpack에서 골라냅니다.

**src/style.css**

```diff
+@font-face {
+  font-family: 'MyFont';
+  src: url('./my-font.woff2') format('woff2'),
+    url('./my-font.woff') format('woff');
+  font-weight: 600;
+  font-style: normal;
+}
+
 .hello {
   color: red;
+  font-family: 'MyFont';
   background: url('./icon.png');
 }
```

이제 새 빌드를 실행하고 webpack이 폰트를 처리했는지 살펴보겠습니다.

```bash
$ npm run build

...
[webpack-cli] Compilation finished
assets by status 9.88 KiB [cached] 1 asset
assets by info 33.2 KiB [immutable]
  asset 55055dbfc7c6a83f60ba.woff 18.8 KiB [emitted] [immutable] [from: src/my-font.woff] (auxiliary name: main)
  asset 8f717b802eaab4d7fb94.woff2 14.5 KiB [emitted] [immutable] [from: src/my-font.woff2] (auxiliary name: main)
asset bundle.js 73.7 KiB [emitted] [minimized] (name: main) 1 related asset
runtime modules 1.82 KiB 6 modules
orphan modules 326 bytes [orphan] 1 module
cacheable modules 541 KiB (javascript) 43.1 KiB (asset)
  javascript modules 541 KiB
    modules by path ./node_modules/ 539 KiB
      modules by path ./node_modules/css-loader/dist/runtime/*.js 2.38 KiB 2 modules
      ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
      ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 6.67 KiB [built] [code generated]
    modules by path ./src/ 1.98 KiB
      ./src/index.js + 1 modules 794 bytes [built] [code generated]
      ./node_modules/css-loader/dist/cjs.js!./src/style.css 1.21 KiB [built] [code generated]
  asset modules 126 bytes (javascript) 43.1 KiB (asset)
    ./src/icon.png 42 bytes (javascript) 9.88 KiB (asset) [built] [code generated]
    ./src/my-font.woff2 42 bytes (javascript) 14.5 KiB (asset) [built] [code generated]
    ./src/my-font.woff 42 bytes (javascript) 18.8 KiB (asset) [built] [code generated]
webpack 5.4.0 compiled successfully in 2142 ms
```

`dist/index.html`을 다시 열고 `Hello webpack` 텍스트가 새 폰트로 변경되었는지 확인합니다. 모든 것이 잘되었다면, 변경된 폰트를 확인할 수 있을 것입니다.

## Loading Data

로드할 수 있는 또 다른 유용한 애셋은 JSON 파일, CSV, TSV 및 XML과 같은 데이터입니다. JSON 지원은 기본으로 내장되어 있으며 NodeJS와 유사합니다. 즉, 기본적으로 `import Data from './data.json'`이 동작합니다. CSV, TSV 및 XML을 가져오려면 [csv-loader](https://github.com/theplatapi/csv-loader) 및 [xml-loader](https://github.com/gisikw/xml)를 사용할 수 있습니다. 세 가지 모두 로드해 보겠습니다.

```bash
npm install --save-dev csv-loader xml-loader
```

**webpack.config.js**

```diff
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/i,
         type: 'asset/resource',
       },
+      {
+        test: /\.(csv|tsv)$/i,
+        use: ['csv-loader'],
+      },
+      {
+        test: /\.xml$/i,
+        use: ['xml-loader'],
+      },
     ],
   },
 };
```

프로젝트에 데이터 파일을 추가합니다.

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- data.xml
+   |- data.csv
    |- my-font.woff
    |- my-font.woff2
    |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

**src/data.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Mary</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Call Cindy on Tuesday</body>
</note>
```

**src/data.csv**

```csv
to,from,heading,body
Mary,John,Reminder,Call Cindy on Tuesday
Zoe,Bill,Reminder,Buy orange juice
Autumn,Lindsey,Letter,I miss you
```

이제 네 가지 데이터 유형(JSON, CSV, TSV, XML) 중 하나를 `import` 할 수 있으며, 가져오는 `Data` 변수에는 파싱된 JSON이 포함되어 쉽게 사용할 수 있습니다.

**src/index.js**

```diff
 import _ from 'lodash';
 import './style.css';
 import Icon from './icon.png';
+import Data from './data.xml';
+import Notes from './data.csv';

 function component() {
   const element = document.createElement('div');

   // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');

   // Add the image to our existing div.
   const myIcon = new Image();
   myIcon.src = Icon;

   element.appendChild(myIcon);

+  console.log(Data);
+  console.log(Notes);
+
   return element;
 }

 document.body.appendChild(component());
```

`npm run build` 명령을 다시 실행하고 `dist/index.html`을 엽니다. 개발자 도구의 콘솔에 가져온 데이터가 기록되는 것을 볼 수 있습니다!

T> 이것은 [d3](https://github.com/d3)와 같은 도구를 사용하여 데이터를 시각화할 때 특히 유용할 수 있습니다. ajax 요청을 만들고 런타임에 데이터를 파싱하는 대신 빌드 프로세스 중 모듈에 로드하여 모듈이 브라우저에 도달하자마자 파싱된 데이터가 준비되도록 합니다.

W> JSON 모듈의 기본 내보내기만 경고 없이 사용할 수 있습니다.

```javascript
// 경고 없음
import data from './data.json';

// 스펙에서 허용하지 않으므로 경고가 노출됨
import { foo } from './data.json';
```

### Customize parser of JSON modules

특정 webpack 로더 대신 [커스텀 파서](/configuration/modules# ruleparserparse)를 사용하여 `toml`, `yaml` 또는 `json5` 파일을 JSON 모듈로 가져올 수 있습니다.

`src` 폴더에 `data.toml`, `data.yaml` 및 `data.json5` 파일이 있다고 가정해 보겠습니다.

**src/data.toml**

```toml
title = "TOML Example"

[owner]
name = "Tom Preston-Werner"
organization = "GitHub"
bio = "GitHub Cofounder & CEO\nLikes tater tots and beer."
dob = 1979-05-27T07:32:00Z
```

**src/data.yaml**

```yaml
title: YAML Example
owner:
  name: Tom Preston-Werner
  organization: GitHub
  bio: |-
    GitHub Cofounder & CEO
    Likes tater tots and beer.
  dob: 1979-05-27T07:32:00.000Z
```

**src/data.json5**

```json5
{
  // comment
  title: 'JSON5 Example',
  owner: {
    name: 'Tom Preston-Werner',
    organization: 'GitHub',
    bio: 'GitHub Cofounder & CEO\n\
Likes tater tots and beer.',
    dob: '1979-05-27T07:32:00.000Z',
  },
}
```

먼저 `toml`, `yamljs` 및 `json5` 패키지를 설치합니다.

```bash
npm install toml yamljs json5 --save-dev
```

그리고 webpack 설정에 추가합니다.

**webpack.config.js**

```diff
 const path = require('path');
+const toml = require('toml');
+const yaml = require('yamljs');
+const json5 = require('json5');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/i,
         type: 'asset/resource',
       },
       {
         test: /\.(csv|tsv)$/i,
         use: ['csv-loader'],
       },
       {
         test: /\.xml$/i,
         use: ['xml-loader'],
       },
+      {
+        test: /\.toml$/i,
+        type: 'json',
+        parser: {
+          parse: toml.parse,
+        },
+      },
+      {
+        test: /\.yaml$/i,
+        type: 'json',
+        parser: {
+          parse: yaml.parse,
+        },
+      },
+      {
+        test: /\.json5$/i,
+        type: 'json',
+        parser: {
+          parse: json5.parse,
+        },
+      },
     ],
   },
 };
```

**src/index.js**

```diff
 import _ from 'lodash';
 import './style.css';
 import Icon from './icon.png';
 import Data from './data.xml';
 import Notes from './data.csv';
+import toml from './data.toml';
+import yaml from './data.yaml';
+import json from './data.json5';
+
+console.log(toml.title); // output `TOML Example`
+console.log(toml.owner.name); // output `Tom Preston-Werner`
+
+console.log(yaml.title); // output `YAML Example`
+console.log(yaml.owner.name); // output `Tom Preston-Werner`
+
+console.log(json.title); // output `JSON5 Example`
+console.log(json.owner.name); // output `Tom Preston-Werner`

 function component() {
   const element = document.createElement('div');

   // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');

   // Add the image to our existing div.
   const myIcon = new Image();
   myIcon.src = Icon;

   element.appendChild(myIcon);

   console.log(Data);
   console.log(Notes);

   return element;
 }

 document.body.appendChild(component());
```

`npm run build` 명령을 다시 실행하고 `dist/index.html`을 확인합니다. 가져온 데이터가 콘솔에 기록되는 것을 볼 수 있습니다!

## Global Assets

위에서 언급 한 모든 것 중 가장 멋진 점은 이러한 방식으로 애셋을 로드하면 모듈과 애셋을 보다 직관적인 방식으로 그룹화할 수 있다는 것입니다. 모든 것을 포함한 글로벌 `/assets` 디렉터리에 의존하는 대신 애셋을 사용하는 코드와 그룹화할 수 있습니다. 예를 들어 다음과 같은 구조가 유용할 수 있습니다.

```diff
- |- /assets
+ |– /components
+ |  |– /my-component
+ |  |  |– index.jsx
+ |  |  |– index.css
+ |  |  |– icon.svg
+ |  |  |– img.png
```

이러한 설정은 밀접하게 연결된 모든 것이 함께 있기 때문에 코드를 다른 곳에 훨씬 더 쉽게 적용할 수 있도록 합니다. 다른 프로젝트에서 `/my-component`를 사용한다고 가정해 봅시다. 간단히 복사하거나 다른 프로젝트의 `/components` 디렉터리로 옮기면 됩니다. _외부 의존성을_ 설치하고 _설정에 동일한 로더가 정의되어있는 한_ 아무 문제가 없습니다.

그러나 예전 방식을 고수하고 있거나 여러 컴포넌트(뷰, 템플릿, 모듈 등) 간에 공유되는 애셋이 있다고 가정해 보겠습니다. 이러한 애셋을 기본 디렉터리에 저장하는 것도 가능하며 [aliasing](/configuration/resolve/#resolvealias)을 사용하여 쉽게 `import` 할 수 있습니다.

## Wrapping up

다음 가이드에서는 이 가이드에서 사용한 각기 다른 애셋을 모두 사용하지 않을 것이므로 다음 가이드인 [Output Management](https://webpack.js.org/guides/output-management/) 준비를 위해 정리를 해 보겠습니다.

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
-   |- data.csv
-   |- data.json5
-   |- data.toml
-   |- data.xml
-   |- data.yaml
-   |- icon.png
-   |- my-font.woff
-   |- my-font.woff2
-   |- style.css
    |- index.js
  |- /node_modules
```

**webpack.config.js**

```diff
 const path = require('path');
-const toml = require('toml');
-const yaml = require('yamljs');
-const json5 = require('json5');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
-  module: {
-    rules: [
-      {
-        test: /\.css$/i,
-        use: ['style-loader', 'css-loader'],
-      },
-      {
-        test: /\.(png|svg|jpg|jpeg|gif)$/i,
-        type: 'asset/resource',
-      },
-      {
-        test: /\.(woff|woff2|eot|ttf|otf)$/i,
-        type: 'asset/resource',
-      },
-      {
-        test: /\.(csv|tsv)$/i,
-        use: ['csv-loader'],
-      },
-      {
-        test: /\.xml$/i,
-        use: ['xml-loader'],
-      },
-      {
-        test: /\.toml$/i,
-        type: 'json',
-        parser: {
-          parse: toml.parse,
-        },
-      },
-      {
-        test: /\.yaml$/i,
-        type: 'json',
-        parser: {
-          parse: yaml.parse,
-        },
-      },
-      {
-        test: /\.json5$/i,
-        type: 'json',
-        parser: {
-          parse: json5.parse,
-        },
-      },
-    ],
-  },
 };
```

**src/index.js**

```diff
 import _ from 'lodash';
-import './style.css';
-import Icon from './icon.png';
-import Data from './data.xml';
-import Notes from './data.csv';
-import toml from './data.toml';
-import yaml from './data.yaml';
-import json from './data.json5';
-
-console.log(toml.title); // output `TOML Example`
-console.log(toml.owner.name); // output `Tom Preston-Werner`
-
-console.log(yaml.title); // output `YAML Example`
-console.log(yaml.owner.name); // output `Tom Preston-Werner`
-
-console.log(json.title); // output `JSON5 Example`
-console.log(json.owner.name); // output `Tom Preston-Werner`

 function component() {
   const element = document.createElement('div');

-  // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-  element.classList.add('hello');
-
-  // Add the image to our existing div.
-  const myIcon = new Image();
-  myIcon.src = Icon;
-
-  element.appendChild(myIcon);
-
-  console.log(Data);
-  console.log(Notes);

   return element;
 }

 document.body.appendChild(component());
```

그리고 추가했던 의존성을 제거합니다.

```bash
npm uninstall css-loader csv-loader json5 style-loader toml xml-loader yamljs
```

## Next guide

이제 [Output Management](https://webpack.js.org/guides/output-management/)로 넘어가 보겠습니다.

## Further Reading

- SurviveJS의 [Loading Fonts](https://survivejs.com/webpack/loading/fonts/)
