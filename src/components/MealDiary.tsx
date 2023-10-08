import { useState } from 'react';
import AddMeal from './meal-diary/AddMeal';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import FoodLogTable from './home/FoodLogTable';
import { Calendar } from './ui/calendar';
import CalorieChart from './home/CalorieChart';

export default function MealDiary() {
  const [addMealDecider, setAddMealDecider] = useState(false);

  return (
    <div className="w-full pl-[5rem]">
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

      <div className="mt-[2rem] flex flex-col p-4">
        <Button
          className="self-end mb-4"
          onClick={() => setAddMealDecider(true)}
        >
          Add meal
        </Button>

        {addMealDecider ? (
          <AddMeal setAddMealDecider={setAddMealDecider} />
        ) : (
          <>
            <div className="flex gap-5 items-center">
              <FoodLogTable />
              <Calendar className="bg-white h-fit rounded-md" />
            </div>
            <div className="mt-[2rem] w-full">
              <CalorieChart />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
