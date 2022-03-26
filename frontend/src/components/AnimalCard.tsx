import React, { FC } from 'react';

interface AnimalCardProps {
  animalType: string;
}

const AnimalCard: FC<AnimalCardProps> = ({ animalType }) => {
  return (
    <div>
      <img src={`images/${animalType}.png`} alt="AnimalToken" />
    </div>
  );
};

export default AnimalCard;
