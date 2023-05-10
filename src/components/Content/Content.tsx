import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import Footer from '../Footer/Footer';
import TopBar from '../TopBar/TopBar';

const Content = () => {
  const { settings } = useAppSelector((state) => state);
  const locale = settings.localeSelection;
  console.log(locale);
  return (
    <div>
      <TopBar />
      <Footer />
    </div>
  );
};

export default Content;
