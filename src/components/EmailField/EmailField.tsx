import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { EmailForm } from '../../types';

const EmailField = () => {
  const intl = useIntl();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  // TODO update to post data into API
  const onSubmit: SubmitHandler<EmailForm> = (data) => {
    console.warn(data);
  };

  return (
    <div className="mb-3">
      <div className="mb-2">
        <p className="text-normal">{intl.formatMessage({ id: 'app.text.newsletter' })}</p>
      </div>
      <div className="flex-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1">
            <label htmlFor="email" className="text-normal">
              {intl.formatMessage({ id: 'app.form.email.title' })}
            </label>
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder={intl.formatMessage({ id: 'app.form.email.label' })}
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              aria-invalid={errors.email ? true : false}
            />
          </div>
          {errors.email && (
            <div className="mb-2">
              <p className="text-normal">{errors.email.message}</p>
            </div>
          )}
          <input type="submit" className="input-submit" />
        </form>
      </div>
    </div>
  );
};

export default EmailField;
