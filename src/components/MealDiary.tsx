import { useState } from 'react';
import AddMeal from './meal-diary/AddMeal';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export default function MealDiary() {
  const [addMealDecider, setAddMealDecider] = useState(false);

  return (
    <div className="w-full">
      <div>
        <span className="block py-8">
          <h1 className="font-bold text-3xl">Meal Diary</h1>
          <p className="text-sm">
            Commence your meal diary journey with us. Keep a record of your
            daily meals, monitor your nutrition, and make healthier choices
            effortlessly.
          </p>
        </span>
        <Separator />
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
