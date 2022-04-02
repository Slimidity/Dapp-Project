import React, { FC } from 'react';
import { web3 } from '../contracts';
import AnimalCard from './AnimalCard';
import styles from './MyAnimalCard.module.css';

// AnimalCard interface
export interface IMyAnimalCard {
  animalTokenId: string;
  animalType: string;
  animalPrice: string;
}

interface MyAnimalCardProps extends IMyAnimalCard {}

const MyAnimalCard: FC<MyAnimalCardProps> = ({
  animalTokenId,
  animalType,
  animalPrice,
}) => {
  // 가격이 0이 아니면 판매중이라는 뜻
  return (
    <div className={styles.container}>
      <AnimalCard animalType={animalType} />
      {animalPrice !== '0' ? (
        <div>{`${web3.utils.fromWei(animalPrice)} MATIC`}</div>
      ) : (
        <div className={styles.sellContainer}>
          <div className={styles.inputContainer}>
            <input type="number" />
            <div>
              <span>Matic</span>
            </div>
          </div>
          <button className={styles.sellButton}>Sell</button>
        </div>
      )}
    </div>
  );
};
export default MyAnimalCard;
