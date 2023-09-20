import React from 'react';
import LocaleSelection from './components/LocaleSelection/LocaleSelection';

const TopBar = () => {
  return (
    <>
      <LocaleSelection />
      <div className="topbar"></div>
    </>
  );
};

export default TopBar;
