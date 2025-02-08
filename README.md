# SmartFarm_Frontend_Vue
카멜레온 SMART FARM 프론트엔드 repo

## 사전 설치

- `npm install -g @vue/cli` : vue.js 템플릿 설치를 도와주는 패키지 
- `npm install vue-router` : vue-router 설치
- `npm i axios` : axios 설치
- `npm install -g json-server` : json-server 설치
- node.js LTS버전 설치

## 명령어

- `npm run serve` : 서버 가동
- `json-server --watch db.json` : json-server 가동

## [json-server 사용법](https://www.npmjs.com/package/json-server)

### 테이블 선언

```json
{
  "posts": [
    { "id": "1", "title": "a title", "views": 100 },
    { "id": "2", "title": "another title", "views": 200 }
  ],
  "comments": [
    { "id": "1", "text": "a comment about post 1", "postId": "1" },
    { "id": "2", "text": "another comment about post 1", "postId": "1" }
  ],
  "profile": {
    "name": "typicode"
  }
}
```

- 테이블 이름 : `"posts"`, `"comments"`, `"profile"`
- 테이블 열 : `"id`, `"title"`, `"views"`...
- 테이블 행 : `{ "id": "1", "title": "a title", "views": 100 }` ...


### API 사용

```
GET    /table이름
GET    /table이름/:id
POST   /table이름
PUT    /table이름/:id
PATCH  /table이름/:id
DELETE /table이름/:id
```
- put : 전체 데이터 변경 / patch : 일부 데이터 변경
