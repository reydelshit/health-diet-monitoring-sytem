import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

type FoodLog = {
  meal_name: string;
  calorie_intake: string;
  nutri_information: string;
  meal_time: string;
};

export default function FoodLogTable() {
  const [foodLog, setFoodLog] = useState<FoodLog[]>([]);
  const [filterFood, setFilterFood] = useState<string>('All');

  const id = localStorage.getItem('token') as unknown as number;

  const fetchFoodLog = () => {
    axios
      .get(`${import.meta.env.VITE_HDMONITORING_LOCAL_HOST}/meal-diary.php`, {
        params: {
          user_id: id,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data, 'meal diary');
        setFoodLog(res.data);
      });
  };

  useEffect(() => {
    fetchFoodLog();
  }, []);

  const handleSort = (event: string) => {
    const selectedValue = event;
    setFilterFood(selectedValue);
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded-sm w-[100%] border-2 h-[25rem]">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl py-2">Latest Food Log</h1>
        <div className="self-end mb-2">
          <Select onValueChange={handleSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableCaption>Latest food log.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Meal</TableHead>
            <TableHead>Calorie Intake</TableHead>
            <TableHead>Meal Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foodLog &&
            foodLog
              .filter((food) => {
                const filtered =
                  filterFood === 'All'
                    ? true
                    : food.meal_time.toLowerCase().includes(filterFood);
                return filtered;
              })
              .map((food, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{food.meal_name}</TableCell>
                    <TableCell>{food.calorie_intake}</TableCell>

                    <TableCell>{food.meal_time}</TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </div>
  );
}
