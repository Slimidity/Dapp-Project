import React, { FC } from 'react';
import { web3 } from '../contracts';
import AnimalCard from './AnimalCard';
import styles from './SaleAnimalCard.module.css';

interface SaleAnimalCardProps {
  animalTokenId: string;
  animalType: string;
  animalPrice: string;
}

const SaleAnimalCard: FC<SaleAnimalCardProps> = ({
  animalTokenId,
  animalType,
  animalPrice,
}) => {
  console.log(animalType);
  return (
    <div className={styles.container}>
      <AnimalCard animalType={animalType} />
      <div>{`${web3.utils.fromWei(animalPrice)} MATIC`}</div>
      <button>Buy</button>
    </div>
  );
};

export default SaleAnimalCard;
