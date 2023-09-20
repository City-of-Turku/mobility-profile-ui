import React from 'react';
import QuestionForm from '../QuestionForm/QuestionForm';
import TopBar from '../TopBar/TopBar';

const Content = () => {
  return (
    <div className="flex">
      <TopBar />
      <main>
        <div className="content-container">
          <QuestionForm />
        </div>
      </main>
    </div>
  );
};

export default Content;
