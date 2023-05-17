import React from 'react';
import Footer from '../Footer/Footer';
import TopBar from '../TopBar/TopBar';
import TextBasic from '../Typography/TextBasic/TextBasic';

const Content = () => {
  return (
    <div className="flex">
      <TopBar />
      <main>
        <div className="content-container">
          <TextBasic text="app.subtitle" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Content;
