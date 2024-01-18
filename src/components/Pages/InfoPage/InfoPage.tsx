import React, { useState } from 'react';
import LinkButton from '../../Buttons/LinkButton/LinkButton';
import UserForm from '../../Forms/UserForm/UserForm';

const InfoPage = () => {
  const [userHasAnswered, setUserHasAnswered] = useState(false);

  return (
    <section className="container flex-center">
      <UserForm setAnswerStatus={setUserHasAnswered} />
      <LinkButton
        urlValue="summary"
        translationId="app.buttons.link.summary"
        isActive={userHasAnswered}
      />
    </section>
  );
};

export default InfoPage;
