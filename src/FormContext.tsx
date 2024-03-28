import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

interface FormActions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setAge: (value: number) => void;
  handleSubmit: () => void;
}

const initialFormState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
};

const FormContext = createContext<[FormState, FormActions]>([initialFormState, {} as FormActions]);

export const useForm = () => useContext(FormContext);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const setFirstName = (value: string) => setFormState(prevState => ({ ...prevState, firstName: value }));
  const setLastName = (value: string) => setFormState(prevState => ({ ...prevState, lastName: value }));
  const setEmail = (value: string) => setFormState(prevState => ({ ...prevState, email: value }));
  const setAge = (value: number) => setFormState(prevState => ({ ...prevState, age: value }));

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
  };

  return <FormContext.Provider value={[formState, formActions]}>{children}</FormContext.Provider>;
};