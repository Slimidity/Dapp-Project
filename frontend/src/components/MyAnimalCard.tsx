import React, { FC } from 'react';
import { web3 } from '../contracts';
import AnimalCard from './AnimalCard';

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
    <div>
      <AnimalCard animalType={animalType} />
      {animalPrice !== '0' ? (
        <div>{`${web3.utils.fromWei(animalPrice)} MATIC`}</div>
      ) : (
        <div>판매하기 버튼</div>
      )}
    </div>
  );
};
export default MyAnimalCard;
