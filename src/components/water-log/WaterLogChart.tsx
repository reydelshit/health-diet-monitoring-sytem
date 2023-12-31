import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import moment from 'moment';
import axios from 'axios';

interface DataItem {
  name: string;
  total: number;
}

export default function WaterLogChart() {
  const [dailyWaterLog, setDailyWaterLog] = useState<DataItem[]>([]);

  const fetchCalorieIntake = () => {
    axios
      .get(`${import.meta.env.VITE_HDMONITORING_LOCAL_HOST}/water.php`, {
        params: {
          user_id: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        console.log('water', res.data);

        const entries = res.data;

        const monthlyWater: { [key: string]: number } = {};
        const currentMonth = moment().format('YYYY-MM');

        entries.forEach(
          (entry: { water_date: moment.MomentInput; water_glasses: any }) => {
            const createdAt = moment(entry.water_date).format('YYYY-MM-DD');
            const waterIntake = parseInt(entry.water_glasses);

            if (createdAt.startsWith(currentMonth)) {
              if (monthlyWater[createdAt]) {
                monthlyWater[createdAt] += waterIntake;
              } else {
                monthlyWater[createdAt] = waterIntake;
              }
            }
          },
        );

        const monthlyData = Object.entries(monthlyWater).map(
          ([name, total]) => ({
            name: moment(name).format('ll'),
            total,
          }),
        );

        setDailyWaterLog(monthlyData);

        console.log(monthlyData);
      });
  };

  useEffect(() => {
    fetchCalorieIntake();
  }, []);

  return (
    <div className="md:w-[100%] md:p-5 bg-white rounded-lg border-2">
      <div className="flex justify-between">
        <h1 className="mb-5 font-bold uppercase">
          Water Intake (each day of the month )
        </h1>
        <p className="font-semibold">{moment().format('LLL')}</p>
      </div>

      <ResponsiveContainer width="80%" height={350}>
        <BarChart data={dailyWaterLog}>
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
