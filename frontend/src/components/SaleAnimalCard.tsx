import React, { FC } from 'react';
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
      {/* <AnimalCard animalType={animalType} /> */}
      SAC
    </div>
  );
};

export default SaleAnimalCard;
