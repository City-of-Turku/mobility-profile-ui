import React from 'react';
import QuestionList from '../QuestionList/QuestionList';
import TopBar from '../TopBar/TopBar';
import TextBasic from '../Typography/TextBasic/TextBasic';

const Content = () => {
  return (
    <div className="flex">
      <TopBar />
      <main>
        <div className="content-container">
          <TextBasic isTitle text="app.subtitle" />
          <QuestionList />
        </div>
      </main>
    </div>
  );
};

export default Content;
