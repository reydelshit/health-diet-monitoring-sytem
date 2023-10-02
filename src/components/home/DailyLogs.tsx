import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Goal = {
  goal_type: string;
  goal_target: string;
  user_id: number;
  goal_month: Date;
};

export default function DailyLogs() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const getGoals = () => {
    axios
      .get('http://localhost/hd-monitoring/goal.php', {
        params: {
          user_id: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        // console.log(res.data, 'daily goals');

        setGoals(res.data);
      });
  };
  useEffect(() => {
    getGoals();
  }, []);

  return (
    <div className="border-2 h-[23.5rem] w-[28rem] p-4 bg-white rounded-md">
      <Tabs defaultValue="add-meal" className="w-full flex flex-col h-fit ">
        <TabsList className="w-full h-[3rem] mb-5 bg-[#fafbfd]">
          <TabsTrigger value="add-meal">Add Log</TabsTrigger>
          <TabsTrigger value="add-exercise">Add Exercise</TabsTrigger>
        </TabsList>

        <TabsContent value="add-exercise">excercise here.</TabsContent>
      </Tabs>
    </div>
  );
}
