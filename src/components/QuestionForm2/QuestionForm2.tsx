import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Question, QuestionNumber } from '../../types';
import { endPoll, fetchOneQuestion } from '../../utils/mobilityProfileAPI';
import useLocaleText from '../../utils/useLocaleText';
import ListItemCheckBox from '../ListItems/ListItemCheckBox/ListItemCheckBox';
import ListItemRadio from '../ListItems/ListItemRadio/ListItemRadio';

// TODO finalize state handling, form functiomality, add remaining POST requests & adjust styles.
// TODO eventually replace previous QuestionForm -component with this.

const QuestionForm2 = () => {
  const [questionData, setQuestionData] = useState<Question>({} as Question);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const intl = useIntl();

  const getLocaleText = useLocaleText();

  const { user, question } = useAppSelector((state) => state);
  const token = user.csrfToken;
  const questionId = question.questionId;
  const questionNumbersData = question.questionNumbers;

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

  const filterQuestionNumbers = () => {
    return sortedQuestionsData.reduce((filteredQuestions, item, index) => {
      if (index === questionIndex) {
        filteredQuestions.push(item);
      }
      return filteredQuestions;
    }, [] as QuestionNumber[]);
  };

  const lastItem = sortedQuestionsData.slice(-1);

  useEffect(() => {
    const items = filterQuestionNumbers();
    const questionItemNumber = items[0]?.number;
    const lastQuestienNumber = lastItem[0]?.number;
    if (questionItemNumber === lastQuestienNumber) {
      setIsLastPage(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastItem, questionIndex]);

  // TODO update this to post data into endpoint
  const onSubmit = (data: Question) => console.warn(JSON.stringify(data));

  // TODO Add remaining POST requests (hasCondition & isConditionMet)
  const handleNext = () => {
    setQuestionIndex(questionIndex + 1);
    const items = filterQuestionNumbers();
    const questionIdValue = items[0]?.id;
    if (questionIdValue) {
      fetchOneQuestion(questionIdValue, setQuestionData);
    }
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
            onClick={handleNext}
            disabled={isLastPage}
            aria-disabled={isLastPage}
            aria-label={intl.formatMessage({ id: 'app.buttons.next' })}
          >
            <p className="text-normal">{intl.formatMessage({ id: 'app.buttons.next' })}</p>
          </Button>
          {isLastPage && (
            <Link to="/summary">
              <Button
                className="button-submit"
                role="button"
                type="submit"
                onClick={() => endPoll(token)}
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

export default QuestionForm2;
