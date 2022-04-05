import React, { FC, useEffect, useState } from 'react';
import { mintAnimalTokenContract, web3 } from '../contracts';
import AnimalCard from './AnimalCard';
import styles from './SaleAnimalCard.module.css';

interface SaleAnimalCardProps {
  animalTokenId: string;
  animalType: string;
  animalPrice: string;
  account: string;
}

const SaleAnimalCard: FC<SaleAnimalCardProps> = ({
  animalTokenId,
  animalType,
  animalPrice,
  account,
}) => {
  const [isBuyable, setIsBuyable] = useState<boolean>(false);

  const getAnimalTokenOwner = async () => {
    try {
      const response = await mintAnimalTokenContract.methods
        .ownerOf(animalTokenId)
        .call();

      // nft판매자와 계정이 달라야 구매가능
      setIsBuyable(
        account.toLocaleLowerCase() !== response.toLocaleLowerCase()
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAnimalTokenOwner();
  }, []);
  return (
    <div className={styles.container}>
      <AnimalCard animalType={animalType} />
      <div>{`${web3.utils.fromWei(animalPrice)} MATIC`}</div>
      {isBuyable && <button>Buy</button>}
    </div>
  );
};

export default SaleAnimalCard;
