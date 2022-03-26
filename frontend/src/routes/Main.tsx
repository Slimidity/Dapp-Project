import React, { FC, useState } from 'react';
import { mintAnimalTokenContract } from '../contracts';

interface MainProps {
  account: string;
}

const Main: FC<MainProps> = ({ account }) => {
  const [newAnimalCard, setNewAnimalCard] = useState<string>();

  const onClickMint = async () => {
    try {
      if (!account) return;

      const response = await mintAnimalTokenContract.methods
        .mintAnimalToken()
        .send({ from: account });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {newAnimalCard ? (
        <div>{newAnimalCard}</div>
      ) : (
        <>
          <div> 새 동물카드를 Mint 해보세요</div>
          <button onClick={onClickMint}>Mint</button>
        </>
      )}
    </div>
  );
};

export default Main;
