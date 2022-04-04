import React, { FC, useEffect, useState } from 'react';
import { mintAnimalTokenContract, saleAnimalTokenContract } from '../contracts';
import { IMyAnimalCard } from './MyAnimalCard';
import SaleAnimalCard from './SaleAnimalCard';
import styles from './SaleAnimal.module.css';

interface SaleAnimalProps {
  account: string;
}
const SaleAnimal: FC<SaleAnimalProps> = ({ account }) => {
  const [saleAnimalCards, setSaleAnimalCards] = useState<IMyAnimalCard[]>();

  const getOnSaleAnimalTokens = async () => {
    try {
      // 판매중인 nft 갯수
      const onSaleAnimalTokenArrayLength = await saleAnimalTokenContract.methods
        .getOnSaleAnimalTokenArrayLength()
        .call();
      const tempSaleAnimalCards: IMyAnimalCard[] = [];

      for (let i = 0; i < parseInt(onSaleAnimalTokenArrayLength); i++) {
        // 판매중인 nft id
        const animalTokenId = await saleAnimalTokenContract.methods
          .onSaleAnimalTokenArray(i)
          .call();

        // nft type
        const animalType = await mintAnimalTokenContract.methods
          .animalTypes(animalTokenId)
          .call();

        // nft price
        const animalPrice = await saleAnimalTokenContract.methods
          .animalTokenPrices(animalTokenId)
          .call();

        tempSaleAnimalCards.push({ animalTokenId, animalType, animalPrice });
      }

      setSaleAnimalCards(tempSaleAnimalCards);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getOnSaleAnimalTokens();
  }, []);

  return (
    <div className={styles.container}>
      {saleAnimalCards &&
        saleAnimalCards.map((animalCard, index) => (
          <SaleAnimalCard
            key={index}
            animalTokenId={animalCard.animalTokenId}
            animalType={animalCard.animalType}
            animalPrice={animalCard.animalPrice}
          />
        ))}
    </div>
  );
};

export default SaleAnimal;
