import React, { FC, useEffect, useState } from 'react';
import { mintAnimalTokenContract } from '../contracts';
import AnimalCard from './AnimalCard';
import styles from './MyAnimal.module.css';

interface MyAnimalProps {
  account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
  const [animalCards, setAnimalCards] = useState<string[]>([]);

  const getAnimalTokens = async () => {
    try {
      if (!account) return;

      // account가 가진 nft 수
      const balanceLength: string = await mintAnimalTokenContract.methods //
        .balanceOf(account)
        .call();

      // 가진 nft 수만큼 반복돌려서 nft들의 type얻기
      const tempAnimalCards: string[] = [];
      for (let i = 0; i < parseInt(balanceLength); i++) {
        const animalTokenId: string = await mintAnimalTokenContract.methods //
          .tokenOfOwnerByIndex(account, i)
          .call();
        const animalTokenType: string = await mintAnimalTokenContract.methods //
          .animalTypes(animalTokenId)
          .call();

        tempAnimalCards.push(animalTokenType);
      }

      // setstate
      setAnimalCards(tempAnimalCards);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAnimalTokens();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>My Animal list</div>
        <div className={styles.list}>
          {animalCards.map((animalType, index) => (
            <AnimalCard animalType={animalType} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAnimal;
