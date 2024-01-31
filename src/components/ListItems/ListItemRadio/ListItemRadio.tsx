import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import questionSlice from '../../../redux/slices/questionSlice';
import { ListItemRadioProps, Option, QuestionAnswer } from '../../../types';
import useLocaleText from '../../../utils/useLocaleText';
import { renderLocaleValue } from '../../../utils/utils';

const ListItemRadio: React.FC<ListItemRadioProps> = ({ question }) => {
  const [subOptions, setSubOptions] = useState<QuestionAnswer[]>([]);

  const intl = useIntl();

  const dispatch = useAppDispatch();
  const { setSubQuestionAnswer } = bindActionCreators(questionSlice.actions, dispatch);

  const getLocaleText = useLocaleText();

  const optionsArray = question.sub_questions[0].options;

  useEffect(() => {
    setSubQuestionAnswer(subOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subOptions]);

  const createAnswerEvent = (event: React.ChangeEvent<HTMLInputElement>, option: Option) => {
    setSubOptions((prevSubOptions) => [
      ...prevSubOptions,
      {
        question: question.id,
        option: Number(event.target.value),
        sub_question: option.sub_question,
      },
    ]);
  };

  const commonCellStyle = {
    fontSize: question.number === '4' ? '0.8rem' : '1rem',
  };

  return (
    <div className="table-responsive">
      <Table bordered striped hover size={question.number === '4' ? 'sm' : 'md'}>
        <thead>
          <tr>
            <th style={commonCellStyle}>{intl.formatMessage({ id: 'app.text.options' })}</th>
            {optionsArray.map((item) => (
              <th key={item.value_fi} style={commonCellStyle}>
                {renderLocaleValue(getLocaleText, item.value_fi, item.value_en, item.value_sv)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {question.sub_questions.map((subQuestion) => (
            <tr key={subQuestion.id}>
              <td style={commonCellStyle}>
                {renderLocaleValue(
                  getLocaleText,
                  subQuestion.description_fi,
                  subQuestion.description_en,
                  subQuestion.description_sv,
                )}
              </td>
              {subQuestion.options
                .filter((option) => option.value !== 'None')
                .map((option) => (
                  <td key={option.id} className="center-input">
                    <input
                      name={`row-${subQuestion.id}`}
                      type="radio"
                      value={option.id}
                      onChange={(event) => createAnswerEvent(event, option)}
                    />
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListItemRadio;
