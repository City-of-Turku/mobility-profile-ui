import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import questionSlice from '../../../redux/slices/questionSlice';
import { Option, QuestionAnswer, TableCommonProps } from '../../../types';
import useLocaleText from '../../../utils/useLocaleText';
import { renderLocaleValue } from '../../../utils/utils';

/**
 * Component that renders table for questions without sub questions.
 * Is used by most of the questions.
 */

const TableCommon: React.FC<TableCommonProps> = ({ question }) => {
  const [mainOptions, setMainOptions] = useState<QuestionAnswer[]>([]);
  const [disabledOptions, setDisabledOptions] = useState<number[]>([]);
  const [otherCount, setOtherCount] = useState(0);

  const dispatch = useAppDispatch();
  const {
    setQuestionAnswer,
    setQuestion1cAnswer,
    setQuestion3Answer,
    setQuestion7Answer,
    setOtherValue,
    resetOtherValue,
    setAllowNext,
    resetAllowNext,
  } = bindActionCreators(questionSlice.actions, dispatch);

  const { otherValue } = useAppSelector((state) => state.question);
  const intl = useIntl();

  const numberOfOptions = question.number_of_options_to_choose;
  // This applies only to 1 question
  const limitSelections = question.number_of_options_to_choose === '3';
  const maxCount = 200;
  const getLocaleText = useLocaleText();

  useEffect(() => {
    resetOtherValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mainOptions.length) {
      resetAllowNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainOptions]);

  useEffect(() => {
    setOtherCount(otherValue.length);
  }, [otherValue]);

  useEffect(() => {
    setQuestionAnswer(mainOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainOptions]);

  useEffect(() => {
    if (mainOptions.length) {
      setAllowNext(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainOptions]);

  const createAnswerEvent = (event: React.ChangeEvent<HTMLInputElement>, option: Option) => {
    const selectedOptionId = Number(event.target.value);
    const isSelected = mainOptions.some((mainOption) => mainOption.option === selectedOptionId);

    if (isSelected) {
      setMainOptions((prevMainOptions) =>
        prevMainOptions.filter((mainOption) => mainOption.option !== selectedOptionId),
      );
    } else if (limitSelections && mainOptions.length < 3) {
      setMainOptions((prevMainOptions) => [
        ...prevMainOptions,
        {
          question: question.id,
          option: selectedOptionId,
          other: option.is_other,
        },
      ]);
    } else {
      setMainOptions((prevMainOptions) => [
        ...prevMainOptions,
        {
          question: question.id,
          option: Number(event.target.value),
          other: option.is_other,
        },
      ]);
    }

    if (question.number === '3') {
      const values = {
        fi: option.value_fi,
        en: option.value_en,
        sv: option.value_sv,
      };
      setQuestion3Answer(values);
    }
    if (question.number === '1c') {
      setQuestion1cAnswer(option.value);
    }
    if (question.number === '7') {
      setQuestion7Answer(option.value);
    }
  };

  useEffect(() => {
    if (limitSelections) {
      const selectedOptionIds = mainOptions.map((mainOption) => mainOption.option);
      const newDisabledOptions = question?.options
        ?.map((option) => option.id)
        .filter((optionId) => !selectedOptionIds.includes(optionId));
      setDisabledOptions(newDisabledOptions);
    }
  }, [mainOptions, question, limitSelections]);

  return (
    <div>
      {limitSelections ? (
        <div className="mb-2">
          <p className="text-normal">
            {renderLocaleValue(
              getLocaleText,
              question.description_fi,
              question.description_en,
              question.description_sv,
            )}
          </p>
        </div>
      ) : null}
      <Table bordered striped hover responsive>
        <tbody>
          {question?.options?.map((option) => (
            <tr key={option.id}>
              <td className="center-input input-w50">
                <input
                  id={`option_${option.id}`}
                  name={'id'}
                  type={numberOfOptions === '1' ? 'radio' : 'checkbox'}
                  value={option.id}
                  checked={mainOptions.some((mainOption) => mainOption.option === option.id)}
                  onChange={(event) => createAnswerEvent(event, option)}
                  disabled={
                    limitSelections &&
                    mainOptions.length >= 3 &&
                    disabledOptions.includes(option.id)
                  }
                />
              </td>
              {option.is_other ? (
                <td>
                  <input
                    id={`other_${option.id}`}
                    name={'id'}
                    type="text"
                    value={otherValue}
                    className="input-text"
                    maxLength={maxCount}
                    onChange={(event) => setOtherValue(event.target.value)}
                    aria-describedby={`charCount_${option.id}`}
                    placeholder={renderLocaleValue(
                      getLocaleText,
                      option.value_fi,
                      option.value_en,
                      option.value_sv,
                    )}
                  />
                  <small
                    id={`charCount_${option.id}`}
                  >{`${otherCount}/${maxCount} ${intl.formatMessage({
                    id: 'app.form.helperText.characters',
                  })}`}</small>
                </td>
              ) : (
                <td>
                  <label className="text-label" htmlFor={`option_${option.id}`}>
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
        </tbody>
      </Table>
    </div>
  );
};

export default TableCommon;
