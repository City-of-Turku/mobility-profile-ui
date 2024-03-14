import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import Loading from '../Loading/Loading';
import QuestionForm from '../QuestionForm/QuestionForm';

const Content = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  return <div className="content-inner">{isLoggedIn ? <QuestionForm /> : <Loading />}</div>;
};

export default Content;
