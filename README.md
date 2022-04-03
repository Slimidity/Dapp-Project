# Dapp-Project

### 
인프런강의를 보고 dapp을 연습하는 repo입니다.

https://www.inflearn.com/course/디앱-프로젝트/dashboard

## 사용기술
solidity, react, web3, web3-utills, metamask(polygon testnet)

강의에서는 Chakra UI를 이용하지만 이 repo에서는 이용하지 않았습니다.

## How to use

### Remix 연동

```
remixd -s . --remix-ide https://remix.ethereum.org
```

### frontend 데모용 localhost

`Dapp-Project/frontend/`에서 

```
npm run start
```

### 설정

`Dapp-Project/frontend/src/contracts/index.ts /`에서 

자신이 배포한 컨트랙트에 맞게

Abi code(`mintAnimalTokenAbi`, `saleAnimalTokenAbi`) 와

contract address (`mintAnimalTokenAddress`, `saleAnimalTokenAddress`)를 수정 할 것.
