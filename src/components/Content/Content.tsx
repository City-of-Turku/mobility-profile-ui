import React from 'react';
import Footer from '../Footer/Footer';
import QuestionList from '../QuestionList/QuestionList';
import TopBar from '../TopBar/TopBar';
import TextBasic from '../Typography/TextBasic/TextBasic';

const Content = () => {
  return (
    <div className="flex">
      <TopBar />
      <main>
        <div className="content-container">
          <TextBasic text="app.subtitle" />
          <QuestionList itemsPerPage={3} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Content;
