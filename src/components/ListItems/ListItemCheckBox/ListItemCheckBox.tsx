import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import questionSlice from '../../../redux/slices/questionSlice';
import { ListItemCheckBoxProps, Option, QuestionAnswer } from '../../../types';
import useLocaleText from '../../../utils/useLocaleText';
import { renderLocaleValue } from '../../../utils/utils';

const ListItemCheckBox: React.FC<ListItemCheckBoxProps> = ({ question }) => {
  const [mainOptions, setMainOptions] = useState<QuestionAnswer[]>([]);

  const dispatch = useAppDispatch();
  const { setQuestionAnswer, setQuestion3Answer } = bindActionCreators(
    questionSlice.actions,
    dispatch,
  );

  const numberOfOptions = question.number_of_options_to_choose;

  const getLocaleText = useLocaleText();

  useEffect(() => {
    setQuestionAnswer(mainOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainOptions]);

  const createAnswerEvent = (event: React.ChangeEvent<HTMLInputElement>, option: Option) => {
    setMainOptions((prevMainOptions) => [
      ...prevMainOptions,
      {
        question: question.id,
        option: Number(event.target.value),
      },
    ]);
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
      <Table bordered striped hover>
        <tbody>
          {question?.options?.map((option) => (
            <tr key={option.id}>
              <td className="center-input checkbox">
                <input
                  name={'id'}
                  type={numberOfOptions === '1' ? 'radio' : 'checkbox'}
                  value={option.id}
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

export default ListItemCheckBox;
