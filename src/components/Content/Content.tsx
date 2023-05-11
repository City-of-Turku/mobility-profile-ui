import React from 'react';
import Footer from '../Footer/Footer';
import TopBar from '../TopBar/TopBar';
import TextBasic from '../Typography/TextBasic/TextBasic';

const Content = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopBar />
      <main>
        <div>
          <TextBasic text="app.subtitle" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Content;
