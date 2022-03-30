import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout: FC = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.logo}>NFT mint & sale</span>
          <Link to="/">
            <button className={`${styles.headerBtn} ${styles.main}`}>
              Main
            </button>
          </Link>
          <Link to="/my-animal">
            <button className={`${styles.headerBtn} ${styles.animal}`}>
              My Animal
            </button>
          </Link>
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
