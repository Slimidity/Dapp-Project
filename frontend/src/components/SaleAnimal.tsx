import React, { FC } from 'react';

interface SaleAnimalProps {
  account: string;
}
const SaleAnimal: FC<SaleAnimalProps> = ({ account }) => {
  return <div>SA</div>;
};

export default SaleAnimal;
