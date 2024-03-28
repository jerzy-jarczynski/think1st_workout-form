import React from 'react';
import PersonalInfoForm from './components/Form/PersonalInfoForm/PersonalInfoForm';
import WorkoutForm from './components/Form/WorkoutForm/WorkoutForm';
import { FormProvider } from './FormContext';
import SubmitButton from './components/Form/SubmitButton';
import Container from './components/Form/Container';

const App: React.FC = () => {
  return (
    <FormProvider>
      <Container>
        <PersonalInfoForm />
        <WorkoutForm />
        <SubmitButton />
      </Container>
    </FormProvider>
  );
};

export default App;