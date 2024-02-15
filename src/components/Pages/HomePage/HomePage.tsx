import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import bgImage from '../../../assets/images/mobility-profile-up.webp';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import questionSlice from '../../../redux/slices/questionSlice';
import userSlice from '../../../redux/slices/userSlice';
import { fetchQuestions, startPoll } from '../../../utils/mobilityProfileAPI';
import { sortQuestionsData } from '../../../utils/utils';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { setUserId, setCsrfToken } = bindActionCreators(userSlice.actions, dispatch);
  const { setFirstQuestion, setAllQuestions, setQuestionApiError } = bindActionCreators(
    questionSlice.actions,
    dispatch,
  );

  const { allQuestions } = useAppSelector((state) => state.question);

  const intl = useIntl();

  useEffect(() => {
    fetchQuestions(setAllQuestions, setQuestionApiError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allQuestionsItems = [...allQuestions];
  const sortedQuestions = sortQuestionsData(allQuestionsItems);

  useEffect(() => {
    if (sortedQuestions?.length) {
      setAllQuestions(sortedQuestions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedQuestions.length]);

  /**
   * Find object of the first question
   * @returns object
   */
  const getFirsQuestion = () => {
    return allQuestions.find((item) => item.number === '1');
  };

  const firstQuestion = getFirsQuestion();

  useEffect(() => {
    if (firstQuestion) {
      setFirstQuestion(firstQuestion);
    }
  }, [firstQuestion, setFirstQuestion]);

  const handleClick = async () => {
    const userValues = await startPoll();
    setUserId(userValues?.id);
    setCsrfToken(userValues?.token);
  };

  return (
    <div className="home-content">
      <div className="wrap-all container-wrap">
        <div className="container">
          <div className="txt-container">
            <h1 className="header-h1 mb-3">{intl.formatMessage({ id: 'page.home.title' })}</h1>
            <h2 className="header-h2 mb-3">{intl.formatMessage({ id: 'page.home.subTitle' })}</h2>
            <p className="text-normal mb-3">
              {intl.formatMessage({ id: 'page.home.description' })}
            </p>
          </div>
          <div className="button-container">
            <Link to="/questions">
              <Button
                className="button-primary p-2"
                role="button"
                aria-label={intl.formatMessage({ id: 'app.buttons.survey.start' })}
                onClick={() => handleClick()}
              >
                <p className="text-subtitle">
                  {intl.formatMessage({ id: 'app.buttons.survey.start' })}
                </p>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="image-container">
        <img className="image" src={bgImage} alt="turku-illustration" />
      </div>
    </div>
  );
};

export default HomePage;
