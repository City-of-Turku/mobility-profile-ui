import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import questionSlice from '../../../redux/slices/questionSlice';
import { Option, QuestionAnswer, SubQuestion, TableExtendedProps } from '../../../types';
import useLocaleText from '../../../utils/useLocaleText';
import { renderLocaleValue } from '../../../utils/utils';

/**
 * Component that renders table for questions with sub questions.
 * Is used by two questions.
 */

const TableExtended: React.FC<TableExtendedProps> = ({ questionData }) => {
  const [subOptions, setSubOptions] = useState<QuestionAnswer[]>([]);

  const intl = useIntl();

  const dispatch = useAppDispatch();
  const { setSubQuestionAnswer } = bindActionCreators(questionSlice.actions, dispatch);

  const { question } = useAppSelector((state) => state);
  const question3Answer = question.question3Answer.fi;

  const getLocaleText = useLocaleText();

  const isQuestionFour = questionData.number === '4';

  const getTransportType = (str: string) => {
    const lower = str.toLowerCase();
    switch (lower) {
      case 'autolla':
        return 'auto';
      case 'mopolla tai skootterilla':
        return 'mopo tai skootteri';
      case 'linja-autolla':
        return 'joukkoliikenne (juna, linja-auto)';
      case 'jalkaisin':
        return 'kävellen';
      case 'junalla':
        return 'joukkoliikenne (juna, linja-auto)';
      case 'polkupyörällä tai sähköpyörällä':
        return 'polkupyörä tai sähköpyörä tms';
      case 'sähköpotkulaudalla tai muulla vastaavalla':
        return 'muu';
      default:
        return null;
    }
  };

  const getSubQuestionsIndex = () => {
    const transportType = getTransportType(question3Answer);
    return questionData.sub_questions.findIndex((item) => item.description_fi === transportType);
  };

  const optionsArray = isQuestionFour
    ? questionData.sub_questions[getSubQuestionsIndex()].options
    : questionData.sub_questions[0].options;

  const filterSubQuestions = (data: SubQuestion[], question3Answer: string): SubQuestion[] => {
    return data.reduce((acc, curr) => {
      const transportType = getTransportType(question3Answer);
      if (curr.description_fi === transportType) {
        acc.push(curr);
      }
      return acc;
    }, [] as SubQuestion[]);
  };

  const subQuestionsArray = isQuestionFour
    ? filterSubQuestions(questionData.sub_questions, question3Answer)
    : questionData.sub_questions;

  useEffect(() => {
    setSubQuestionAnswer(subOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subOptions]);

  const createAnswerEvent = (event: React.ChangeEvent<HTMLInputElement>, option: Option) => {
    setSubOptions((prevSubOptions) => [
      ...prevSubOptions,
      {
        question: questionData.id,
        option: Number(event.target.value),
        sub_question: option.sub_question,
      },
    ]);
  };

  const commonCellStyle = {
    fontSize: isQuestionFour ? '0.8rem' : '1rem',
  };

  return (
    <div className="table-responsive">
      <Table bordered striped hover size={isQuestionFour ? 'sm' : 'md'}>
        <thead>
          <tr>
            <th style={commonCellStyle}>{intl.formatMessage({ id: 'app.text.options' })}</th>
            {optionsArray.map((item) => (
              <th key={item.value_fi} style={commonCellStyle}>
                <label>
                  {renderLocaleValue(getLocaleText, item.value_fi, item.value_en, item.value_sv)}
                </label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subQuestionsArray.map((item) => (
            <tr key={item.id}>
              <td style={commonCellStyle}>
                <label>
                  {renderLocaleValue(
                    getLocaleText,
                    item.description_fi,
                    item.description_en,
                    item.description_sv,
                  )}
                </label>
              </td>
              {item.options
                .filter((option) => option.value !== 'None')
                .map((option) => (
                  <td key={option.id} className="center-input">
                    <input
                      name={`row-${item.id}`}
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

export default TableExtended;
