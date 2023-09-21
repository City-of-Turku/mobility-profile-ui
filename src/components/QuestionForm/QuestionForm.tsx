import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Question } from '../../types';
import { fetchQuestions } from '../../utils/mobilityProfileAPI';
import ListItemCheckBox from '../ListItems/ListItemCheckBox/ListItemCheckBox';
import ListItemRadio from '../ListItems/ListItemRadio/ListItemRadio';

// TODO finalize state handling & adjust styles

const QuestionForm = () => {
  const [questionListData, setQuestionListData] = useState<Array<Question>>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const { handleSubmit } = useForm<Question>();

  useEffect(() => {
    fetchQuestions(setQuestionListData);
  }, []);

  // TODO update this to post data into endpoint
  const onSubmit = (data: Question) => alert(data);

  const itemsPerPage = 1;
  const pageCount = Math.ceil(questionListData.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const formatQuestion = (inputString: string) => {
    if (inputString.includes('(')) {
      const parts = inputString.split(':');
      return (
        <>
          <h4>{`${parts[0]}?`}</h4>
          <h5>{parts[1]}</h5>
        </>
      );
    }
    return <h4>{inputString}</h4>;
  };

  const renderList = () => {
    return (
      <div className="form-content">
        {questionListData
          ?.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
          .map((question) => (
            <div key={question.id} className="form-content-inner">
              <div className="text-container ml-0">{formatQuestion(question.question)}</div>
              <div className="form-list-container">
                <Form.Group>
                  <ListItemCheckBox question={question} />
                </Form.Group>
              </div>
              {question.sub_questions && (
                <div className="form-list-container">
                  <ListItemRadio question={question} />
                </div>
              )}
            </div>
          ))}
        <div className="buttons-container">
          <Button variant="primary" onClick={handlePrevious} disabled={currentPage === 0}>
            <FormattedMessage id="app.buttons.previous" />
          </Button>
          <Button variant="primary" onClick={handleNext} disabled={currentPage === pageCount - 1}>
            <FormattedMessage id="app.buttons.next" />
          </Button>
          {currentPage === pageCount - 1 && (
            <Button variant="success" type="submit">
              <FormattedMessage id="app.buttons.submit" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="content-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>{renderList()}</form>
    </div>
  );
};

export default QuestionForm;
