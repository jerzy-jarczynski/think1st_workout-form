import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Holiday } from './types';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  selectedDay: Date | null;
  isDateSelected: boolean;
  photo: string;
  selectedTime: string | null;
}

interface FormActions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setAge: (value: number) => void;
  handleSubmit: () => void;
  setSelectedDay: (value: Date | null) => void;
  setPhoto: (value: string) => void;
  setSelectedTime: (value: string | null) => void;
}

const initialFormState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
  selectedDay: null,
  isDateSelected: false,
  photo: '',
  selectedTime: null,
};

export const FormContext = createContext<[FormState, FormActions, boolean]>([
  initialFormState,
  {} as FormActions,
  false,
]);

export const useForm = () => useContext(FormContext);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const setFirstName = (value: string) =>
    setFormState((prevState) => ({ ...prevState, firstName: value }));
  const setLastName = (value: string) =>
    setFormState((prevState) => ({ ...prevState, lastName: value }));
  const setEmail = (value: string) =>
    setFormState((prevState) => ({ ...prevState, email: value }));
  const setAge = (value: number) =>
    setFormState((prevState) => ({ ...prevState, age: value }));
  const setPhoto = (value: string) =>
    setFormState((prevState) => ({ ...prevState, photo: value }));
  
  const updateSelectedDay = (value: Date | null) => {
    setFormState((prevState) => ({
      ...prevState,
      selectedDay: value,
      isDateSelected: value !== null,
    }));
  };

  const setSelectedDay = (value: Date | null) =>
    setFormState((prevState) => ({
      ...prevState,
      selectedDay: value,
      isDateSelected: value !== null,
    }));
  const setSelectedTime = (value: string | null) =>
    setFormState((prevState) => ({ ...prevState, selectedTime: value }));

  const handleSubmit = () => {
    console.log('Form submitted:', formState);
    setFormState(initialFormState);
  };

  const formActions: FormActions = {
    setFirstName,
    setLastName,
    setEmail,
    setAge,
    handleSubmit,
    setSelectedDay: updateSelectedDay,
    setPhoto,
    setSelectedTime,
  };

  return (
    <FormContext.Provider value={[formState, formActions, formState.isDateSelected]}>
      {children}
    </FormContext.Provider>
  );
};
