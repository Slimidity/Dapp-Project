import React, { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <>
      <div>헤더</div>
      <div>{children}</div>
    </>
  );
};

export default Layout;
