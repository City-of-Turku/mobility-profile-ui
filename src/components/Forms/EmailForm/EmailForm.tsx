import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { EmailField } from '../../../types';
import { postSubscribeInfo } from '../../../utils/mobilityProfileAPI';
import TextBasic from '../../Typography/TextBasic/TextBasic';

const EmailForm = () => {
  const [hasUserAnswered, setHasUserAnswered] = useState(false);
  const [isApiError, setIsApiError] = useState(false);

  const intl = useIntl();

  const { user } = useAppSelector((state) => state);
  const userId = user?.userId;

  const registerLink = 'https://rekisteri.turku.fi/Saabe_data';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<EmailField> = (data) => {
    if (userId?.length) {
      postSubscribeInfo(data.email, userId, setHasUserAnswered, setIsApiError);
    }
  };

  return (
    <div className="mb-3">
      <div className="flex-center">
        <div className="text-container mb-2">
          <p className="text-normal">{intl.formatMessage({ id: 'app.text.newsletter' })}</p>
        </div>
        <div className="text-container">
          <a href={registerLink} target="_blank" rel="noopener noreferrer">
            <p className="text-link">{intl.formatMessage({ id: 'app.text.newsletter.link' })}</p>
          </a>
        </div>
        <div className="text-container mb-2">
          <p className="text-normal">
            {intl.formatMessage({ id: 'app.text.newsletter.description' })}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 form-group center-text">
            <label htmlFor="email" className="text-label mb-1">
              {intl.formatMessage({ id: 'app.form.email.label' })}
            </label>
            <input
              type="email"
              id="email"
              placeholder={intl.formatMessage({ id: 'app.form.email.label' })}
              {...register('email', {
                required: true,
                maxLength: 50,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: intl.formatMessage({ id: 'app.form.email.invalid' }),
                },
              })}
              aria-required="true"
              aria-invalid={errors.email ? true : false}
              className="form-control"
            />
          </div>
          {errors.email && (
            <div className="text-container mb-2">
              <p className="text-normal">{errors.email.message}</p>
            </div>
          )}
          <div className="mb-2 center-text">
            <Button type="submit" role="button" disabled={hasUserAnswered} className="input-submit">
              {intl.formatMessage({ id: 'app.input.submit.newsletter' })}
            </Button>
            {hasUserAnswered ? (
              <TextBasic
                translationId={
                  isApiError ? 'app.result.newsletter.error' : 'app.result.newsletter.success'
                }
              />
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
