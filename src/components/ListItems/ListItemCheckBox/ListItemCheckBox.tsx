import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Question } from '../../../types';

interface ListItemCheckBoxProps {
  question: Question;
}

const ListItemCheckBox: React.FC<ListItemCheckBoxProps> = ({ question }) => {
  const [mainOptions, setMainOptions] = useState<string[]>([]);

  const { control } = useForm<Question>();
  return (
    <div>
      <Table bordered striped hover>
        <tbody>
          {question?.options?.map((option) => (
            <tr key={option.id}>
              <td>
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
                <label>{option.value}</label>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListItemCheckBox;
