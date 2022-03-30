import React, { FC, useState } from 'react';
import AnimalCard from '../components/AnimalCard';
import { mintAnimalTokenContract } from '../contracts';
import styles from './Main.module.css';

interface MainProps {
  account: string;
}

const Main: FC<MainProps> = ({ account }) => {
  const [newAnimalType, setNewAnimalType] = useState<string>();

  const onClickMint = async () => {
    try {
      if (!account) return;

      const response = await mintAnimalTokenContract.methods
        .mintAnimalToken()
        .send({ from: account });
      if (response.status) {
        // account가 가진 nft 수
        const balanceLength = await mintAnimalTokenContract.methods //
          .balanceOf(account)
          .call();

        // 방금 mint한 nft id 받기
        const animalTokenId = await mintAnimalTokenContract.methods //
          .tokenOfOwnerByIndex(account, parseInt(balanceLength) - 1)
          .call();

        // 방금 mint한 nft type 받기
        const animalTokenType = await mintAnimalTokenContract.methods //
          .animalTypes(animalTokenId)
          .call();

        setNewAnimalType(animalTokenType);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.mintContainer}>
      {newAnimalType ? (
        <AnimalCard animalType={newAnimalType} />
      ) : (
        <div className={styles.text}> 새 동물카드를 Mint 해보세요</div>
      )}
      <button onClick={onClickMint} className={styles.mint}>
        Mint
      </button>
    </div>
  );
};

export default Main;
