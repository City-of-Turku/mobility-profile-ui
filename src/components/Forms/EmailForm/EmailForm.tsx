import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { EmailField } from '../../../types';
import { postSubscribeInfo } from '../../../utils/mobilityProfileAPI';

const EmailForm = () => {
  const intl = useIntl();

  const { user } = useAppSelector((state) => state);
  const resultId = user?.profileResult?.id;
  const userId = user?.userId;
  const token = user?.csrfToken;

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
      postSubscribeInfo(data.email, resultId, token);
    }
  };

  return (
    <div className="mb-3">
      <div className="flex-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <p className="text-normal">{intl.formatMessage({ id: 'app.text.newsletter' })}</p>
          </div>
          <div className="mb-2 form-group">
            <label htmlFor="email" className="text-label mb-1">
              {intl.formatMessage({ id: 'app.form.email.label' })}
            </label>
            <input
              type="text"
              placeholder={intl.formatMessage({ id: 'app.form.email.label' })}
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              aria-invalid={errors.email ? true : false}
              className="form-control"
            />
          </div>
          {errors.email && (
            <div className="mb-2">
              <p className="text-normal">{errors.email.message}</p>
            </div>
          )}
          <button type="submit" className="input-submit">
            {intl.formatMessage({ id: 'app.input.submit.newsletter' })}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
