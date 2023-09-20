import { Button, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
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

  const renderList = () => {
    return (
      <div className="form-content">
        {questionListData
          ?.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
          .map((question) => (
            <div key={question.id} className="form-content-inner">
              <h3>{question.question}</h3>
              <div className="form-list-container">
                <FormControl fullWidth>
                  <ListItemCheckBox question={question} />
                </FormControl>
              </div>
              {question.sub_questions && <ListItemRadio question={question} />}
            </div>
          ))}
        <div className="button-container">
          <StyledButton variant="contained" onClick={handlePrevious} disabled={currentPage === 0}>
            <FormattedMessage id="app.buttons.previous" />
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={handleNext}
            disabled={currentPage === pageCount - 1}
          >
            <FormattedMessage id="app.buttons.next" />
          </StyledButton>
          {currentPage === pageCount - 1 && (
            <StyledButton variant="contained" type="submit">
              <FormattedMessage id="app.buttons.submit" />
            </StyledButton>
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

const StyledButton = styled(Button)({
  textTransform: 'none',
  fontSize: '1rem',
});

export default QuestionForm;
