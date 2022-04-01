import React, { FC, useEffect, useState } from 'react';
import { stringToHex } from 'web3-utils';
import {
  mintAnimalTokenContract,
  saleAnimalTokenAddress,
  saleAnimalTokenContract,
} from '../contracts';
import AnimalCard from './AnimalCard';
import styles from './MyAnimal.module.css';
import MyAnimalCard, { IMyAnimalCard } from './MyAnimalCard';

interface MyAnimalProps {
  account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
  const [animalCards, setAnimalCards] = useState<IMyAnimalCard[]>([]);
  const [saleStatus, setSaleStatus] = useState<boolean>(); // 판매권한

  const getAnimalTokens = async () => {
    try {
      if (!account) return;

      // account가 가진 nft 수
      const balanceLength: string = await mintAnimalTokenContract.methods //
        .balanceOf(account)
        .call();

      // 가진 nft 수만큼 반복돌려서 nft들의 type얻기
      const tempAnimalCards: IMyAnimalCard[] = [];
      for (let i = 0; i < parseInt(balanceLength); i++) {
        const animalTokenId: string = await mintAnimalTokenContract.methods //
          .tokenOfOwnerByIndex(account, i)
          .call();
        const animalType: string = await mintAnimalTokenContract.methods //
          .animalTypes(animalTokenId)
          .call();
        const animalPrice: string = await saleAnimalTokenContract.methods //
          .animalTokenPrices(animalTokenId)
          .call();

        tempAnimalCards.push({
          animalTokenId,
          animalType,
          animalPrice,
        });
      }

      // setstate
      setAnimalCards(tempAnimalCards);
    } catch (error) {
      console.error(error);
    }
  };

  // account가 saleAnimalTokenAddress에게 nft들의 판매권한을 줬는지 확인
  const getIsApprovedForAll = async () => {
    try {
      const response = await mintAnimalTokenContract.methods //
        .isApprovedForAll(account, saleAnimalTokenAddress)
        .call();

      // saleAnimalToken이 account가 가진 토큰의 판매권한을 가진경우
      if (response) {
        setSaleStatus(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // account가 saleAnimalTokenAddress에게 nft 판매권한 주기 / 뺐기
  const onClickApproveToggle = async () => {
    try {
      if (!account) return;

      const response = await mintAnimalTokenContract.methods
        .setApprovalForAll(saleAnimalTokenAddress, !saleStatus)
        .send({ from: account });

      if (response.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) return;

    getIsApprovedForAll();
    getAnimalTokens();
  }, [account]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>My Animal list</div>
        <div>
          <span>Sale Status: {saleStatus ? 'true' : 'false'} </span>
          <button onClick={onClickApproveToggle}>
            {saleStatus ? 'Cancel' : 'Approve'}
          </button>
        </div>
        <div className={styles.list}>
          {animalCards.map((animalCard, index) => (
            <MyAnimalCard
              key={index}
              animalTokenId={animalCard.animalTokenId}
              animalType={animalCard.animalType}
              animalPrice={animalCard.animalPrice}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAnimal;
