import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import bgImage from '../../../assets/images/mobility-profile-up.webp';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import questionSlice from '../../../redux/slices/questionSlice';
import userSlice from '../../../redux/slices/userSlice';
import { QuestionNumber } from '../../../types';
import { fetchQuestionNumbers, startPoll } from '../../../utils/mobilityProfileAPI';

const HomePage = () => {
  // const [questionNumbersData, setQuestionNumbersData] = useState<Array<QuestionNumber>>([]);

  const dispatch = useAppDispatch();
  const { setUserId, setCsrfToken } = bindActionCreators(userSlice.actions, dispatch);
  const { setQuestionId, setQuestionNumbers } = bindActionCreators(questionSlice.actions, dispatch);

  const { question } = useAppSelector((state) => state);
  const questionNumbersData = question.questionNumbers;

  const intl = useIntl();

  /*  useEffect(() => {
    fetchQuestionNumbers(setQuestionNumbersData);
  }, []); */

  useEffect(() => {
    fetchQuestionNumbers(setQuestionNumbers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getObjectWithLowestId = (data: QuestionNumber[]): QuestionNumber => {
    return data?.reduce((min, curr) => (min.id < curr.id ? min : curr), data[0]);
  };

  const firstQuestion = getObjectWithLowestId(questionNumbersData);

  useEffect(() => {
    setQuestionId(firstQuestion?.id);
  }, [firstQuestion, setQuestionId]);

  const handleClick = async () => {
    const userValues = await startPoll();
    setUserId(userValues?.id);
    setCsrfToken(userValues?.csrftoken);
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
