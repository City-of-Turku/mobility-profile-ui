import { bindActionCreators } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
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
  const { setUserId, setCsrfToken, setIsLoggedIn } = bindActionCreators(
    userSlice.actions,
    dispatch,
  );
  const { setFirstQuestion, setAllQuestions, setQuestionApiError } = bindActionCreators(
    questionSlice.actions,
    dispatch,
  );

  const { allQuestions } = useAppSelector((state) => state.question);

  const intl = useIntl();

  const secret = process.env.REACT_APP_DATA_SECRET ? process.env.REACT_APP_DATA_SECRET : '';

  useEffect(() => {
    fetchQuestions(setAllQuestions, setQuestionApiError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allQuestionsItems = allQuestions?.length ? [...allQuestions] : [];
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
    return allQuestions?.find((item) => item.number === '1');
  };

  const firstQuestion = getFirsQuestion();

  useEffect(() => {
    if (firstQuestion) {
      setFirstQuestion(firstQuestion);
    }
  }, [firstQuestion, setFirstQuestion]);

  const decryptString = (
    cipher_text: string,
    key: string | CryptoJS.lib.WordArray,
    iv: CryptoJS.lib.WordArray,
  ) => {
    const bytes = CryptoJS.AES.decrypt(cipher_text, key, { iv: iv, mode: CryptoJS.mode.CBC });
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleClick = async () => {
    const userValues = await startPoll(setIsLoggedIn);
    const dataStr = userValues?.data[0];
    const iv = userValues?.data[1];
    const secretParse = window.atob(secret);
    const key = CryptoJS.enc.Utf8.parse(secretParse);
    const ivParsed = CryptoJS.enc.Base64.parse(iv);
    const decrypted = decryptString(dataStr, key, ivParsed);
    setUserId(userValues?.id);
    setCsrfToken(decrypted);
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
