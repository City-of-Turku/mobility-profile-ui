import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { ListItemRadioProps, Question } from '../../../types';
import useLocaleText from '../../../utils/useLocaleText';

const ListItemRadio: React.FC<ListItemRadioProps> = ({ question }) => {
  const [subOptions, setSubOptions] = useState<string[]>([]);

  const { control } = useForm<Question>();

  const getLocaleText = useLocaleText();

  const renderLocaleValue = (...values: string[]) => {
    const localeTexts = {
      fi: values[0],
      en: values[1],
      sv: values[2],
    };
    return getLocaleText(localeTexts);
  };

  const optionsArray = question.sub_questions[0].options;

  return (
    <div>
      <Table bordered striped hover size={question.number === '4' ? 'sm' : 'md'}>
        <thead>
          <tr>
            <th style={{ fontSize: question.number === '4' ? '0.8rem' : '1rem' }}>
              <FormattedMessage id="app.text.options" />
            </th>
            {optionsArray.map((item) => (
              <th
                key={item.value}
                style={{ fontSize: question.number === '4' ? '0.8rem' : '1rem' }}
              >
                {renderLocaleValue(item.value_fi, item.value_en, item.value_sv)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {question.sub_questions.map((subQuestion) => (
            <tr key={subQuestion.id}>
              <td style={{ fontSize: question.number === '4' ? '0.8rem' : '1rem' }}>
                {renderLocaleValue(
                  subQuestion.description_fi,
                  subQuestion.description_en,
                  subQuestion.description_sv,
                )}
              </td>
              {subQuestion.options
                .filter((option) => option.value !== 'None')
                .map((option) => (
                  <td key={option.id}>
                    <Controller
                      name={'id'}
                      control={control}
                      defaultValue={1}
                      render={({ field }) => (
                        <input
                          type="radio"
                          {...field}
                          onChange={(event) => setSubOptions([...subOptions, event.target.value])}
                        />
                      )}
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
