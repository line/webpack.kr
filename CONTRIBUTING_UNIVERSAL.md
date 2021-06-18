# 번역 기여하기

## Welcome, contributors.

- 환영합니다! 그리고 기여를 생각해 주신 모든 분들께 감사드립니다. 아래의 안내에 따라서 기여를 제출하신다면 모두에게 큰 도움이 됩니다.

## 기여 방법

### 번역 방법

- 중복된 작업을 막기위해 번역할 페이지를 [체크](https://github.com/line/webpack.kr/issues/7)하고 ID를 적어둡니다.
- [Issue](https://github.com/line/webpack.kr/issues)를 생성하고 번역할 페이지의 정보를 작성합니다.

### 번역 규칙

- 초벌 번역에 도움이 필요할 경우 [Google translator](https://translate.google.com/)를 우선으로 사용합니다.
- 경어체(높임말, 존댓말)를 사용합니다.
- WE, YOU, SHE, HE등의 인칭대명사는 번역하지 않습니다.
- 줄 바꿈과 단락은 '원문 그대로'를 유지합니다. 영어 원문 수정사항을 병합할 때 중요합니다.
- 공백(스페이스), 큰따옴표("), 작은따옴표('), 대시(-), 백틱(\`)을 비롯한 모든 특수문자는 수정하지 않습니다. 자연어만 수정(알파벳을 한글로 수정)해주세요!
- 소스 코드 내 공백 등은 원문 병합 시 충돌을 예방하기 위해 되도록 수정하지 않습니다. 자연어(주석)만 번역하도록 합니다.
- 어색한 직역보다 자연스러운 의역을 지향합니다.
- 검색을 위하여 메뉴명과 제목, 소제목는 번역하지 않습니다.
- 마크다운의 깨짐을 방지하기 위해 _이탤릭체와_ **볼드체는** 조사를 포함하여 적용합니다.
- 맞춤법에 따라 :(쌍점)은 .(마침표)로 변경합니다.
- 에러 내용은 번역하지 않습니다.
  - 예를들어, `let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined`에서 주석은 번역하지 않습니다.
- 그밖에 번역에 대한 기본 규칙은 [번역 모범 사례](https://github.com/javascript-tutorial/ko.javascript.info/wiki/%EB%B2%88%EC%97%AD-%EB%AA%A8%EB%B2%94-%EC%82%AC%EB%A1%80)를 참고해 주세요.
- 아래 링크의 정보를 활용하여 번역합니다.
  - 국립국어원 외래어 표기법 용례 찾기([링크](http://www.korean.go.kr/front/foreignSpell/foreignSpellList.do?mn_id=96))
  - 한글라이즈([링크](https://hangulize.org/))

### [Glossary](https://github.com/line/webpack.kr/wiki/Glossary)

- 대명사나 컴퓨터 공학에서 사용되는 용어는 [Glossary](https://github.com/line/webpack.kr/wiki/Glossary)에 등록합니다.
- Glossary 등록이 필요한 경우에 Pull Request 생성 시, 코멘트에 작성하여 제안합니다.

### Pull Request 규칙

- [glossary](https://github.com/line/webpack.kr/wiki/Glossary)가 빠짐없이 적용되었는지 확인합니다.
- PR 전 [맞춤법 검사기](http://speller.cs.pusan.ac.kr/)를 사용해 틀린 부분을 교정합니다. 리뷰자 역시 맞춤법 검사기를 사용해, 번역자가 맞춤법을 지켜 번역했는지 확인합니다.
- [로컬 서버 세팅 방법](https://github.com/webpack/webpack.js.org/blob/master/.github/CONTRIBUTING.md)을 참고하여 내가 작성한 내용이 어떻게 반영될 지 확인합니다.
- [PR 규칙](https://github.com/line/webpack.kr/blob/phase1/.github/PULL_REQUEST_TEMPLATE.md)에 맞춰 PR을 작성합니다.

## 로컬 서버 세팅

- [로컬 서버 세팅 방법](https://github.com/webpack/webpack.js.org/blob/master/.github/CONTRIBUTING.md)을 참고합니다.

## 변경 제안

- 변경 및 수정이 필요한 사항은 [Issue](https://github.com/line/webpack.kr/issues)를 올려주세요.

## 행동 규범

모든 기여자는 [행동 규범](CODE_OF_CONDUCT.md)에 따라 활동해야 합니다.

## 개인 기여자 라이선스 동의(Individual Contributor License Agreement, ICLA)

Pull Request를 보내는 경우에는 [ICLA](https://cla-assistant.io/line/webpack.kr)에 서명을 해주세요. 기여자와 커뮤니티의 저작권을 보호하기 위함입니다. 단체를 위한 CCLA(Corporate Contributor License Agreement)가 필요한 경우에는 이 쪽으로 연락주세요.
