import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

type Goal = {
  goal_type: string;
  goal_target: number;
  user_id: number;
  goal_month: Date;
};

type FoodLog = {
  meal_name: string;
  calorie_intake: number;
  nutri_information: string;
  meal_time: string;
};

type WaterLog = {
  water_id: number;
  water_glasses: number;
  water_date: Date;
  created_at: Date;
  updated_at: Date;
};

type SleepLog = {
  sleep_id: number;
  sleep_hours: number;
  sleep_time: string;
};

export default function Meal() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [foodLog, setFoodLog] = useState<FoodLog[]>([]);
  const [water, setWaterLog] = useState<WaterLog[]>([]);
  const [sleep, setSleepLog] = useState<SleepLog[]>([]);

  const getGoals = () => {
    axios
      .get('http://localhost/hd-monitoring/goal.php', {
        params: {
          user_id: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setGoals(res.data);
      });
  };

  const fetchFoodLog = () => {
    axios
      .get('http://localhost/hd-monitoring/meal-diary.php', {
        params: {
          user_id: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        // console.log('foodLog', res.data);
        setFoodLog(res.data);
      });
  };

  const fetchWaterLog = () => {
    axios
      .get('http://localhost/hd-monitoring/water.php', {
        params: {
          user_id: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setWaterLog(res.data);
      });
  };

  const fetchSleepLog = () => {
    axios
      .get('http://localhost/hd-monitoring/sleep.php', {
        params: {
          user_id: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setSleepLog(res.data);
      });
  };

  useEffect(() => {
    getGoals();
    fetchFoodLog();
    fetchWaterLog();
    fetchSleepLog();
  }, []);

  const Calculation = (type: string) => {
    const goal = goals.map((goal) => goal.goal_target) as number[];
    const sum = goal.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0,
    );
    const divideByMonthDay = Math.ceil(sum / moment().daysInMonth());
    const divideByMealtimes = Math.ceil(divideByMonthDay / 3);

    const mealType = foodLog.map((food) => food.meal_time) as string[];

    let remainingCalorie = 0;

    if (mealType.includes(type)) {
      const mealCalorieIntake = foodLog
        .filter((food) => food.meal_time === type)
        .map((food) => food.calorie_intake) as number[];
      const sumMealCalorieIntake = mealCalorieIntake.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue),
        0,
      );

      remainingCalorie = divideByMealtimes - sumMealCalorieIntake;
    }

    useEffect(() => {}, [remainingCalorie]);

    return <div>{remainingCalorie <= 0 ? 0 : remainingCalorie}</div>;
  };

  const WaterCalculation = (type: string) => {
    const mapWater = water.map((water) => water.water_glasses) as number[];
    const goalTarget = goals
      .filter((goal) => goal.goal_type === type)
      .map((goal) => goal.goal_target) as number[];

    const sum = mapWater.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0,
    );

    const sumGoal = goalTarget.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0,
    );

    const sumSubtractGoalAndWater = sumGoal - sum;

    return (
      <h1 className="text-green-600 font-semibold">
        {sumSubtractGoalAndWater < 0 ? 0 : sumSubtractGoalAndWater}
      </h1>
    );
  };

  const SleepCalculation = (type: string) => {
    const mapSleep = sleep.map((sleep) => sleep.sleep_hours) as number[];
    const goalTarget = goals
      .filter((goal) => goal.goal_type === type)
      .map((goal) => goal.goal_target) as number[];

    const sum = mapSleep.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0,
    );

    const sumGoal = goalTarget.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0,
    );

    const sumSubtractGoalAndWater = sumGoal - sum;

    return (
      <h1 className="text-green-600 font-semibold">
        {sumSubtractGoalAndWater < 0 ? 0 : sumSubtractGoalAndWater}
      </h1>
    );
  };

  return (
    <div className="h-[25rem] w-[35rem] p-4 bg-white rounded-md border-2">
      <Tabs defaultValue="add-meal" className="w-full flex flex-col h-fit ">
        <TabsList className="w-full h-[3rem] mb-5 bg-[#fafbfd]">
          <TabsTrigger value="add-meal">Add Meal</TabsTrigger>
          <TabsTrigger value="daily-log">Daily Log</TabsTrigger>
        </TabsList>
        <TabsContent value="add-meal" className="w-full h-[17rem]">
          <div className="w-full flex justify-between items-center p-4 mb-2 rounded-sm bg-[#fafbfd]">
            <div>
              <h1 className="font-bold">Breakfast</h1>

              <span className="flex">
                <span className="mr-1 font-bold text-green-600">
                  {Calculation('Breakfast')}
                </span>{' '}
                remaining calories
              </span>
            </div>

            <Link to="/food-diary">
              <Button className="!text-white">Add Breakfast</Button>
            </Link>
          </div>

          <div className="w-full flex justify-between items-center p-4 mb-2 rounded-sm bg-[#fafbfd]">
            <div>
              <h1 className="font-bold">Lunch</h1>
              <span className="flex">
                <span className="mr-1 font-bold text-green-600">
                  {Calculation('Lunch')}
                </span>{' '}
                remaining calories
              </span>
            </div>
            <Link to="/food-diary">
              <Button>Add Lunch</Button>
            </Link>
          </div>

          <div className="w-full flex justify-between items-center p-4 mb-2 rounded-sm bg-[#fafbfd]">
            <div>
              <h1 className="font-bold">Dinner</h1>
              <span className="flex">
                <span className="mr-1 font-bold text-green-600">
                  {Calculation('Dinner')}
                </span>{' '}
                remaining calories
              </span>
            </div>
            <Link to="/food-diary">
              <Button>Add Dinner</Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="daily-log" className="w-full h-[17rem]">
          <div className="w-full flex justify-between items-center p-4 mb-2 rounded-sm bg-[#fafbfd]">
            <div>
              <h1 className="font-bold">Water Goal</h1>

              <span className="flex gap-2">
                {WaterCalculation('Water')} total glasses left
              </span>
            </div>
            <Button>Log water</Button>
          </div>

          <div className="w-full flex justify-between items-center p-4 mb-2 rounded-sm bg-[#fafbfd]">
            <div>
              <h1 className="font-bold">Sleep Goal</h1>

              <span className="flex gap-2">
                {SleepCalculation('Sleep')}
                hours sleep left
              </span>
            </div>
            <Button>Log sleep </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
