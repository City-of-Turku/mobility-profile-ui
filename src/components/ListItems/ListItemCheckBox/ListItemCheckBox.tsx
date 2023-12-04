import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { ListItemCheckBoxProps, Question } from '../../../types';
import useLocaleText from '../../../utils/useLocaleText';
import { renderLocaleValue } from '../../../utils/utils';

const ListItemCheckBox: React.FC<ListItemCheckBoxProps> = ({ question }) => {
  const [mainOptions, setMainOptions] = useState<string[]>([]);

  const { control } = useForm<Question>();

  const getLocaleText = useLocaleText();

  return (
    <div className="table-responsive">
      <Table bordered striped hover>
        <tbody>
          {question?.options?.map((option) => (
            <tr key={option.id}>
              <td className="center-input checkbox">
                <Controller
                  name={'id'}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="checkbox"
                      value={option.id}
                      onChange={(event) => setMainOptions([...mainOptions, event.target.value])}
                    />
                  )}
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
