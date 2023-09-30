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
import { Label } from '@radix-ui/react-label';

export default function AddMeal({
  // handleSubmit,
  // handleChange,
  setAddMealDecider,
}: {
  // handleSubmit: any;
  // handleChange: any;
  setAddMealDecider: (value: boolean) => void;
}) {
  const [formData, setFormData] = useState([]);

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

        <div className="w-full mb-2">
          <Label
            className="pb-2 text-sm text-gray-500 dark:text-[#9b7366] pl-2"
            htmlFor="macro nutrient"
          >
            (Optional) Macronutrients:
          </Label>
        </div>

        <Input
          type="text"
          placeholder="Enter Fats"
          name="macro_fats"
          className="mb-2"
          onChange={handleChange}
        />

        <Input
          type="text"
          placeholder="Enter Protein"
          name="macro_proteins"
          className="mb-2"
          onChange={handleChange}
        />

        <Input
          type="text"
          placeholder="Enter Carbs"
          name="macro_carbs"
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
