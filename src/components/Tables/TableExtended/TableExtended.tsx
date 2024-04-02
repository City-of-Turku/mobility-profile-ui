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
  const [otherCount, setOtherCount] = useState(0);

  const intl = useIntl();

  const dispatch = useAppDispatch();
  const {
    setSubQuestionAnswer,
    setCarCount,
    setOtherValue,
    resetOtherValue,
    setAllowNext,
    resetAllowNext,
  } = bindActionCreators(questionSlice.actions, dispatch);

  const { question3Answer, otherValue } = useAppSelector((state) => state.question);

  const getLocaleText = useLocaleText();
  const maxCount = 200;
  const isQuestionFour = questionData.number === '4';

  useEffect(() => {
    resetOtherValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    resetAllowNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOtherCount(otherValue.length);
  }, [otherValue]);

  /**
   * Count number of unique sub option values
   * @returns array
   */
  const getSubOptionValues = () => {
    const subOptionNumbers: (string | number | undefined)[] = [];
    subOptions.forEach((item) => {
      if (!subOptionNumbers.includes(item.sub_question)) {
        subOptionNumbers.push(item.sub_question);
      }
    });
    return subOptionNumbers;
  };

  useEffect(() => {
    const maxCount = questionData?.sub_questions?.length;
    const subOptionValues = getSubOptionValues();
    if (questionData.number === '1' && subOptionValues?.length === maxCount) {
      setAllowNext(true);
    }
    if (questionData.number !== '1' && subOptionValues?.length) {
      setAllowNext(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subOptions]);

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
        return 'Sähköpotkulauta, segway tai muu vastaava';
      default:
        return null;
    }
  };

  const getSubQuestionsIndex = () => {
    const transportType = getTransportType(question3Answer.fi);
    return questionData.sub_questions.findIndex((item) => item.description_fi === transportType);
  };

  const optionsArray = isQuestionFour
    ? questionData?.sub_questions[getSubQuestionsIndex()]?.options
    : questionData?.sub_questions[0]?.options;

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
    ? filterSubQuestions(questionData.sub_questions, question3Answer.fi)
    : questionData.sub_questions;

  useEffect(() => {
    setSubQuestionAnswer(subOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subOptions]);

  const createAnswerEvent = (
    event: React.ChangeEvent<HTMLInputElement>,
    option: Option,
    description: string,
  ) => {
    setSubOptions((prevSubOptions) => [
      ...prevSubOptions,
      {
        question: questionData.id,
        option: Number(event.target.value),
        sub_question: option.sub_question,
        other: option.is_other,
      },
    ]);

    if (questionData.number === '1' && description === 'Car') {
      setCarCount(option.value);
    }
  };

  const commonCellStyle = {
    fontSize: isQuestionFour ? '0.8rem' : '1rem',
  };

  /**
   * Medium sized table with only few options that are rendered horizontally.
   * Suitable for question 1.
   * @returns JSX element
   */
  const tableHorizontal = () => (
    <>
      <thead>
        <tr>
          <th style={commonCellStyle}>{intl.formatMessage({ id: 'app.text.options' })}</th>
          {optionsArray?.map((item) => (
            <th key={item.value_fi} style={commonCellStyle}>
              <label>
                {renderLocaleValue(getLocaleText, item.value_fi, item.value_en, item.value_sv)}
              </label>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {subQuestionsArray?.map((item) => (
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
                    onChange={(event) => createAnswerEvent(event, option, item.description_en)}
                  />
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </>
  );

  /**
   * Table with several options that needs to be vertical, otherwise it will be too wide for smaller & medium sized screens.
   * Suitable for question 4.
   * @returns JSX element
   */
  const tableVertical = () => (
    <>
      <tbody>
        {subQuestionsArray.map((item) => (
          <React.Fragment key={item.id}>
            {item?.options?.map((option) => (
              <tr key={option.id}>
                <td className="center-input input-w50">
                  <input
                    name={`row-${item.id}`}
                    type="radio"
                    value={option.id}
                    onChange={(event) => createAnswerEvent(event, option, item.description_en)}
                  />
                </td>
                {option.is_other ? (
                  <td>
                    <input
                      name={`row-${item.id}`}
                      type="text"
                      value={otherValue}
                      className="input-text"
                      maxLength={maxCount}
                      onChange={(event) => setOtherValue(event.target.value)}
                      placeholder={renderLocaleValue(
                        getLocaleText,
                        option.value_fi,
                        option.value_en,
                        option.value_sv,
                      )}
                    />
                    <small>{`${otherCount}/${maxCount} ${intl.formatMessage({
                      id: 'app.form.helperText.characters',
                    })}`}</small>
                  </td>
                ) : (
                  <td>
                    <label>
                      {renderLocaleValue(
                        getLocaleText,
                        option.value_fi,
                        option.value_en,
                        option.value_sv,
                      )}
                    </label>
                  </td>
                )}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </>
  );

  const renderTable = () => {
    if (isQuestionFour) {
      return tableVertical();
    }
    return tableHorizontal();
  };

  return (
    <div className="table-responsive">
      <Table bordered striped hover>
        {renderTable()}
      </Table>
    </div>
  );
};

export default TableExtended;
