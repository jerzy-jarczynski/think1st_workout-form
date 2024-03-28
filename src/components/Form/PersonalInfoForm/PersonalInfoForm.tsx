import React from 'react';
import TextInput from './TextInput';
import AgeSlider from './AgeSlider';
import PhotoUpload from './PhotoUpload';
import { useForm } from '../../../FormContext';

const PersonalInfoForm = () => {
  const [
    { firstName, lastName, email },
    { setFirstName, setLastName, setEmail },
  ] = useForm();

  return (
    <div className="pb-12">
      <h2 className="text-xl font-medium pb-8">Personal info</h2>
      <TextInput
        header="First Name"
        type="text"
        value={firstName}
        onChange={setFirstName}
      />
      <TextInput
        header="Last Name"
        type="text"
        value={lastName}
        onChange={setLastName}
      />
      <TextInput
        header="Email Address"
        type="email"
        value={email}
        onChange={setEmail}
      />
      <AgeSlider header="Age" />
      <PhotoUpload header="Photo" />
    </div>
  );
};

export default PersonalInfoForm;
