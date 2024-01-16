import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { UserFormTypes } from '../../../types';
import { postUserInfo } from '../../../utils/mobilityProfileAPI';

const UserForm = () => {
  const intl = useIntl();

  const { user } = useAppSelector((state) => state);
  const userId = user?.userId;
  const token = user?.csrfToken;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      postal_code: '',
      optional_postal_code: '',
      is_filled_for_fun: true,
      result_can_be_used: true,
    },
  });

  const onSubmit: SubmitHandler<UserFormTypes> = (data) => {
    if (userId?.length) {
      postUserInfo(data, userId, token);
    }
  };

  return (
    <div className="mb-3">
      <div className="flex-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <p className="text-normal">{intl.formatMessage({ id: 'app.form.user.title' })}</p>
          </div>
          <div className="mb-2 form-group">
            <label htmlFor="postal_code" className="text-label mb-1">
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
            <label htmlFor="optional_postal_code" className="text-label mb-1">
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
            <label htmlFor="is_filled_for_fun" className="text-label">
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
            <label htmlFor="result_can_be_used" className="text-label">
              {intl.formatMessage({ id: 'app.form.useResult.label' })}
            </label>
          </div>
          {errors.postal_code && (
            <div className="mb-2">
              <p className="text-normal">{errors.postal_code.message}</p>
            </div>
          )}
          <button type="submit" className="input-submit">
            {intl.formatMessage({ id: 'app.input.submit.user' })}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
