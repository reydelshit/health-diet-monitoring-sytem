import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddMeal from './meal-diary/AddMeal';
import { Button } from './ui/button';

export default function MealDiary() {
  const [meal, setMeal] = useState([]);
  const [addMealDecider, setAddMealDecider] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setMeal((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post('http://localhost/hd-monitoring/meal-diary.php', meal)
      .then((res) => {
        console.log(res.data);

        // if (res.data.status === 'success') {
        //   navigate('/login');
        // }
      });
  };

  return (
    <div className="w-full py-10">
      <div>
        <h1 className="font-bold text-3xl">Meal Diary</h1>
      </div>

      <Button onClick={() => setAddMealDecider(true)}>Add meal</Button>

      {addMealDecider && (
        <AddMeal
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          setAddMealDecider={setAddMealDecider}
        />
      )}
    </div>
  );
}
