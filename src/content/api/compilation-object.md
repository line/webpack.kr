---
title: Compilation Object
group: Objects
sort: 14
contributors:
  - EugeneHlushko
  - wizardofhogwarts
  - jamesgeorge007
  - snitin315
---

Compilation 객체에는 사용 가능한 많은 메서드와 훅이 있습니다. 이 페이지에서는, 사용 가능한 메서드와 프로퍼티를 나열합니다.

## compilation object methods

### getStats

`function`

현재 컴파일에 대한 State 객체를 반환합니다.

### addModule

`function (module, cacheGroup)`

현재 컴파일에 모듈을 추가합니다.

파라미터:

- `module` - 추가할 모듈.
- `cacheGroup` - 모듈의 `cacheGroup`.

### getModule

`function (module)`

식별자를 통해 컴파일에서 모듈을 가져옵니다.

파라미터:

- `module` - 가져올 모듈. 식별자는 `module.identifier()` 메서드를 사용한 컴파일을 통해 모듈에서 추출됩니다.

### findModule

`function (module)`

식별자로 모듈 검색을 시도합니다.

파라미터:

- `module` - 검색할 모듈. 식별자는 `module.identifier()` 메서드를 사용한 컴파일을 통해 모듈에서 추출됩니다.

### buildModule

`function (module, optional, origin, dependencies)`

주어진 모듈을 빌드합니다.

파라미터:

- `module` - 빌드할 모듈.
- `optional` - 선택적 플래그.
- `origin` - 모듈 빌드가 요청된 원본 모듈.
- `dependencies` - 빌드할 모듈의 선택적 의존성.

### processModuleDependencies

`function (module, callback)`

주어진 모듈 의존성을 처리합니다.

파라미터:

- `module` - 의존성에 대해 처리할 모듈.
- `callback` - 모듈의 의존성이 처리되었을 때 호출되는 함수.

### addEntry

`function (context, entry, name, callback)`

컴파일에 엔트리를 추가합니다.

파라미터:

- `context` - 엔트리의 컨텍스트 경로.
- `entry` - 엔트리 의존성.
- `name` - 엔트리 이름.
- `callback` - addEntry가 완료될 때 호출되는 함수.

### rebuildModule

`function (module, thisCallback)`

모듈 재빌드를 트리거 합니다.

파라미터:

- `module` - 재빌드 할 모듈.
- `thisCallback` - 모듈이 재빌드를 마쳤을 때 호출되는 함수.

### finish

`function (callback)`

컴파일을 완료하고 주어진 콜백을 호출합니다.

파라미터:

- `callback` - 컴파일이 완료되면 호출되는 함수.

### seal

`function (callback)`

컴파일을 봉인합니다.

파라미터:

- `callback` - 컴파일이 봉인되었을 때 호출되는 함수.

### unseal

`function`

컴파일 봉인을 해제합니다.

파라미터:

- `callback` - 컴파일 봉인이 해제될 때 호출되는 함수.

### reportDependencyErrorsAndWarnings

`function (module, blocks)`

컴파일 오류 및 경고에 주어진 모듈의 오류 및 경고를 추가합니다.

파라미터:

- `module` - 오류 및 경고를 보고할 모듈.
- `blocks` - 보고할 의존성 블록 집합.

### addChunkInGroup

`function (groupOptions, module, loc, request)`

기존 청크 그룹에 모듈을 추가하거나 새 그룹을 만듭니다. `chunkGroup`을 반환합니다.

파라미터:

- `groupOptions` - 청크 그룹에 대한 옵션.
- `module` - 청크 그룹을 참조하는 모듈.
- `loc` - 청크 그룹이 참조되는 위치(모듈 내부).
- `request` - 청크 그룹이 참조되는 요청.

### addChunk

`function (name)`

`compilation.chunks`에 새 청크를 만들고 추가합니다. 해당 `chunk`를 반환합니다.

파라미터:

- `name` - 청크 이름.

### assignDepth

`function (module)`

주어진 모듈과 그 의존성 블록에 재귀적으로 `depth`를 할당합니다.

파라미터:

- `module` - depth를 할당할 모듈.

### getDependencyReference

`function (module, dependency)`

주어진 모듈에서 의존성에 대한 참조를 반환합니다.

파라미터:

- `module` - 주어진 모듈.
- `dependency` - 참조할 의존성.

### processDependenciesBlocksForChunkGroups

`function (inputChunkGroups)`

`Module` 그래프에서 `Chunk` 그래프를 생성합니다. 이 과정은 두 단계로 이루어집니다. 1단계: 모듈 그래프를 탐색하고 `chunkDependencies`에서 기본 청크 그래프를 빌드합니다. 2단계: 기본 청크 그래프를 통해 가능한 모든 방법을 탐색하고 사용 가능한 모듈을 추적합니다. 탐색하는 동안, `processDependenciesBlocksForChunkGroups`는 청크를 서로 연결하고 `Blocks`는 `Chunks`와 연결합니다. 청크에 대한 모든 모듈이 이미 사용 가능하고 불필요한 청크를 연결하지 않으면 탐색을 중지합니다.

파라미터:

- `inputChunkGroups` - 처리되는 청크 그룹.

### removeReasonsOfDependencyBlock

`function (module, block)`

모듈과 의존성 블록의 관계를 제거합니다.

파라미터:

- `module` - 제거할 모듈 관계.
- `block` - 의존성 블록.

### patchChunksAfterReasonRemoval

`function (module, chunk)`

의존성 이유를 제거한 후 모듈 및 청크의 연결을 패치합니다. `removeReasonsOfDependencyBlock`에 의해 자동으로 호출됩니다.

파라미터:

- `module` - 패치 할 모듈.
- `chunk` - 패치 할 청크.

### removeChunkFromDependencies

`function (block, chunk)`

의존성 이유를 제거한 후 의존성 블록 모듈 및 청크에서 주어진 청크를 제거합니다. `removeReasonsOfDependencyBlock`에 의해 자동으로 호출됩니다.

파라미터:

- `block` - `Chunk`의 블록.
- `chunk` - 의존성에서 제거할 청크.

### sortItemsWithModuleIds

`function`

### sortItemsWithChunkIds

`function`

### summarizeDependencies

`function`

### createHash

`function`

### createModuleAssets

`function`

### createChunkAssets

`function`

### getPath

`function (filename, data)`

삽입된 경로를 반환합니다.

파라미터:

- `filename` - 해시로 애셋 경로를 얻는 데 사용.
- `data` - data 객체.

### getPathWithInfo

`function (filename, data)`

삽입된 경로 및 애셋 정보를 반환합니다.

파라미터:

- `filename` - 해시로 애셋 경로를 얻는 데 사용.
- `data` - data 객체.

### createChildCompiler

`function (name, outputOptions, plugins)`

webpack 내에서 webpack의 다른 인스턴스를 실행할 수 있습니다. 그러나, 다른 설정과 구성이 적용된 하위 컴파일러로서 상위(또는 최상위 컴파일러)에서 모든 훅과 플러그인을 복사하고 하위 `Compiler` 인스턴스를 만듭니다. 생성된 `Compiler`를 반환합니다.

파라미터:

- `name` - 하위 `Compiler`의 이름.
- `outputOptions` - 출력 옵션 객체.
- `plugins` - 적용될 webpack 플러그인.

### checkConstraints

`function`

### emitAsset

`function (file, source, assetInfo = {})`

W> webpack 4.40.0부터 사용 가능

파라미터:

- `file` - 애셋의 파일 이름
- `source` - 애셋의 소스
- `assetInfo` - 추가 애셋 정보

### updateAsset

`function (file, newSourceOrFunction, assetInfoUpdateOrFunction)`

W> webpack 4.40.0부터 사용 가능

파라미터:

- `file` - 애셋의 파일 이름
- `newSourceOrFunction` - 새 애셋 소스 또는 이전의 것을 새것으로 변환하는 함수
- `assetInfoUpdateOrFunction` - 새 애셋 정보 또는 이전의 것을 새것으로 변환하는 함수

### deleteAsset

`function (file)`

파라미터:

- `file` - 애셋의 파일 이름

### getAssets

`function`

W> webpack 4.40.0부터 사용 가능

현재 컴파일에서 모든 애셋의 배열을 반환합니다.

### getAsset

`function (name)`

W> webpack 4.40.0부터 사용 가능

파라미터:

- `name` - 반환할 애셋의 이름
