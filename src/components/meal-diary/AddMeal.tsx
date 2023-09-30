import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { useState } from 'react';

export default function AddMeal({
  // handleSubmit,
  // handleChange,
  setAddMealDecider,
}: {
  // handleSubmit: any;
  // handleChange: any;
  setAddMealDecider: (value: boolean) => void;
}) {
  const [meal, setMeal] = useState([]);
  const [mealTime, setMealTime] = useState('');

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   const name = e.target.name;

  //   setMeal((values) => ({ ...values, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   console.log(meal);
  //   e.preventDefault();

  //   // axios
  //   //   .post('http://localhost/hd-monitoring/meal-diary.php', meal)
  //   //   .then((res) => {
  //   //     console.log(res.data);

  //   //     // if (res.data.status === 'success') {
  //   //     //   navigate('/login');
  //   //     // }
  //   //   });
  // };

  const [formData, setFormData] = useState([]);
  const [response, setResponse] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();

    const token = localStorage.getItem('token') as unknown as number;

    axios
      .post('http://localhost/hd-monitoring/meal-diary.php', {
        ...formData,
        user_id: token,
      })
      .then((res) => {
        console.log(res.data);

        // if (res.data.status === 'success') {
        //   navigate('/login');
        // }
      });
  };

  return (
    <div className="border-2 w-[100%] p-5 flex justify-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-[30%]"
      >
        <Input
          placeholder="Meal Name"
          name="meal_name"
          onChange={handleChange}
          className="mb-2"
        />

        <div className="mb-4 w-full">
          <Select
            onValueChange={(value: string) =>
              handleChange({
                target: { name: 'meal_time', value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            required
            name="meal_time"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Meal Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Breakfast">Breakfast</SelectItem>
              <SelectItem value="Lunch Break">Lunch Break</SelectItem>
              <SelectItem value="Dinner">Dinner</SelectItem>
              <SelectItem value="Snacks">Snacks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          type="text"
          placeholder="Enter calorie"
          name="calorie"
          className="mb-2"
          onChange={handleChange}
        />

        <div>
          <Button className=" self-center mr-2" type="submit">
            Save
          </Button>
          <Button
            onClick={() => setAddMealDecider(false)}
            className=" self-center"
            type="submit"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
