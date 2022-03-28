import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Layout: FC = ({ children }) => {
  return (
    <>
      <div>
        <Link to="/">Main</Link>
        <Link to="/my-animal">My Animal</Link>
      </div>
      <div>{children}</div>
    </>
  );
};

export default Layout;
