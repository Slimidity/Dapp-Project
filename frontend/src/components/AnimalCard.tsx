import React, { FC } from 'react';
import styles from './AnimalCard.module.css';

interface AnimalCardProps {
  animalType: string;
}

const AnimalCard: FC<AnimalCardProps> = ({ animalType }) => {
  return (
    <div>
      <img
        className={styles.nft}
        src={`images/${animalType}.png`}
        alt="AnimalToken"
      />
    </div>
  );
};

export default AnimalCard;
