# Next Custom (node) Server Stress Test Project

## 1. 프로젝트 목적
> - 간헐적인 서버 종료 문제 확인을 위해 Custom Server에 과부화를 주기위해 만든 프로젝트 입니다.
> - puppeteer, puppeteer-cluster 라이브러리 기반으로 작업됩니다.

## 2. 테스트 환경(설치 및 실행 전 확인)
> node >= 16 // nvm을 이용해 주세요
 
## 3. 테스트 시작
```shell
npm run test
```
또는
```shell
node index.ts
```

## 4. 테스트 수정
> index.js 의 `PAGE_REQUEST_COUNT` 상수 숫자를 수정하시면 됩니다.