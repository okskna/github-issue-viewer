# github-issue-viewer

## Installation

```
npm start
```

## How to use this

https://user-images.githubusercontent.com/26831729/142419321-dab04d0d-f348-4f2a-9a69-e165487f54f4.mov

## Requirement

- [v] 검색창에 Repository명을 입력해서 Repository를 검색할 수 있다.
- [v] 검색된 Public Repository를 등록할 수 있다.
  - [v] 등록 개수는 최대 4개로 제한하며, 최대 개수 초과 등록 시 이를 사용자에게 알려준다.
  - [v] 웹은 LocalStorage, 앱은 Async Storage 등 로컬 저장소를 활용한다. (웹 혹은 앱 선택)
- [v] 등록된 Repository를 삭제할 수 있다.
- [v] 등록된 각각의 Public Repository의 issue를 한 페이지에서 모아서 볼 수 있다.
  - [v] 각 issue 마다 제목, Repository 명은 필수로 표현되어야 한다. 그 이외의 데이터 중 필요하다고 생각되는 부분은 추가한다.
  - [v] 해당 issue를 클릭하면 Github의 상세 페이지로 이동할 수 있다.
  - [v] 페이지네이션을 통해서 계속해서 issue를 모아서 볼 수 있다.

## log

1. 구조 변경

초기 구조: App 컴포넌트 > Pagination 컴포넌트
문제점: Pagination 컴포넌트에서 일반 검색과 즐겨찾기 검색 기능에 대한 로직 필요 -> Pagination 컴포넌트에서 알 필요가 없는 로직
문제 해결: Pagination 컴포넌트를 Board 컴포넌트 내부로 옮긴 후, Pagination을 Board 컴포넌트에서 일반 검색과 즐겨찾기 검색을 구분하는 함수를 생성, Pagination 에 Prop으로 전달

2. API query

변경 전: issues API -> 특정 repository의 issue들을 가져올 수 있습니다. 하지만 total count에 대한 데이터가 존재하지 않습니다.
변경 후: search API -> 여러 repository의 issue들을 한 번에 가져올 수 있습니다. 또한 total count에 대한 데이터가 존재합니다.

docs를 자세히 살펴봄으로써 search API의 존재를 알 수 있었습니다. issues API를 사용하여 즐겨찾기 기능을 구현했다면 여러번의 fetch를 피할 수 없었을 것입니다.

3. 아쉬운 점

초기 구상 당시 상단에 Search box를 두는 디자인을 고려하였고 Route 없는 SPA로 만들어도 괜찮겠다는 생각을 했습니다. 하지만 Route가 존재하지 않는 경우 검색 모드에 대한 상태의 관리가 필요하게 되었습니다. Route를 사용했다면 필요가 없는 상태라고 생각하였고 만약 다시 이 과제를 하게된다면 Sub routing을 사용할 것입니다.
