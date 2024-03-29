import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  selectedDay: Date | null; // Dodanie pola selectedDay do FormState
  isDateSelected: boolean; // Dodanie pola isDateSelected do FormState
}

interface FormActions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setAge: (value: number) => void;
  handleSubmit: () => void;
  setSelectedDay: (value: Date | null) => void; // Dodanie setSelectedDay do FormActions
}

const initialFormState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
  selectedDay: null,
  isDateSelected: false,
};

const FormContext = createContext<[FormState, FormActions]>([
  initialFormState,
  {} as FormActions,
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

  const setSelectedDay = (value: Date | null) =>
    setFormState((prevState) => ({
      ...prevState,
      selectedDay: value,
      isDateSelected: value !== null,
    }));

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
    setSelectedDay, // Dodanie setSelectedDay do formActions
  };

  return (
    <FormContext.Provider value={[formState, formActions]}>
      {children}
    </FormContext.Provider>
  );
};
