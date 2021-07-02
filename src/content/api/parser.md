---
title: JavascriptParser Hooks
group: Plugins
sort: 12
contributors:
  - byzyk
  - DeTeam
  - misterdev
  - EugeneHlushko
  - chenxsan
---

`compiler`에 있는, `parser` 인스턴스는, webpack에서 처리 중인 각 모듈을 파싱하는 데 사용합니다.
`parser`는 `tapable`을 확장하고 플러그인 작성자가 파싱 프로세스를 커스터마이징 하는데 사용할 수 있는 다양한 `tapable` 훅을 제공하는 또 다른 webpack 클래스입니다.

`parser`는 [NormalModuleFactory](/api/compiler-hooks/#normalmodulefactory)에서 볼 수 있습니다.

```js
compiler.hooks.normalModuleFactory.tap('MyPlugin', (factory) => {
  factory.hooks.parser
    .for('javascript/auto')
    .tap('MyPlugin', (parser, options) => {
      parser.hooks.someHook.tap(/* ... */);
    });
});
```

`compiler`와 마찬가지로, `tapAsync` 그리고 `tapPromise`도 훅 타입에 따라 사용할 수 있습니다.

## Hooks

다음 라이프사이클 훅은 `parser`에 의해 노출되며 접근할 수 있습니다.

### evaluateTypeof

`SyncBailHook`

자유 변수의 `typeof`로 구성된 표현식을 평가할 때 트리거 됩니다.

- 훅 파라미터: `identifier`
- 콜백 파라미터: `expression`

```js
parser.hooks.evaluateTypeof
  .for('myIdentifier')
  .tap('MyPlugin', (expression) => {
    /* ... */
    return expressionResult;
  });
```

이것은 `evaluateTypeof` 훅을 트리거 합니다.

```js
const a = typeof myIdentifier;
```

다음은 트리거 되지 않습니다.

```js
const myIdentifier = 0;
const b = typeof myIdentifier;
```

### evaluate

`SyncBailHook`

표현식을 평가할 때 호출됩니다.

- 훅 파라미터: `expressionType`
- 콜백 파라미터: `expression`

예제입니다.

**index.js**

```js
const a = new String();
```

**MyPlugin.js**

```js
parser.hooks.evaluate.for('NewExpression').tap('MyPlugin', (expression) => {
  /* ... */
  return expressionResult;
});
```

표현식 타입은 다음과 같습니다.

- `'ArrowFunctionExpression'`
- `'AssignmentExpression'`
- `'AwaitExpression'`
- `'BinaryExpression'`
- `'CallExpression'`
- `'ClassExpression'`
- `'ConditionalExpression'`
- `'FunctionExpression'`
- `'Identifier'`
- `'LogicalExpression'`
- `'MemberExpression'`
- `'NewExpression'`
- `'ObjectExpression'`
- `'SequenceExpression'`
- `'SpreadElement'`
- `'TaggedTemplateExpression'`
- `'TemplateLiteral'`
- `'ThisExpression'`
- `'UnaryExpression'`
- `'UpdateExpression'`

### evaluateIdentifier

`SyncBailHook`

자유 변수인 식별자를 평가할 때 호출됩니다.

- 훅 파라미터: `identifier`
- 콜백 파라미터: `expression`

### evaluateDefinedIdentifier

`SyncBailHook`

정의된 변수 식별자를 평가할 때 호출됩니다.

- 훅 파라미터: `identifier`
- 콜백 파라미터: `expression`

### evaluateCallExpressionMember

`SyncBailHook`

성공적으로 평가된 표현식의 멤버 함수에 대한 호출을 평가할 때 호출됩니다.

- 훅 파라미터: `identifier`
- 콜백 파라미터: `expression` `param`

이 표현식은 다음의 훅을 트리거 합니다.

**index.js**

```js
const a = expression.myFunc();
```

**MyPlugin.js**

```js
parser.hooks.evaluateCallExpressionMember
  .for('myFunc')
  .tap('MyPlugin', (expression, param) => {
    /* ... */
    return expressionResult;
  });
```

### statement

`SyncBailHook`

코드 조각에서 파싱된 모든 구문에 대해 호출되는 범용적 훅입니다.

- 콜백 파라미터: `statement`

```js
parser.hooks.statement.tap('MyPlugin', (statement) => {
  /* ... */
});
```

`statement.type`은 다음과 같을 수 있습니다.

- `'BlockStatement'`
- `'VariableDeclaration'`
- `'FunctionDeclaration'`
- `'ReturnStatement'`
- `'ClassDeclaration'`
- `'ExpressionStatement'`
- `'ImportDeclaration'`
- `'ExportAllDeclaration'`
- `'ExportDefaultDeclaration'`
- `'ExportNamedDeclaration'`
- `'IfStatement'`
- `'SwitchStatement'`
- `'ForInStatement'`
- `'ForOfStatement'`
- `'ForStatement'`
- `'WhileStatement'`
- `'DoWhileStatement'`
- `'ThrowStatement'`
- `'TryStatement'`
- `'LabeledStatement'`
- `'WithStatement'`

### statementIf

`SyncBailHook`

if 구문을 파싱할 때 호출됩니다. `statement` 훅과 동일하지만, `statement.type == 'IfStatement'`인 경우에만 트리거 됩니다.

- 콜백 파라미터: `statement`

### label

`SyncBailHook`

[label](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)이 있는 구문을 파싱할 때 호출됩니다. 이러한 구문에는 `statement.type === 'LabeledStatement'`가 있습니다.

- 훅 파라미터: `labelName`
- 콜백 파라미터: `statement`

### import

`SyncBailHook`

코드 조각의 모든 import 구문에 대해 호출됩니다. `source` 파라미터에는 가져온 파일의 이름이 포함됩니다.

- 콜백 파라미터: `statement` `source`

다음의 import 구문은 훅을 한 번 트리거 합니다.

**index.js**

```js
import _ from 'lodash';
```

**MyPlugin.js**

```js
parser.hooks.import.tap('MyPlugin', (statement, source) => {
  // source == 'lodash'
});
```

### importSpecifier

`SyncBailHook`

모든 `import` 구문의 모든 지정자에 대해 호출됩니다.

- 콜백 파라미터: `statement` `source` `exportName` `identifierName`

다음의 import 구문은 훅을 두 번 트리거 합니다.

**index.js**

```js
import _, { has } from 'lodash';
```

**MyPlugin.js**

```js
parser.hooks.importSpecifier.tap(
  'MyPlugin',
  (statement, source, exportName, identifierName) => {
    /* First call
    source == 'lodash'
    exportName == 'default'
    identifierName == '_'
  */
    /* Second call
    source == 'lodash'
    exportName == 'has'
    identifierName == 'has'
  */
  }
);
```

### export

`SyncBailHook`

코드 조각의 모든 `export` 구문에 대해 호출됩니다.

- 콜백 파라미터: `statement`

### exportImport

`SyncBailHook`

모든 `export`-import 구문에 대해 호출됩니다. 예. `export * from 'otherModule';`.

- 콜백 파라미터: `statement` `source`

### exportDeclaration

`SyncBailHook`

선언을 내보내는 모든 `export` 구문에 대해 호출됩니다.

- 콜백 파라미터: `statement` `declaration`

이러한 내보내기는 다음의 훅을 트리거 합니다.

```js
export const myVar = 'hello'; // 또한 var, let
export function FunctionName() {}
export class ClassName {}
```

### exportExpression

`SyncBailHook`

표현식을 내보내는 모든 `export` 구문에 대해 호출됩니다. 예. `export default expression;`.

- 콜백 파라미터: `statement` `declaration`

### exportSpecifier

`SyncBailHook`

모든 `export` 구문의 모든 지정자에 대해 호출됩니다.

- 콜백 파라미터: `statement` `identifierName` `exportName` `index`

### exportImportSpecifier

`SyncBailHook`

모든 `export`-import 구문의 모든 지정자에 대해 호출됩니다.

- 콜백 파라미터: `statement` `source` `identifierName` `exportName` `index`

### varDeclaration

`SyncBailHook`

변수 선언문을 파싱할 때 호출됩니다.

- 콜백 파라미터: `declaration`

### varDeclarationLet

`SyncBailHook`

`let`을 사용해 정의된 변수 선언문을 파싱할 때 호출됩니다.

- 콜백 파라미터: `declaration`

### varDeclarationConst

`SyncBailHook`

`const`를 사용해 정의된 변수 선언문을 파싱할 때 호출됩니다.

- 콜백 파라미터: `declaration`

### varDeclarationVar

`SyncBailHook`

`var`를 사용해 정의된 변수 선언문을 파싱할 때 호출됩니다.

- 콜백 파라미터: `declaration`

### canRename

`SyncBailHook`

이름 변경이 허용되는지 확인하기 위해 식별자의 이름을 변경하기 전에 트리거 됩니다. 일반적으로 `rename` 훅과 함께 사용됩니다.

- 훅 파라미터: `identifier`
- 콜백 파라미터: `expression`

```js
var a = b;

parser.hooks.canRename.for('b').tap('MyPlugin', (expression) => {
  // true를 반환하면 이름을 변경할 수 있습니다.
  return true;
});
```

### rename

`SyncBailHook`

새 식별자를 가져오기 위해 이름을 바꿀 때 트리거 됩니다. 이 훅은 `canRename`이 `true`를 반환하는 경우에 호출됩니다.

- 훅 파라미터: `identifier`
- 콜백 파라미터: `expression`

```js
var a = b;

parser.hooks.rename.for('b').tap('MyPlugin', (expression) => {});
```

### assigned

`SyncBailHook`

할당된 표현식을 파싱하기 전에 `AssignmentExpression`을 파싱할 경우에 호출됩니다.

- 훅 파라미터: `identifier`
- 콜백 파라미터: `expression`

```js
a += b;

parser.hooks.assigned.for('a').tap('MyPlugin', (expression) => {
  // 이것은 b를 파싱하기 전에 호출됩니다.
});
```

### assign

`SyncBailHook`

할당 표현식을 파싱하기 전에 `AssignmentExpression`을 파싱할 경우에 호출됩니다.

- 훅 파라미터: `identifier`
- 콜백 파라미터: `expression`

```js
a += b;

parser.hooks.assigned.for('a').tap('MyPlugin', (expression) => {
  // 이것은 a를 파싱하기 전에 호출됩니다.
});
```

### typeof

`SyncBailHook`

식별자의 `typeof`를 파싱할 때 트리거 됩니다.

- 훅 파라미터: `identifier`
- 콜백 파라미터: `expression`

### call

`SyncBailHook`

함수 호출을 파싱할 때 호출됩니다.

- 훅 파라미터: `identifier`
- 콜백 파라미터: `expression`

```js
eval(/* something */);

parser.hooks.call.for('eval').tap('MyPlugin', (expression) => {});
```

### callMemberChain

`SyncBailHook`

객체의 멤버 함수에 대한 호출을 파싱할 경우 트리거 됩니다.

- 훅 파라미터: `objectIdentifier`
- 콜백 파라미터: `expression, properties`

```js
myObj.anyFunc();

parser.hooks.callMemberChain
  .for('myObj')
  .tap('MyPlugin', (expression, properties) => {});
```

### new

`SyncBailHook`

`new` 표현식을 파싱할 때 호출됩니다.

- 훅 파라미터: `identifier`
- 콜백 파라미터: `expression`

```js
new MyClass();

parser.hooks.new.for('MyClass').tap('MyPlugin', (expression) => {});
```

### expression

`SyncBailHook`

표현식을 파싱할 때 호출됩니다.

- 훅 파라미터: `identifier`
- 콜백 파라미터: `expression`

```js
const a = this;

parser.hooks.expression.for('this').tap('MyPlugin', (expression) => {});
```

### expressionConditionalOperator

`SyncBailHook`

`ConditionalExpression`을 파싱할 때 호출됩니다. 예. `condition ? a : b`

- 콜백 파라미터: `expression`

### program

`SyncBailHook`

코드 조각의 추상 구문 트리(AST)에 접근합니다.

- 파라미터: `ast` `comments`
