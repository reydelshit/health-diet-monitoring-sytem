import { useState } from 'react';
import AddWorkoutPlans from './workout-plans/AddWorkoutPlans';
import { Button } from './ui/button';
import AddMedicalHistory from './medical-history/AddMedicalHistory';

export default function MedicalHistory() {
  const [medicalHistoryDecider, setMedicalHistoryDecider] = useState(false);
  return (
    <div>
      <h1>Workout Plans</h1>

      <Button onClick={() => setMedicalHistoryDecider(true)}>
        Add medical history
      </Button>

      {medicalHistoryDecider && (
        <AddMedicalHistory
          setMedicalHistoryDecider={setMedicalHistoryDecider}
        />
      )}
    </div>
  );
}
