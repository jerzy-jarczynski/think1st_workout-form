import React from 'react';
import PersonalInfoForm from './components/Form/PersonalInfoForm/PersonalInfoForm';
import WorkoutForm from './components/Form/WorkoutForm/WorkoutForm';
import { FormProvider } from './FormContext';

const App: React.FC = () => {
  return (
    <FormProvider>
      <div className="App">
        <PersonalInfoForm />
        <WorkoutForm />
      </div>
    </FormProvider>
  );
};

export default App;