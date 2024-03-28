import React from 'react';
import PersonalInfoForm from './components/Form/PersonalInfoForm/PersonalInfoForm';
import WorkoutForm from './components/Form/WorkoutForm/WorkoutForm';
import { FormProvider } from './FormContext';
import SubmitButton from './components/Form/SubmitButton';

const App: React.FC = () => {
  return (
    <FormProvider>
      <div className="App">
        <PersonalInfoForm />
        <WorkoutForm />
        <SubmitButton />
      </div>
    </FormProvider>
  );
};

export default App;