import React from 'react';
import LinkButton from '../../Buttons/LinkButton/LinkButton';
import UserForm from '../../Forms/UserForm/UserForm';

const InfoPage = () => {
  return (
    <section className="container flex-center">
      <UserForm />
      <LinkButton urlValue="summary" translationId="app.buttons.link.summary" />
    </section>
  );
};

export default InfoPage;
