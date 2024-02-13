import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAppDispatch } from '../../../hooks/reduxHooks';
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

  const dispatch = useAppDispatch();
  const { setQuestionAnswer, setQuestion3Answer } = bindActionCreators(
    questionSlice.actions,
    dispatch,
  );

  const numberOfOptions = question.number_of_options_to_choose;
  // This applies only to 1 question
  const limitSelections = question.number_of_options_to_choose === '3';

  const getLocaleText = useLocaleText();

  useEffect(() => {
    setQuestionAnswer(mainOptions);
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
        },
      ]);
    } else {
      setMainOptions((prevMainOptions) => [
        ...prevMainOptions,
        {
          question: question.id,
          option: Number(event.target.value),
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
  };

  return (
    <div className="table-responsive">
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
      <Table bordered striped hover>
        <tbody>
          {question?.options?.map((option) => (
            <tr key={option.id}>
              <td className="center-input input-w50">
                <input
                  name={'id'}
                  type={numberOfOptions === '1' ? 'radio' : 'checkbox'}
                  value={option.id}
                  checked={mainOptions.some((mainOption) => mainOption.option === option.id)}
                  onChange={(event) => createAnswerEvent(event, option)}
                />
              </td>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableCommon;
