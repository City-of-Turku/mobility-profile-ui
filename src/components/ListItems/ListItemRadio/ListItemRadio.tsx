import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import questionSlice from '../../../redux/slices/questionSlice';
import { ListItemRadioProps, Option, QuestionAnswer } from '../../../types';
import useLocaleText from '../../../utils/useLocaleText';
import { renderLocaleValue } from '../../../utils/utils';

const ListItemRadio: React.FC<ListItemRadioProps> = ({ questionData }) => {
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
        return 'Auto';
      case 'mopolla tai skootterilla':
        return 'Mopo tai skootteri';
      case 'linja-autolla':
        return 'Joukkoliikenne (juna, linja-auto)';
      case 'jalkaisin':
        return 'Kävellen';
      case 'junalla':
        return 'Joukkoliikenne (juna, linja-auto)';
      case 'polkupyörällä tai sähköpyörällä':
        return 'Polkupyörä tai sähköpyörä tms';
      case 'sähköpotkulaudalla tai muulla vastaavalla':
        return 'Muu';
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
          {questionData?.sub_questions?.map((subQuestion) => (
            <tr key={subQuestion.id}>
              <td style={commonCellStyle}>
                <label>
                  {renderLocaleValue(
                    getLocaleText,
                    subQuestion.description_fi,
                    subQuestion.description_en,
                    subQuestion.description_sv,
                  )}
                </label>
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
