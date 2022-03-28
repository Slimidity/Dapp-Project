import React, { FC } from 'react';

interface MyAnimalProps {
  account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
  return <div>My Animal list</div>;
};

export default MyAnimal;
