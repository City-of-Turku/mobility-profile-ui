import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import questionSlice from '../../../redux/slices/questionSlice';
import { ListItemCheckBoxProps, Option } from '../../../types';
import useLocaleText from '../../../utils/useLocaleText';
import { renderLocaleValue } from '../../../utils/utils';

const ListItemCheckBox: React.FC<ListItemCheckBoxProps> = ({ question }) => {
  const [mainOptions, setMainOptions] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { setQuestionAnswer, setQuestion3Answer } = bindActionCreators(
    questionSlice.actions,
    dispatch,
  );

  const numberOfOptions = question.number_of_options_to_choose;

  const getLocaleText = useLocaleText();

  const setObject = () => {
    return {
      question: question.id,
      option: Number(mainOptions[0]),
    };
  };

  useEffect(() => {
    const answerObj = setObject();
    setQuestionAnswer(answerObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainOptions]);

  const createAnswerEvent = (event: React.ChangeEvent<HTMLInputElement>, option: Option) => {
    if (question.number === '3') {
      setMainOptions([...mainOptions, event.target.value]);
      const values = {
        fi: option.value_fi,
        en: option.value_en,
        sv: option.value_sv,
      };
      setQuestion3Answer(values);
    }
    setMainOptions([...mainOptions, event.target.value]);
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
