import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { QuestionListItem } from '../../types';
import { fetchQuestions } from '../../utils/mobilityProfileAPI';

// TODO add state handling & adjust styles

const QuestionList = () => {
  const [questionList, setQuestionList] = useState<Array<QuestionListItem>>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const StyledButton = styled(Button)({
    textTransform: 'none',
    fontSize: '1rem',
  });

  const { control, handleSubmit } = useForm<QuestionListItem>();

  useEffect(() => {
    fetchQuestions(setQuestionList);
  }, []);

  // TODO update this to post data into endpoint
  const onSubmit = (data: QuestionListItem) => alert(data);

  const itemsPerPage = 2;
  const pageCount = Math.ceil(questionList.length / itemsPerPage);

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
      <div className="content-main">
        {questionList
          ?.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
          .map((question) => (
            <div key={question.id} className="content-inner">
              <Typography variant="body2" sx={{ color: '#000000', fontSize: '1rem' }}>
                {question.question}
              </Typography>
              {question.description !== 'None' ? (
                <Typography variant="body2" sx={{ color: '#000000', fontSize: '1rem' }}>
                  {question.description}
                </Typography>
              ) : null}
              <div className="list-container">
                <Controller
                  name="id"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select className="input-select" {...field}>
                      {question?.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {question?.sub_questions?.map((item) => (
                  <div key={item.id}>
                    <Typography
                      variant="body2"
                      sx={{ m: '0.3rem 0', color: '#000000', fontSize: '1rem' }}
                    >
                      {item.description}
                    </Typography>
                    <Controller
                      name="id"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <select className="input-select" {...field}>
                          {item?.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                ))}
              </div>
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

export default QuestionList;
