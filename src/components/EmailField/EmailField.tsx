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
      postal_code: '',
      optional_postal_code: '',
      is_filled_for_fun: true,
      result_can_be_used: true,
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
          <div className="mb-2">
            <label htmlFor="email" className="text-normal">
              {intl.formatMessage({ id: 'app.form.email.title' })}
            </label>
          </div>
          <div className="mb-2 form-group">
            <label htmlFor="email" className="text-normal mb-1">
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
          <div className="mb-2 form-group">
            <label htmlFor="postal_code" className="text-normal mb-1">
              {intl.formatMessage({ id: 'app.form.postalCode.label' })}
            </label>
            <input
              type="text"
              placeholder={intl.formatMessage({ id: 'app.form.postalCode.label' })}
              {...register('postal_code', { required: true })}
              aria-invalid={errors.postal_code ? true : false}
              className="form-control"
            />
          </div>
          <div className="mb-2 form-group">
            <label htmlFor="optional_postal_code" className="text-normal mb-1">
              {intl.formatMessage({ id: 'app.form.optionalPostalCode.label' })}
            </label>
            <input
              type="text"
              placeholder={intl.formatMessage({ id: 'app.form.optionalPostalCode.label' })}
              {...register('optional_postal_code', { required: false })}
              aria-invalid={errors.optional_postal_code ? true : false}
              className="form-control"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              {...register('is_filled_for_fun', { required: false })}
              aria-invalid={errors.is_filled_for_fun ? true : false}
              className="form-check-input"
            />
            <label htmlFor="is_filled_for_fun" className="text-normal">
              {intl.formatMessage({ id: 'app.form.filledForFun.label' })}
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              {...register('result_can_be_used', { required: false })}
              aria-invalid={errors.result_can_be_used ? true : false}
              className="form-check-input"
            />
            <label htmlFor="result_can_be_used" className="text-normal">
              {intl.formatMessage({ id: 'app.form.useResult.label' })}
            </label>
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
