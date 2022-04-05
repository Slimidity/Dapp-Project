import React, { FC, useEffect, useState } from 'react';
import {
  mintAnimalTokenContract,
  saleAnimalTokenContract,
  web3,
} from '../contracts';
import AnimalCard from './AnimalCard';
import styles from './SaleAnimalCard.module.css';

interface SaleAnimalCardProps {
  animalTokenId: string;
  animalType: string;
  animalPrice: string;
  account: string;
  getOnSaleAnimalTokens: () => Promise<void>;
}

const SaleAnimalCard: FC<SaleAnimalCardProps> = ({
  animalTokenId,
  animalType,
  animalPrice,
  account,
  getOnSaleAnimalTokens,
}) => {
  const [isBuyable, setIsBuyable] = useState<boolean>(false);

  const onClickBuy = async () => {
    try {
      if (!account) return;

      const response = await saleAnimalTokenContract.methods //
        .purchaseAnimalToken(animalTokenId)
        .send({ from: account, value: animalPrice });

      if (response.status) {
        await getOnSaleAnimalTokens();
        await getAnimalTokenOwner();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      {isBuyable && <button onClick={onClickBuy}>Buy</button>}
    </div>
  );
};

export default SaleAnimalCard;
