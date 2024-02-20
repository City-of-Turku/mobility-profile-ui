import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { PostalCode, UserFormProps, UserFormTypes } from '../../../types';
import { fetchPostalCodes, postUserInfo } from '../../../utils/mobilityProfileAPI';
import HomeButton from '../../Buttons/HomeButton/HomeButton';
import ErrorComponent from '../../Errors/ErrorComponent/ErrorComponent';
import TextBasic from '../../Typography/TextBasic/TextBasic';

const UserForm = ({ answerStatus, setAnswerStatus }: UserFormProps) => {
  const [isApiError, setIsApiError] = useState(false);
  const [postalCodeData, setPostalCodeData] = useState<PostalCode[]>([]);
  const [serviceMapApiError, setServiceMapApiError] = useState(false);
  const [isError, setIsError] = useState(false);

  const intl = useIntl();

  const { user } = useAppSelector((state) => state);
  const userId = user?.userId;
  const token = user?.csrfToken;

  useEffect(() => {
    fetchPostalCodes(setPostalCodeData, setServiceMapApiError);
  }, []);

  useEffect(() => {
    if (!userId?.length) {
      setIsError(true);
    }
  }, [userId]);

  const renderOptions = () => {
    return postalCodeData?.map((item) => (
      <option
        key={item?.id}
        value={item?.name?.fi}
        aria-label={`${intl.formatMessage({ id: 'app.form.helperText.postCode' })} ${item.name.fi}`}
      >
        {item?.name?.fi}
      </option>
    ));
  };

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 90;
  const years = Array.from(new Array(90), (val, index) => index + startYear).reverse();

  const renderYears = () => {
    return years?.map((item) => (
      <option
        key={item}
        value={item}
        aria-label={`${intl.formatMessage({ id: 'app.form.helperText.year' })} ${item}`}
      >
        {item}
      </option>
    ));
  };

  const genderOptions = [
    {
      text: 'app.form.gender.male',
      value: 'M',
    },
    {
      text: 'app.form.gender.female',
      value: 'F',
    },
    {
      text: 'app.form.gender.other',
      value: 'X',
    },
  ];

  const renderGenderOptions = () => {
    return genderOptions.map((item) => (
      <option key={item.value} value={item.value}>
        {intl.formatMessage({ id: item.text })}
      </option>
    ));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: null,
      year_of_birth: 1,
      postal_code: '1',
      optional_postal_code: null,
      is_filled_for_fun: true,
      result_can_be_used: true,
    },
  });

  const onSubmit: SubmitHandler<UserFormTypes> = (data) => {
    if (userId?.length) {
      postUserInfo(data, userId, setAnswerStatus, setIsApiError, token);
    }
  };

  return (
    <div className="mb-3">
      <div>
        {serviceMapApiError && (
          <div className="container mb-2">
            <p className="text-error">{intl.formatMessage({ id: 'app.postalcodes.error' })}</p>
          </div>
        )}
        {!isError ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container flex-center">
              <div className="mb-2 form-group container-sm">
                <div>
                  <label htmlFor="year_of_birth" className="text-label mb-1">
                    {intl.formatMessage({ id: 'app.form.gender.label' })}
                  </label>
                </div>
                <div>
                  <select
                    {...register('gender', { required: true })}
                    role="listbox"
                    aria-required="true"
                    aria-invalid={errors.gender ? true : false}
                    className="select-field"
                  >
                    {renderGenderOptions()}
                  </select>
                </div>
                <div className="mb-1">
                  <small>{intl.formatMessage({ id: 'app.form.mandatory.field' })}</small>
                </div>
                {errors.gender && (
                  <div className="mb-2">
                    <p className="text-normal">{errors.gender.message}</p>
                  </div>
                )}
              </div>
              <div className="mb-2 form-group container-sm">
                <div>
                  <label htmlFor="year_of_birth" className="text-label mb-1">
                    {intl.formatMessage({ id: 'app.form.yearOfBirth.label' })}
                  </label>
                </div>
                <div>
                  <select
                    {...register('year_of_birth', { required: true })}
                    role="listbox"
                    aria-required="true"
                    aria-invalid={errors.year_of_birth ? true : false}
                    className="select-field"
                  >
                    {renderYears()}
                  </select>
                </div>
                <div className="mb-1">
                  <small>{intl.formatMessage({ id: 'app.form.mandatory.field' })}</small>
                </div>
                {errors.year_of_birth && (
                  <div className="mb-2">
                    <p className="text-normal">{errors.year_of_birth.message}</p>
                  </div>
                )}
              </div>
              <div className="mb-2 form-group container-sm">
                <div>
                  <label htmlFor="postal_code" className="text-label mb-1">
                    {intl.formatMessage({ id: 'app.form.postalCode.label' })}
                  </label>
                </div>
                <div>
                  <select
                    {...register('postal_code', { required: !serviceMapApiError ? true : false })}
                    role="listbox"
                    aria-required={!serviceMapApiError ? 'true' : 'false'}
                    aria-invalid={errors.postal_code ? true : false}
                    className="select-field"
                  >
                    {renderOptions()}
                  </select>
                </div>
                <div className="mb-1">
                  <small>{intl.formatMessage({ id: 'app.form.mandatory.field' })}</small>
                </div>
                {errors.postal_code && (
                  <div className="mb-2">
                    <p className="text-normal">{errors.postal_code.message}</p>
                  </div>
                )}
              </div>
              <div className="mb-2 form-group container-sm">
                <div>
                  <label htmlFor="optional_postal_code" className="text-label mb-1">
                    {intl.formatMessage({ id: 'app.form.optionalPostalCode.label' })}
                  </label>
                </div>
                <div>
                  <select
                    {...register('optional_postal_code', {
                      required: false,
                    })}
                    role="listbox"
                    aria-required="false"
                    aria-invalid={errors.optional_postal_code ? true : false}
                    className="select-field"
                  >
                    {renderOptions()}
                  </select>
                </div>
                <div className="mb-1">
                  <small>{intl.formatMessage({ id: 'app.form.optional.field' })}</small>
                </div>
                {errors.optional_postal_code && (
                  <div className="mb-2">
                    <p className="text-normal">{errors.optional_postal_code.message}</p>
                  </div>
                )}
              </div>
              <div className="mb-2 container-sm">
                <p className="text-normal">
                  {intl.formatMessage({ id: 'app.form.info.question' })}
                </p>
              </div>
              <div className="mb-3 form-check container-sm">
                <input
                  type="checkbox"
                  {...register('is_filled_for_fun', { required: false })}
                  aria-required="false"
                  aria-invalid={errors.is_filled_for_fun ? true : false}
                  className="form-check-input"
                />
                <label htmlFor="is_filled_for_fun" className="text-label">
                  {intl.formatMessage({ id: 'app.form.filledForFun.label' })}
                </label>
              </div>
              <div className="mb-3 form-check container-sm">
                <input
                  type="checkbox"
                  {...register('result_can_be_used', { required: false })}
                  aria-required="false"
                  aria-invalid={errors.result_can_be_used ? true : false}
                  className="form-check-input"
                />
                <label htmlFor="result_can_be_used" className="text-label">
                  {intl.formatMessage({ id: 'app.form.user.confirmation.label' })}
                </label>
              </div>
              <div className="mb-2 container-sm">
                <Button
                  type="submit"
                  role="button"
                  disabled={answerStatus}
                  aria-disabled={answerStatus}
                  className="input-submit"
                >
                  {intl.formatMessage({ id: 'app.input.submit.user' })}
                </Button>
                {answerStatus ? <TextBasic translationId="app.result.success" /> : null}
              </div>
              {isApiError ? <ErrorComponent translationId="app.result.error" /> : null}
            </div>
          </form>
        ) : (
          <ErrorComponent translationId="app.general.error">
            <HomeButton />
          </ErrorComponent>
        )}
      </div>
    </div>
  );
};

export default UserForm;
