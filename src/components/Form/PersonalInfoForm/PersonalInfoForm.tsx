import React from 'react';
import TextInput from './TextInput';
import { useForm } from '../../../FormContext';

const PersonalInfoForm = () => {
  const [{ firstName, lastName, email }, { setFirstName, setLastName, setEmail }] = useForm();

  return (
    <>
      <h2>Personal info</h2>
      <TextInput header="First Name" type="text" value={firstName} onChange={setFirstName} />
      <TextInput header="Last Name" type="text" value={lastName} onChange={setLastName} />
      <TextInput header="Email Address" type="email" value={email} onChange={setEmail} />
    </>
  );
};

export default PersonalInfoForm;