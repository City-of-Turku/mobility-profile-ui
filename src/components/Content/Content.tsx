import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import Loading from '../Loading/Loading';
import QuestionForm from '../QuestionForm/QuestionForm';

const Content = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return <div className="content-inner">{isAuthenticated ? <QuestionForm /> : <Loading />}</div>;
};

export default Content;
