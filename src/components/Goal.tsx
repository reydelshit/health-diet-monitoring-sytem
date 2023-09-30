import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import axios from 'axios';
import { set } from 'date-fns';

export default function Goal() {
  // const [goalType, setGoalType] = useState('');
  const [target, setTarget] = useState(0);

  // const handleGoalType = (event: string) => {
  //   const selectedValue = event;
  //   console.log(selectedValue);
  //   setGoalType(selectedValue);
  // };

  const token = localStorage.getItem('token') as unknown as number;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: string) => {
    console.log(target, type);
    e.preventDefault();
    axios
      .post('http://localhost/hd-monitoring/goal.php', {
        goal_target: target,
        goal_type: type,
        user_id: token,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="w-full flex flex-col justify-center p-2">
      <h1 className="font-bold text-4xl">Set your goals</h1>
      <div className="flex gap-10 mt-[5rem] justify-center items-center">
        <div className="w-[20rem] h-[15rem]  border-2 p-4 flex flex-col justify-around rounded-sm">
          <div className="flex justify-between">
            <h1 className="font-bold">Calories</h1>
            <span className="text-green-600">Edit</span>
          </div>
          <form onSubmit={(e) => handleSubmit(e, 'Calorie')} className="w-full">
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
            />
            <Button type="submit" className="w-full mt-2">
              Save
            </Button>
          </form>
        </div>

        <div className="w-[20rem] h-[15rem]  border-2 p-4 flex flex-col justify-around rounded-sm">
          <div className="flex justify-between">
            <h1 className="font-bold">Sleep</h1>
            <span className="text-green-600">Edit</span>
          </div>

          <form onSubmit={(e) => handleSubmit(e, 'Sleep')} className="w-full">
            <Label className="text-lg">Daily Sleep Duration Goal</Label>
            <Label>Eg. 7 hours</Label>
            <Input
              className="mt-2"
              type="number"
              name="goal_target"
              placeholder="0"
              onChange={(e) => setTarget(parseInt(e.target.value))}
            />
            <Button type="submit" className="w-full mt-2">
              Save
            </Button>
          </form>
        </div>

        <div className="w-[20rem] h-[15rem]  border-2 p-4 flex flex-col justify-around rounded-sm">
          <div className="flex justify-between">
            <h1 className="font-bold">Water</h1>
            <span className="text-green-600">Edit</span>
          </div>

          <form onSubmit={(e) => handleSubmit(e, 'Water')} className="w-full">
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
            />
            <Button type="submit" className="w-full mt-2">
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
