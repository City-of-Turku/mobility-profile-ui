import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import userSlice from '../../redux/slices/userSlice';
import { Question } from '../../types';
import { fetchUserResult, postQuestionAnswer } from '../../utils/mobilityProfileAPI';
import useLocaleText from '../../utils/useLocaleText';
import { sortQuestionsData } from '../../utils/utils';
import TableCommon from '../Tables/TableCommon/TableCommon';
import TableExtended from '../Tables/TableExtended/TableExtended';

// TODO Add skip question functionality

const QuestionForm = () => {
  const [questionData, setQuestionData] = useState<Question>({} as Question);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const intl = useIntl();

  const getLocaleText = useLocaleText();

  const dispatch = useAppDispatch();
  const { setProfileResult } = bindActionCreators(userSlice.actions, dispatch);

  const { firstQuestion, allQuestions, questionAnswer, subQuestionAnswer, question3Answer } =
    useAppSelector((state) => state.question);
  const { localeSelection } = useAppSelector((state) => state.settings);
  const { csrfToken } = useAppSelector((state) => state.user);

  const [currentQuestionId, setCurrentQuestionId] = useState(firstQuestion.id);

  /**
   * Find question object
   * @param questionIdVal
   * @returns object
   */
  const findQuestion = (questionIdVal: number) => {
    return allQuestions.find((item) => item.id === questionIdVal);
  };

  /**
   * Set first question
   */
  useEffect(() => {
    setQuestionData(firstQuestion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstQuestion]);

  const questionsDataItems = [...allQuestions];

  const sortedQuestionsData = sortQuestionsData(questionsDataItems);

  const lastItem = sortedQuestionsData.slice(-1);

  useEffect(() => {
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

  /** Function that fetches poll result */
  const endPoll = () => {
    fetchUserResult(csrfToken, setProfileResult);
  };

  /**
   * Post answers into API.
   * Map the array containing answers and POST each into API endpoint.
   */
  const postAllAnswers = () => {
    if (questionData.sub_questions) {
      subQuestionAnswer.forEach((item) => {
        postQuestionAnswer(item, csrfToken);
      });
    }
    questionAnswer.forEach((item) => {
      postQuestionAnswer(item, csrfToken);
    });
  };

  // TODO Add skip question logic
  const handleNext = () => {
    setQuestionIndex((prevIndex) => prevIndex + 1);
    if (currentQuestionId) {
      postAllAnswers();
    }
    const getQuestion = findQuestion(currentQuestionId);
    if (getQuestion) {
      setQuestionData(getQuestion);
    }
  };

  /**
   * Format transport types before appending them into sentence.
   * Default value would look out of place when part of the sentence.
   * @param str string
   * @returns string
   */
  const formatTransportType = (str: string) => {
    const lower = str.toLowerCase();
    switch (lower) {
      case 'autolla':
        return intl.formatMessage({ id: 'app.transport.car' });
      case 'mopolla tai skootterilla':
        return intl.formatMessage({ id: 'app.transport.motorbike' });
      case 'linja-autolla':
        return intl.formatMessage({ id: 'app.transport.bus' });
      case 'jalkaisin':
        return intl.formatMessage({ id: 'app.transport.walk' });
      case 'junalla':
        return intl.formatMessage({ id: 'app.transport.train' });
      case 'polkupyörällä tai sähköpyörällä':
        return intl.formatMessage({ id: 'app.transport.bicycle' });
      case 'sähköpotkulaudalla tai muulla vastaavalla':
        return intl.formatMessage({ id: 'app.transport.scooter' });
      default:
        return null;
    }
  };

  /**
   * Append answer of question 3 into the question string of question number 4. Otherwise use default format.
   * @param formatType
   * @param texts
   * @returns JSX element
   */
  const formatText = (formatType: 'default' | 'withAnswer', ...texts: string[]) => {
    const localeTexts = {
      fi: texts[0],
      en: texts[1],
      sv: texts[2],
    };
    const localeText = getLocaleText(localeTexts);

    if (formatType === 'default') {
      if (localeText.includes('(')) {
        const parts = localeText.split('(');
        return (
          <>
            <h3 className="header-h3 mb-3">{`${parts[0]}`}</h3>
            <h4 className="header-h4 mb-3">{parts[1].replace(')', '')}</h4>
          </>
        );
      }
      return <h3 className="header-h3">{localeText}</h3>;
    }

    if (formatType === 'withAnswer') {
      if (localeText.includes('<<') || localeText.includes('>>')) {
        const parts = localeText.split(/<<|>>/g);
        return (
          <h3 className="header-h3">
            {localeSelection === 'en'
              ? `${parts[0]} ${formatTransportType(question3Answer.fi)} ${parts[2]}`
              : `${parts[0]} ${formatTransportType(question3Answer.fi)}`}
          </h3>
        );
      }
    }
    return null;
  };

  const renderList = () => {
    return (
      <div className="form-content">
        <div key={questionData.id} className="form-content-inner">
          <div className="text-container ml-0">
            {questionData.number === '4'
              ? formatText(
                  'withAnswer',
                  questionData.question_fi,
                  questionData.question_en,
                  questionData.question_sv,
                )
              : formatText(
                  'default',
                  questionData.question_fi,
                  questionData.question_en,
                  questionData.question_sv,
                )}
          </div>
          <div className="form-list-container">
            <Form.Group>
              <TableCommon question={questionData} />
            </Form.Group>
          </div>
          {questionData.sub_questions && (
            <div className="form-list-container">
              <TableExtended questionData={questionData} />
            </div>
          )}
        </div>
        <div className="buttons-container-flex">
          {!isLastPage && (
            <Button
              className="button-primary"
              role="button"
              onClick={() => handleNext()}
              aria-label={intl.formatMessage({ id: 'app.buttons.next' })}
            >
              <p className="text-normal">{intl.formatMessage({ id: 'app.buttons.next' })}</p>
            </Button>
          )}
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
      <form>{renderList()}</form>
    </div>
  );
};

export default QuestionForm;
