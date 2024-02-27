import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import userSlice from '../../redux/slices/userSlice';
import { Question } from '../../types';
import {
  fetchQuestionConditionMet,
  fetchQuestionsWithConditions,
  fetchUserResult,
  postQuestionAnswer,
} from '../../utils/mobilityProfileAPI';
import useLocaleText from '../../utils/useLocaleText';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import ErrorComponent from '../Errors/ErrorComponent/ErrorComponent';
import TableCommon from '../Tables/TableCommon/TableCommon';
import TableExtended from '../Tables/TableExtended/TableExtended';

// TODO Improve skip question functionality (include single questions).

const QuestionForm = () => {
  const [questionData, setQuestionData] = useState<Question>({} as Question);
  const [conditionalQuestions, setConditionalQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [userHasAnswered, setUserHasAnswered] = useState('');
  const [isLastPage, setIsLastPage] = useState(false);
  const [isError, setIsError] = useState(false);

  const intl = useIntl();

  const getLocaleText = useLocaleText();

  const dispatch = useAppDispatch();
  const { setProfileResult } = bindActionCreators(userSlice.actions, dispatch);

  const {
    firstQuestion,
    allQuestions,
    questionAnswer,
    subQuestionAnswer,
    question3Answer,
    question7Answer,
    questionApiError,
  } = useAppSelector((state) => state.question);
  const { localeSelection } = useAppSelector((state) => state.settings);
  const { csrfToken } = useAppSelector((state) => state.user);

  const [filteredQuestions, setFilteredQuestions] = useState(allQuestions);

  /**
   * Set first question
   */
  useEffect(() => {
    setQuestionData(firstQuestion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstQuestion]);

  useEffect(() => {
    fetchQuestionsWithConditions(setConditionalQuestions);
  }, []);

  useEffect(() => {
    if (!firstQuestion.question.length) {
      setIsError(true);
    }
  }, [firstQuestion.question]);

  const lastItem = allQuestions?.slice(-1)[0];

  useEffect(() => {
    const questionItemNumber = questionData.number;
    const lastQuestionNumber = lastItem?.number;
    if (questionItemNumber === lastQuestionNumber) {
      setIsLastPage(true);
    }
  }, [lastItem, questionData.number]);

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
    setUserHasAnswered(questionData.number);
  };

  const findNextQuestion = (indexVal: number) => {
    return filteredQuestions[indexVal];
  };

  /**
   * Find question by number value
   * @param questionNum
   * @returns object
   */
  const findQuestionByNumber = (questionNum: string) => {
    return filteredQuestions.find((item) => item.number === questionNum);
  };

  /**
   * Create array of those of questions that are conditional and related to the question 1.
   * @returns array of objects
   */
  const createSetOfQuestions = () => {
    const questions = ['1a', '1b1', '1b2', '1b3', '1c', '1d', '9'];
    return conditionalQuestions.filter((item) => questions.includes(item.number));
  };

  /**
   * Filter multiple questions in one function
   */
  const filterMultipleQuestions = async (arrayOfIds: number[] | undefined) => {
    const filtered = allQuestions.filter((item) => !arrayOfIds?.includes(item.id));
    setFilteredQuestions(filtered);
  };

  /**
   * Make a multiple requests into endpoint.
   * If returned object contains false value, save question id into an array.
   * Filter false values from the all questions array.
   */
  const checkMultipleConditions = async () => {
    const questionsSet = createSetOfQuestions();
    const removableQuestions: number[] = [];
    await Promise.all(
      questionsSet.map(async (item) => {
        const condition = await fetchQuestionConditionMet(item.id, csrfToken);
        if (condition.condition_met === false) {
          removableQuestions.push(item.id);
        }
      }),
    );
    await filterMultipleQuestions(removableQuestions);
  };

  /**
   * Filter one question
   * @param idValue
   */
  const filterQuestion = async (idValue: number) => {
    const filteredCopy = [...filteredQuestions];
    const filtered = filteredCopy.filter((item) => item.id !== idValue);
    setFilteredQuestions(filtered);
  };

  /**
   * Check condition status of a single question
   * @param userAnswer
   * @param nextQuestionNum
   */
  const checkSingleQuestion = async (userAnswer: string, nextQuestionNum: string) => {
    if (userHasAnswered === userAnswer) {
      const next = findQuestionByNumber(nextQuestionNum);
      if (next) {
        const condition = await fetchQuestionConditionMet(next.id, csrfToken);
        if (condition.condition_met === false) {
          filterQuestion(next.id);
          setQuestionData(findNextQuestion(questionIndex));
        } else {
          setQuestionData(next);
        }
      }
    }
  };

  const checkSingleQuestionLocally = async (nextQuestionNum: string) => {
    const conditionMet = question7Answer === 'Kyllä.';
    if (userHasAnswered === '7') {
      const next = findQuestionByNumber(nextQuestionNum);
      if (next) {
        if (conditionMet) {
          filterQuestion(next.id);
          setQuestionData(findNextQuestion(questionIndex));
        } else {
          setQuestionData(next);
        }
      }
    }
  };

  useEffect(() => {
    checkSingleQuestion('4', '5');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHasAnswered, questionIndex]);

  useEffect(() => {
    checkSingleQuestionLocally('8');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHasAnswered, questionIndex]);

  // TODO Improve skip question logic
  const handleNext = async () => {
    setQuestionIndex((prevIndex) => prevIndex + 1);
    postAllAnswers();
    // Get next question object
    const nextQuestion = findNextQuestion(questionIndex);
    // Check that next question object is valid
    if (nextQuestion && Object.keys(nextQuestion).length) {
      // Check if we are in first question
      if (questionData.number === '1') {
        await checkMultipleConditions();
        setQuestionData(findNextQuestion(questionIndex));
      } else if (questionData.number !== '4' && questionData.number !== '7') {
        setQuestionData(nextQuestion);
      }
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
      {questionApiError || isError ? (
        <ErrorComponent translationId="app.questions.api.error">
          <HomeButton />
        </ErrorComponent>
      ) : (
        <form>{renderList()}</form>
      )}
    </div>
  );
};

export default QuestionForm;
