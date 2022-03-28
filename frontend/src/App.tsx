import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './routes/Main';
const App: FC = () => {
  const [account, setAccount] = useState<string>('');

  // getAccount: 메타마스크 팝업과 계정 연결
  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
      } else {
        alert('메타마스크를 설치해주세요');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAccount();
  }, [account]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main account={account} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
