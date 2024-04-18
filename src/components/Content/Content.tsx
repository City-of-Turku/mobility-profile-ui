import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import ErrorComponent from '../Errors/ErrorComponent/ErrorComponent';
import Loading from '../Loading/Loading';
import QuestionForm from '../QuestionForm/QuestionForm';

const Content = () => {
  const { isLoggedIn, isError } = useAppSelector((state) => state.user);

  const renderSecondaryContent = () => {
    if (isError) {
      return (
        <ErrorComponent translationId="app.result.error">
          <HomeButton />
        </ErrorComponent>
      );
    } else {
      return <Loading />;
    }
  };

  return (
    <div className="content-inner">{isLoggedIn ? <QuestionForm /> : renderSecondaryContent()}</div>
  );
};

export default Content;
