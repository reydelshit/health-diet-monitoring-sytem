import { useState } from 'react';
import AddWorkoutPlans from './workout-plans/AddWorkoutPlans';
import { Button } from './ui/button';

export default function WorkoutPlans() {
  const [workoutPlansDecider, setWorkoutPlansDecider] = useState(false);
  return (
    <div>
      <h1>Workout Plans</h1>

      <Button onClick={() => setWorkoutPlansDecider(true)}>
        Add workout plans
      </Button>

      {workoutPlansDecider && (
        <AddWorkoutPlans
          // handleSubmit={handleSubmit}
          // handleChange={handleChange}
          setWorkoutPlansDecider={setWorkoutPlansDecider}
        />
      )}
    </div>
  );
}
