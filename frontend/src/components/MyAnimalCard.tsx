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
  const [myAnimalPrice, setMyAnimalPrice] = useState<string>(animalPrice); // 판매 동록 후 가격을 바로 보여주기 위한 state

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(e.target.value);
  };

  const onClickSell = async () => {
    if (!account || !saleStatus) return;

    const response = await saleAnimalTokenContract.methods //
      .setForSaleAnimalToken(
        animalTokenId,
        web3.utils.toWei(sellPrice, 'ether')
      )
      .send({ from: account });

    if (response.status) {
      // toWei로 set해야 fromWei할때 형변환 에러나지 않는다.
      setMyAnimalPrice(web3.utils.toWei(sellPrice, 'ether'));
    }
  };
  // 가격이 0이 아니면 판매중이라는 뜻
  return (
    <div className={styles.container}>
      <AnimalCard animalType={animalType} />
      {myAnimalPrice !== '0' ? (
        <div>{`${web3.utils.fromWei(myAnimalPrice)} MATIC`}</div>
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
