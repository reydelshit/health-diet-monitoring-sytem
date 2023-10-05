import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';

import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function WaterGoal() {
  const [totalGlasses, setTotalGlasses] = useState(0);
  const [dateSince, setDateSince] = useState('');

  const fetchCalorieIntake = () => {
    axios
      .get('http://localhost/hd-monitoring/water.php', {
        params: {
          user_id: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        const entries = res.data;

        const totalSumCalorie = entries.reduce(
          (accumulator: number, currentValue: any) =>
            accumulator + parseInt(currentValue.water_glasses),
          0,
        );

        setTotalGlasses(totalSumCalorie);

        const oldestEntry = entries.reduce((oldest: any, current: any) => {
          const currentCreatedAt = new Date(current.created_at);
          const oldestCreatedAt = new Date(oldest.created_at);

          if (currentCreatedAt < oldestCreatedAt) {
            return current;
          } else {
            return oldest;
          }
        }, entries[0]);

        setDateSince(oldestEntry.created_at);
      });
  };

  useEffect(() => {
    fetchCalorieIntake();
  }, []);

  return (
    <Card className="w-[20rem]">
      <CardHeader className="pb-4">
        <CardTitle>Total Glasses</CardTitle>
        <CardDescription>Your total glasses of water.</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex-1 text-center">
            <div className="text-5xl font-bold tracking-tighter">
              {totalGlasses}{' '}
              <span className="text-[1rem] uppercase text-muted-foreground">
                Glasses
              </span>
            </div>
            <div className="text-[0.70rem] uppercase text-muted-foreground">
              {dateSince.length > 0 ? (
                <p>since {moment(dateSince).format('MMM DD, YYYY')}</p>
              ) : (
                <p>add calorie first to show date</p>
              )}
            </div>
          </div>
        </div>
        <div className="my-3 h-[60px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar opacity={0.3} dataKey="goal" fill="#16A34A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="grid place-content-center">
        <Link to="/food-diary">
          <Button className="w-full">Log Calorie now!</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}