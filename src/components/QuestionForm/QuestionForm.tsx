import { Button, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Question } from '../../types';
import { endPoll, fetchQuestions } from '../../utils/mobilityProfileAPI';
import useLocaleText from '../../utils/useLocaleText';
import ListItemCheckBox from '../ListItems/ListItemCheckBox/ListItemCheckBox';
import ListItemRadio from '../ListItems/ListItemRadio/ListItemRadio';

// TODO finalize state handling, form functiomality & adjust styles

const QuestionForm = () => {
  const [questionListData, setQuestionListData] = useState<Array<Question>>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const theme = useTheme();

  const getLocaleText = useLocaleText();

  const { user } = useAppSelector((state) => state);
  const token = user.csrfToken;

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
          <Typography
            component="h3"
            sx={{ mb: theme.spacing(1.2), ...theme.typography.h3 }}
          >{`${parts[0]}?`}</Typography>
          <Typography component="h4" sx={{ mb: theme.spacing(1), ...theme.typography.h4 }}>
            {parts[1]}
          </Typography>
        </>
      );
    }
    return (
      <Typography component="h3" sx={{ ...theme.typography.h3 }}>
        {localeText}
      </Typography>
    );
  };

  const renderList = () => {
    return (
      <div className="form-content">
        {questionListData
          ?.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
          .map((question) => (
            <div key={question.id} className="form-content-inner">
              <div className="text-container ml-0">
                {formatQuestion(question.question_fi, question.question_en, question.question_sv)}
              </div>
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
            <StyledButton
              variant="contained"
              type="submit"
              onClick={() => endPoll(token)}
              sx={{ backgroundColor: 'rgb(0, 133, 95)' }}
            >
              <FormattedMessage id="app.buttons.submit" />
            </StyledButton>
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

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  backgroundColor: theme.palette.primary.main,
  ...theme.typography.body1,
}));

export default QuestionForm;
