import React, { useState, useEffect } from 'react';
import { useForm } from '../../FormContext';

const SubmitButton: React.FC = () => {
  const [formState, formActions] = useForm();
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: formState.isDateSelected ? '#761BE4' : '#CBB6E5',
    cursor: formState.isDateSelected ? 'pointer' : 'default',
    transition: 'background-color 0.3s',
  });

  useEffect(() => {
    setButtonStyle({
      backgroundColor: formState.isDateSelected ? '#761BE4' : '#CBB6E5',
      cursor: formState.isDateSelected ? 'pointer' : 'default',
      transition: 'background-color 0.3s',
    });
  }, [formState.isDateSelected]);

  const handleHover = () => {
    if (formState.isDateSelected) {
      setButtonStyle((prevStyle) => ({
        ...prevStyle,
        backgroundColor: '#6A19CD',
        cursor: 'pointer',
      }));
    }
  };

  const handleHoverExit = () => {
    if (formState.isDateSelected) {
      setButtonStyle((prevStyle) => ({
        ...prevStyle,
        backgroundColor: '#761BE4',
        cursor: 'pointer',
      }));
    }
  };

  const handleSubmit = () => {
    const isFormValid =
      formState.firstName.trim() !== '' &&
      formState.lastName.trim() !== '' &&
      formState.email.trim() !== '' &&
      formState.photo.trim() !== '' &&
      formState.isDateSelected &&
      isValidEmail(formState.email);

    if (isFormValid) {
      console.log('Submitting form data:', {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        age: formState.age,
        photo: formState.photo,
        selectedDay: formState.selectedDay,
        selectedTime: formState.selectedTime,
      });

      const formData = new FormData();
      formData.append('firstName', formState.firstName);
      formData.append('lastName', formState.lastName);
      formData.append('email', formState.email);
      formData.append('age', formState.age.toString());
      formData.append('photo', formState.photo);
      formData.append(
        'selectedDay',
        formState.selectedDay?.toISOString() || ''
      );

      if (formState.selectedTime !== null) {
        formData.append('selectedTime', formState.selectedTime);
      }

      fetch('http://letsworkout.pl/submit', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log('Form data successfully submitted to the server.');
        })
        .catch((error) => {
          console.error(
            'There was a problem with your fetch operation:',
            error
          );
        });
    } else {
      formActions.setFormSubmitted(true);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <button
      type="submit"
      disabled={!formState.isDateSelected}
      className="mt-8 w-full h-12 text-lg font-medium rounded-md text-white transition-all duration-300"
      style={buttonStyle}
      onClick={handleSubmit}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverExit}
    >
      Send application
    </button>
  );
};

export default SubmitButton;
