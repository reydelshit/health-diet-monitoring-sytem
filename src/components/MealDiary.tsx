import { useState } from 'react';
import AddMeal from './meal-diary/AddMeal';
import { Button } from './ui/button';

export default function MealDiary() {
  const [addMealDecider, setAddMealDecider] = useState(false);

  return (
    <div className="w-full py-10">
      <div>
        <h1 className="font-bold text-3xl">Meal Diary</h1>
      </div>

      <Button onClick={() => setAddMealDecider(true)}>Add meal</Button>

      {addMealDecider && (
        <AddMeal
          // handleSubmit={handleSubmit}
          // handleChange={handleChange}
          setAddMealDecider={setAddMealDecider}
        />
      )}
    </div>
  );
}
