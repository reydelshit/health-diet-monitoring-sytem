import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { set } from 'date-fns';

type Goal = {
  goal_id: number;
  goal_type: string;
  goal_target: string;
  user_id: number;
  goal_month: Date;
};

export default function Goal() {
  const [target, setTarget] = useState(0);
  const [calories, setCalories] = useState<Goal[]>([]);
  const [sleep, setSleep] = useState<Goal[]>([]);
  const [water, setWater] = useState<Goal[]>([]);

  const [disabled, setDisabled] = useState({
    Calorie: true,
    Water: true,
    Sleep: true,
  });

  const [readyForUpdate, setReadyForUpdate] = useState(false);
  const [getId, setGetId] = useState(0);

  const user_id = localStorage.getItem('token') as unknown as number;

  const fetchUserGoal = () => {
    axios
      .get('http://localhost/hd-monitoring/goal.php', {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        console.log(res.data, 'dasdad');

        const calories = res.data.filter((goal: Goal) => {
          return goal.goal_type === 'Calorie';
        });

        const sleep = res.data.filter((goal: Goal) => {
          return goal.goal_type === 'Sleep';
        });

        const water = res.data.filter((goal: Goal) => {
          return goal.goal_type === 'Water';
        });

        setCalories(calories);
        setSleep(sleep);
        setWater(water);

        if (calories.length === 0) {
          setDisabled({
            ...disabled,
            Calorie: false,
          });
        } else {
          setDisabled({
            ...disabled,
            Calorie: true,
          });
        }

        if (water.length === 0) {
          setDisabled({
            ...disabled,
            Water: false,
          });
        } else {
          setDisabled({
            ...disabled,
            Water: true,
          });
        }

        if (sleep.length === 0) {
          setDisabled({
            ...disabled,
            Sleep: false,
          });
        } else {
          setDisabled({
            ...disabled,
            Sleep: true,
          });
        }
      });
  };

  useEffect(() => {
    fetchUserGoal();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: string) => {
    console.log(target, type);
    e.preventDefault();

    if (readyForUpdate) {
      axios
        .put('http://localhost/hd-monitoring/goal.php', {
          goal_id: getId,
          goal_target: target,
        })
        .then((res) => {
          console.log(res.data);
        });
    } else {
      axios
        .post('http://localhost/hd-monitoring/goal.php', {
          goal_target: target,
          goal_type: type,
          user_id: user_id,
        })
        .then((res) => {
          console.log(res.data);
        });
    }

    console.log(getId, 'getid');
  };

  const handleEdit = (type: string, id: number) => {
    console.log(calories, 'calories');
    setGetId(id);
    setReadyForUpdate(true);
    if (type === 'Calorie') {
      setDisabled({
        ...disabled,
        Calorie: false,
      });
    } else if (type === 'Water') {
      setDisabled({
        ...disabled,
        Water: false,
      });
    } else {
      setDisabled({
        ...disabled,
        Sleep: false,
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-center p-2">
      <h1 className="font-bold text-4xl">Set your goals</h1>

      <div className="flex gap-10 mt-[5rem] justify-center items-center">
        {calories.map((goal: Goal, index) => {
          return (
            <div
              key={index}
              className="w-[20rem] h-[15rem]  border-2 p-4 flex flex-col justify-around rounded-sm"
            >
              <div className="flex justify-between">
                <h1 className="font-bold">Calories</h1>
                <span
                  onClick={() => handleEdit('Calorie', goal.goal_id)}
                  className="text-green-600 cursor-pointer"
                >
                  Edit
                </span>
              </div>
              <form
                onSubmit={(e) => handleSubmit(e, 'Calorie')}
                className="w-full"
              >
                <Label className="text-lg">Monthly Calorie Intake Goal</Label>
                <Label>
                  We are going to divide it per day. <br />
                  Eg. 3000 / 30 = 100
                </Label>
                <Input
                  className="mt-2"
                  type="number"
                  name="goal_target"
                  placeholder="0"
                  onChange={(e) => setTarget(parseInt(e.target.value))}
                  defaultValue={goal.goal_target}
                  disabled={disabled.Calorie}
                />
                <Button
                  disabled={disabled.Calorie}
                  type="submit"
                  className="w-full mt-2"
                >
                  Save
                </Button>
              </form>
            </div>
          );
        })}
        {sleep.map((goal: Goal, index) => {
          return (
            <div
              key={index}
              className="w-[20rem] h-[15rem]  border-2 p-4 flex flex-col justify-around rounded-sm"
            >
              <div className="flex justify-between">
                <h1 className="font-bold">Sleep</h1>
                <span
                  onClick={() => handleEdit('Sleep', goal.goal_id)}
                  className="text-green-600 cursor-pointer"
                >
                  Edit
                </span>
              </div>

              <form
                onSubmit={(e) => handleSubmit(e, 'Sleep')}
                className="w-full"
              >
                <Label className="text-lg">Daily Sleep Duration Goal</Label>
                <Label>Eg. 7 hours</Label>
                <Input
                  className="mt-2"
                  type="number"
                  name="goal_target"
                  placeholder="0"
                  onChange={(e) => setTarget(parseInt(e.target.value))}
                  defaultValue={goal.goal_target}
                  disabled={disabled.Sleep}
                />
                <Button
                  disabled={disabled.Sleep}
                  type="submit"
                  className="w-full mt-2"
                >
                  Save
                </Button>
              </form>
            </div>
          );
        })}

        {water.map((goal: Goal, index) => {
          return (
            <div
              key={index}
              className="w-[20rem] h-[15rem]  border-2 p-4 flex flex-col justify-around rounded-sm"
            >
              <div className="flex justify-between">
                <h1 className="font-bold">Water</h1>
                <span
                  onClick={() => handleEdit('Water', goal.goal_id)}
                  className="text-green-600 cursor-pointer"
                >
                  Edit
                </span>
              </div>

              <form
                onSubmit={(e) => handleSubmit(e, 'Water')}
                className="w-full"
              >
                <Label className="text-lg">
                  Daily Water Intake Goal (in ounces/liters)
                </Label>
                <Label>8 glasses of water a day</Label>
                <Input
                  className="mt-2"
                  type="number"
                  name="goal_target"
                  placeholder="0"
                  onChange={(e) => setTarget(parseInt(e.target.value))}
                  defaultValue={goal.goal_target}
                  disabled={disabled.Water}
                />
                <Button
                  disabled={disabled.Water}
                  type="submit"
                  className="w-full mt-2"
                >
                  Save
                </Button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}