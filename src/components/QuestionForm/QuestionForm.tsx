import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import userSlice from '../../redux/slices/userSlice';
import { Question } from '../../types';
import {
  fetchOneQuestion,
  fetchUserResult,
  postQuestionAnswer,
} from '../../utils/mobilityProfileAPI';
import useLocaleText from '../../utils/useLocaleText';
import ListItemCheckBox from '../ListItems/ListItemCheckBox/ListItemCheckBox';
import ListItemRadio from '../ListItems/ListItemRadio/ListItemRadio';

// TODO finalize state handling, form functiomality, add remaining POST requests & adjust styles.

const QuestionForm = () => {
  const [questionData, setQuestionData] = useState<Question>({} as Question);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const intl = useIntl();

  const getLocaleText = useLocaleText();

  const dispatch = useAppDispatch();
  const { setProfileResult } = bindActionCreators(userSlice.actions, dispatch);

  const { question, user } = useAppSelector((state) => state);
  const questionId = question.questionId;
  const questionNumbersData = question.questionNumbers;
  const questionAnswerObj = question.questionAnswer;
  const subQuestionAnswerObj = question.subQuestionAnswer;
  const token = user.csrfToken;

  const [currentQuestionId, setCurrentQuestionId] = useState(questionId);

  const { handleSubmit } = useForm<Question>();

  /**
   * Fetch first question
   */
  useEffect(() => {
    fetchOneQuestion(questionId, setQuestionData);
  }, [questionId]);

  const questionNumbersDataItems = [...questionNumbersData];

  const sortedQuestionsData = questionNumbersDataItems?.sort((a, b) => {
    const numA = parseInt(a.number, 10);
    const numB = parseInt(b.number, 10);

    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    } else {
      return a.number.localeCompare(b.number);
    }
  });

  const lastItem = sortedQuestionsData.slice(-1);

  useEffect(() => {
    // const items = filterQuestionNumbers();
    const questionItemNumber = sortedQuestionsData[questionIndex]?.number;
    const lastQuestionNumber = lastItem[0]?.number;
    if (questionItemNumber === lastQuestionNumber) {
      setIsLastPage(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastItem, questionIndex]);

  useEffect(() => {
    setCurrentQuestionId(sortedQuestionsData[questionIndex]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex]);

  const endPoll = () => {
    fetchUserResult(token, setProfileResult);
  };

  // TODO update this to post data into endpoint
  const onSubmit = (data: Question) => console.warn(JSON.stringify(data));

  // TODO Add remaining POST requests (isConditionMet) & add skip question logic
  const handleNext = (questionData: Question) => {
    setQuestionIndex(questionIndex + 1);
    if (currentQuestionId) {
      postQuestionAnswer(
        questionData.sub_questions ? subQuestionAnswerObj : questionAnswerObj,
        token,
      );
    }
    fetchOneQuestion(currentQuestionId, setQuestionData);
  };

  const formatQuestion = (...texts: string[]) => {
    const localeTexts = {
      fi: texts[0],
      en: texts[1],
      sv: texts[2],
    };

    const localeText = getLocaleText(localeTexts);

    if (localeText.includes('(')) {
      const parts = localeText.split(':');
      return (
        <>
          <h3 className="header-h3 mb-3">{`${parts[0]}?`}</h3>
          <h4 className="header-h4 mb-3">{parts[1]}</h4>
        </>
      );
    }
    return <h3 className="header-h3">{localeText}</h3>;
  };

  const renderList = () => {
    return (
      <div className="form-content">
        <div key={questionData.id} className="form-content-inner">
          <div className="text-container ml-0">
            {formatQuestion(
              questionData.question_fi,
              questionData.question_en,
              questionData.question_sv,
            )}
          </div>
          <div className="form-list-container">
            <Form.Group>
              <ListItemCheckBox question={questionData} />
            </Form.Group>
          </div>
          {questionData.sub_questions && (
            <div className="form-list-container">
              <ListItemRadio question={questionData} />
            </div>
          )}
        </div>
        <div className="buttons-container-flex">
          <Button
            className="button-primary"
            role="button"
            onClick={() => handleNext(questionData)}
            disabled={isLastPage}
            aria-disabled={isLastPage}
            aria-label={intl.formatMessage({ id: 'app.buttons.next' })}
          >
            <p className="text-normal">{intl.formatMessage({ id: 'app.buttons.next' })}</p>
          </Button>
          {isLastPage && (
            <Link to="/info">
              <Button
                className="button-submit"
                role="button"
                type="submit"
                onClick={() => endPoll()}
                aria-label={intl.formatMessage({ id: 'app.buttons.submit' })}
              >
                <p className="text-normal">{intl.formatMessage({ id: 'app.buttons.submit' })}</p>
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>{renderList()}</form>
    </div>
  );
};

export default QuestionForm;
