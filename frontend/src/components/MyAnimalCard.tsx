import React, { ChangeEvent, FC, useState } from 'react';
import { saleAnimalTokenContract, web3 } from '../contracts';
import AnimalCard from './AnimalCard';
import styles from './MyAnimalCard.module.css';

// AnimalCard interface
export interface IMyAnimalCard {
  animalTokenId: string;
  animalType: string;
  animalPrice: string;
}

interface MyAnimalCardProps extends IMyAnimalCard {
  saleStatus: boolean;
  account: string;
}

const MyAnimalCard: FC<MyAnimalCardProps> = ({
  animalTokenId,
  animalType,
  animalPrice,
  saleStatus,
  account,
}) => {
  const [sellPrice, setSellPrice] = useState<string>('');

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(e.target.value);
  };

  const onClickSell = async () => {
    if (!account || !saleStatus) return;

    const response = await saleAnimalTokenContract.methods //
      .setForSaleAnimalToken(animalTokenId, web3.utils.toWei(sellPrice))
      .send({ from: account });

    if (response.status) {
      console.log(response);
    }
  };
  // 가격이 0이 아니면 판매중이라는 뜻
  return (
    <div className={styles.container}>
      <AnimalCard animalType={animalType} />
      {animalPrice !== '0' ? (
        <div>{`${web3.utils.fromWei(animalPrice)} MATIC`}</div>
      ) : (
        <div className={styles.sellContainer}>
          <div className={styles.inputContainer}>
            <input type="number" value={sellPrice} onChange={onPriceChange} />
            <div>
              <span>Matic</span>
            </div>
          </div>
          <button className={styles.sellButton} onClick={onClickSell}>
            Sell
          </button>
        </div>
      )}
    </div>
  );
};
export default MyAnimalCard;
