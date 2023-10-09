import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import moment from 'moment';
import axios from 'axios';

interface DataItem {
  name: string;
  total: number;
}

export default function CalorieChart() {
  const [monthlyCalories, setMonthlyCalorieIntake] = useState<DataItem[]>([]);

  const fetchCalorieIntake = () => {
    axios
      .get('http://localhost/hd-monitoring/meal-diary.php', {
        params: {
          user_id: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        console.log('calorie', res.data);

        const entries = res.data;

        const monthlyCalories: { [key: string]: number } = {};

        entries.forEach(
          (entry: { created_at: moment.MomentInput; calorie_intake: any }) => {
            const createdAt = moment(entry.created_at).format('MMM');
            const calorieIntake = parseInt(entry.calorie_intake);

            if (monthlyCalories[createdAt]) {
              monthlyCalories[createdAt] += calorieIntake;
            } else {
              monthlyCalories[createdAt] = calorieIntake;
            }
          },
        );

        const monthlyData = Object.entries(monthlyCalories).map(
          ([name, total]) => ({
            name,
            total,
          }),
        );

        setMonthlyCalorieIntake(monthlyData);

        console.log(monthlyData);
      });
  };

  useEffect(() => {
    fetchCalorieIntake();
  }, []);

  return (
    <div className="md:w-[100%] md:p-5 bg-white rounded-lg border-2">
      <h1 className="mb-5 font-bold uppercase">Calorie Intake</h1>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={monthlyCalories}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar dataKey="total" fill="#16A34A" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
