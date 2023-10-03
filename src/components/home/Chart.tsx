'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
// import { getAllSurvey } from '../../action/getRankings';
import moment from 'moment';
import axios from 'axios';

interface DataItem {
  name: string;
  total: number;
}

export default function Chart() {
  // const [totalDayIntake, setTotalDayIntake] = useState([
  //   {
  //     total: 0,
  //     name: '',
  //   },
  // ]);

  const [monthlyCalories, setMonthlyCalorieIntake] = useState<DataItem[]>([]);

  //   const [loading, setLoading] = useState(false);

  //   async function fetchTotalSurvey() {
  //     try {
  //       const totalSurvey = await getAllSurvey();
  //       if (totalSurvey) {
  //         const countByMonth = totalSurvey.reduce((acc, survey) => {
  //           const suveyDate = new Date(survey.createdAt);

  //           const month = suveyDate.getMonth() + 1;
  //           const year = suveyDate.getFullYear();

  //           // Create a key in the format "YYYY-MM"
  //           const key = `${year}-${String(month).padStart(2, '0')}`;

  //           // Increment the count for the month in the accumulator object
  //           acc[key] = (acc[key] || 0) + 1;

  //           return acc;
  //         }, {} as Record<string, number>);

  //         const totalDaySurvey = Object.keys(countByMonth).map((month) => {
  //           return {
  //             totalSurvey: countByMonth[month],
  //             month: moment(month, 'YYYY-MM').format('MMMM'),
  //           };
  //         });

  //         // console.log(totalDaySurvey[0].month);

  //         const totalDayEachMonth = totalDaySurvey.map((month) => {
  //           return {
  //             total: month.totalSurvey,
  //             name: month.month,
  //           };
  //         });
  //         setTotalDaySurvey([...totalDayEachMonth]);

  //         // console.log(totalDaySurvey.length);
  //       }
  //     } catch (error) {
  //       console.log('today', error);
  //     }
  //   }

  //   useEffect(() => {
  //     fetchTotalSurvey();
  //   }, []);

  const data = [
    {
      name: 'Jan',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Feb',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Mar',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Apr',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'May',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Jun',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Jul',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Aug',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Sep',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Oct',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Nov',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Dec',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ];

  const fetchCalorieIntake = () => {
    axios
      .get('http://localhost/hd-monitoring/meal-diary.php', {
        params: {
          id: localStorage.getItem('token'),
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

            // If the month is already in the accumulator, add to it; otherwise, create it
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
    <div className="md:w-[80%] md:p-5 bg-white rounded-lg">
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
