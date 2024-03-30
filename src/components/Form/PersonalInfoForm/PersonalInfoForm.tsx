import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import AgeSlider from './AgeSlider';
import PhotoUpload, { PhotoUploadProps } from './PhotoUpload';
import { useForm } from '../../../FormContext';

const PersonalInfoForm = () => {
  const [
    { firstName, lastName, email, formSubmitted, photo },
    { setFirstName, setLastName, setEmail, setFormSubmitted, setPhoto },
  ] = useForm();
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    if (formSubmitted && !firstName.trim()) {
      setFirstNameError('First Name is required');
    } else {
      setFirstNameError('');
    }

    if (formSubmitted && !lastName.trim()) {
      setLastNameError('Last Name is required');
    } else {
      setLastNameError('');
    }

    if (formSubmitted && !email.trim()) {
      setEmailError('Email Address is required');
    } else if (formSubmitted && !isValidEmail(email)) {
      setEmailError('Please use correct formatting.');
    } else {
      setEmailError('');
    }

    if (formSubmitted && !photo.trim()) {
      setPhotoError('Photo is required');
    } else {
      setPhotoError('');
    }
  }, [formSubmitted, firstName, lastName, email, photo]);

  useEffect(() => {
    if (attemptedSubmit) {
      console.log('Please fill in all required fields.');
      setAttemptedSubmit(false);
    }
  }, [attemptedSubmit]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="pb-12">
      <h2 className="text-xl font-medium pb-2">Personal info</h2>
      <TextInput
        header="First Name"
        type="text"
        value={firstName}
        onChange={setFirstName}
        state={formSubmitted && firstNameError ? 'error' : 'default'}
      />
      {formSubmitted && firstNameError && (
        <div className="flex items-center">
          <img
            src="/icons/validation.svg"
            alt="Validation Icon"
            className="w-4 h-4 mr-2"
          />
          <div className="flex flex-col">
            <p className="text-teal-950 mt-1 text-sm font-normal">
              {firstNameError}
            </p>
          </div>
        </div>
      )}
      <TextInput
        header="Last Name"
        type="text"
        value={lastName}
        onChange={setLastName}
        state={formSubmitted && lastNameError ? 'error' : 'default'}
      />
      {formSubmitted && lastNameError && (
        <div className="flex items-center">
          <img
            src="/icons/validation.svg"
            alt="Validation Icon"
            className="w-4 h-4 mr-2"
          />
          <div className="flex flex-col">
            <p className="text-teal-950 mt-1 text-sm font-normal">
              {lastNameError}
            </p>
          </div>
        </div>
      )}
      <TextInput
        header="Email Address"
        type="email"
        value={email}
        onChange={setEmail}
        state={
          formSubmitted && (emailError || !isValidEmail(email))
            ? 'error'
            : 'default'
        }
      />
      {formSubmitted && (emailError || !isValidEmail(email)) && (
        <div className="flex items-center">
          <img
            src="/icons/validation.svg"
            alt="Validation Icon"
            className="w-4 h-4 mr-2"
          />
          <div className="flex flex-col">
            <p className="text-teal-950 mt-1 text-sm font-normal">
              {emailError}
            </p>
            <p className="text-teal-950 text-sm font-normal">
              Example: address@email.com
            </p>
          </div>
        </div>
      )}
      <AgeSlider header="Age" />
      <PhotoUpload
        header="Photo"
        state={formSubmitted && photoError ? 'error' : 'default'}
      />
      {formSubmitted && photoError && (
        <div className="flex items-center">
          <img
            src="/icons/validation.svg"
            alt="Validation Icon"
            className="w-4 h-4 mr-2"
          />
          <div className="flex flex-col">
            <p className="text-teal-950 mt-1 text-sm font-normal">
              {photoError}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoForm;
