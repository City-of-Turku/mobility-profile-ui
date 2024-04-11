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
  const [isPostalCode, setIsPostalCode] = useState(false);
  const [isOptionalPostalCode, setIsOptionalPostalCode] = useState(false);
  const [isPostalCodeOther, setIsPostalCodeOther] = useState(false);
  const [isOptionalPostalCodeOther, setIsOptionalPostalCodeOther] = useState(false);

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

  const sortPostalCodes = (data: PostalCode[]) => {
    return data.sort((a, b) => a.name.fi.localeCompare(b.name.fi, undefined, { numeric: true }));
  };

  const renderOptions = () => {
    const sortedPostalCodes = sortPostalCodes(postalCodeData);

    const options = [];

    options.push(
      <option
        key="empty"
        value=""
        aria-label={intl.formatMessage({ id: 'app.form.empty.value' })}
      />,
    );

    sortedPostalCodes.forEach((item) => {
      options.push(
        <option
          key={item?.id}
          value={item?.name?.fi}
          aria-label={`${intl.formatMessage({ id: 'app.form.helperText.postCode' })} ${
            item?.name?.fi
          }`}
        >
          {item?.name?.fi}
        </option>,
      );
    });

    return options;
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
      postal_code: null,
      postal_code_other: null,
      optional_postal_code: null,
      optional_postal_code_other: null,
      is_interested_in_mobility: false,
      result_can_be_used: false,
    },
  });

  /**
   * Set disabled status of either select or text input so that user can't fill both at the same time.
   * Select element is for those that live in Turku and text input is for those who don't.
   * @param event
   * @param setState
   */
  const handlePostalCodes = (
    event: { target: { value: string } },
    setState: (a: boolean) => void,
  ) => {
    const textValue = event.target.value;
    if (textValue?.length) {
      setState(true);
    }
    if (!textValue || !textValue.length) {
      setState(false);
    }
  };

  /**
   * In case 1 or both postal code values are empty string, replace with null value for API compatibility.
   * Also add values from text fields into keys that are recognized by API in case they are not null.
   * @param data
   * @returns data
   */
  const formatPostalCodes = (data: UserFormTypes) => {
    const updatedData = { ...data };
    if (updatedData.postal_code === '') {
      updatedData.postal_code = null;
    }
    if (updatedData.optional_postal_code === '') {
      updatedData.optional_postal_code = null;
    }
    if (updatedData.postal_code_other?.length && !updatedData.postal_code) {
      updatedData.postal_code = updatedData.postal_code_other;
    }
    if (updatedData.optional_postal_code_other?.length && !updatedData.optional_postal_code) {
      updatedData.optional_postal_code = updatedData.optional_postal_code_other;
    }
    return updatedData;
  };

  const onSubmit: SubmitHandler<UserFormTypes> = (data) => {
    if (userId?.length) {
      postUserInfo(formatPostalCodes(data), userId, setAnswerStatus, setIsApiError, token);
    }
  };

  return (
    <div className="mb-3">
      <div>
        {!isError ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container flex-center">
              <div className="mb-2 form-group container-sm center-text">
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
              <div className="mb-2 form-group container-sm center-text">
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
              {!serviceMapApiError ? (
                <div className="mb-2 form-group container-sm center-text">
                  <div>
                    <label htmlFor="postal_code" className="text-label mb-1">
                      {intl.formatMessage({ id: 'app.form.postalCode.label' })}
                    </label>
                  </div>
                  <div>
                    <select
                      {...register('postal_code', { required: false })}
                      role="listbox"
                      onChange={(event) => handlePostalCodes(event, setIsPostalCode)}
                      disabled={isPostalCodeOther}
                      aria-required="false"
                      aria-invalid={errors.postal_code ? true : false}
                      className="select-field"
                    >
                      {renderOptions()}
                    </select>
                  </div>
                  <div className="mb-1">
                    <small>{intl.formatMessage({ id: 'app.form.postalCode.field' })}</small>
                  </div>
                  {errors.postal_code && (
                    <div className="mb-2">
                      <p className="text-normal">{errors.postal_code.message}</p>
                    </div>
                  )}
                </div>
              ) : null}
              <div className="mb-2 form-group container-sm center-text">
                <div>
                  <label htmlFor="postal_code_other" className="text-label mb-1">
                    {intl.formatMessage({ id: 'app.form.postalCode.other.label' })}
                  </label>
                </div>
                <div className="flex-input">
                  <input
                    {...register('postal_code_other', { required: false, maxLength: 10 })}
                    type="text"
                    maxLength={10}
                    onChange={(event) => handlePostalCodes(event, setIsPostalCodeOther)}
                    disabled={isPostalCode}
                    aria-required="false"
                    aria-invalid={errors.postal_code_other ? true : false}
                    className="form-control text-field-w60"
                  />
                </div>
                <div className="mb-1">
                  <small>
                    {intl.formatMessage({ id: 'app.form.postalCode.other.text.small' })}
                  </small>
                </div>
                {errors.postal_code_other && (
                  <div className="mb-2">
                    <p className="text-normal">{errors.postal_code_other.message}</p>
                  </div>
                )}
              </div>
              {!serviceMapApiError ? (
                <div className="mb-2 form-group container-sm center-text">
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
                      onChange={(event) => handlePostalCodes(event, setIsOptionalPostalCode)}
                      disabled={isOptionalPostalCodeOther}
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
              ) : null}
              <div className="mb-2 form-group container-sm center-text">
                <div>
                  <label htmlFor="optional_postal_code_other" className="text-label mb-1">
                    {intl.formatMessage({ id: 'app.form.optionalPostalCode.other.label' })}
                  </label>
                </div>
                <div className="flex-input">
                  <input
                    {...register('optional_postal_code_other', { required: false, maxLength: 10 })}
                    type="text"
                    maxLength={10}
                    onChange={(event) => handlePostalCodes(event, setIsOptionalPostalCodeOther)}
                    disabled={isOptionalPostalCode}
                    aria-required="false"
                    aria-invalid={errors.optional_postal_code_other ? true : false}
                    className="form-control text-field-w60"
                  />
                </div>
                <div className="mb-1">
                  <small>
                    {intl.formatMessage({ id: 'app.form.postalCode.other.text.small' })}
                  </small>
                </div>
                {errors.optional_postal_code_other && (
                  <div className="mb-2">
                    <p className="text-normal">{errors.optional_postal_code_other.message}</p>
                  </div>
                )}
              </div>
              <div className="mb-2 container-sm center-text">
                <p className="text-normal">
                  {intl.formatMessage({ id: 'app.form.info.question' })}
                </p>
              </div>
              <div className="mb-3 form-check container-sm center-text">
                <input
                  type="checkbox"
                  {...register('is_interested_in_mobility', { required: false })}
                  aria-required="false"
                  aria-invalid={errors.is_interested_in_mobility ? true : false}
                  className="form-check-input"
                />
                <label htmlFor="is_filled_for_fun" className="text-label">
                  {intl.formatMessage({ id: 'app.form.interestedInMobility.label' })}
                </label>
              </div>
              <div className="mb-3 form-check container-sm center-text">
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
              <div className="mb-2 container-sm center-text">
                <Button
                  type="submit"
                  role="button"
                  disabled={answerStatus}
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
