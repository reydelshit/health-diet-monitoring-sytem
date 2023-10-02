'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
// import { getAllSurvey } from '../../action/getRankings';
import moment from 'moment';

export default function Chart() {
  const [totalDaySurvey, setTotalDaySurvey] = useState([
    {
      total: 0,
      name: '',
    },
  ]);

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

  return (
    <div className="md:w-[80%] md:p-5 bg-white rounded-lg">
      <h1 className="mb-5 font-bold uppercase">Calorie Intake</h1>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          {/* <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          /> */}
          <Bar dataKey="total" fill="#16A34A" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
