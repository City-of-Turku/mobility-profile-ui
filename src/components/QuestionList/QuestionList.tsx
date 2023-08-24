import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { QuestionListItem, QuestionListProps } from '../../types';
import { fetchQuestions } from '../../utils/mobilityProfileAPI';
import Pagination from '../Pagination/Pagination';

const QuestionList = ({ itemsPerPage }: QuestionListProps) => {
  const [questionList, setQuestionList] = useState<Array<QuestionListItem>>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchQuestions(setQuestionList);
  }, []);

  const renderList = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = questionList.slice(startIndex, endIndex);

    return paginatedItems?.map((question) => (
      <div key={question.id}>
        <Typography variant="body2" sx={{ mb: '0.3rem', color: '#000000' }}>
          {question.question}
        </Typography>
        {question.description !== 'None' ? (
          <Typography variant="body2">{question.description}</Typography>
        ) : null}
      </div>
    ));
  };

  return (
    <div>
      <div className="list-container">{renderList()}</div>
      <Pagination
        items={questionList}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default QuestionList;
