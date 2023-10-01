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
        <TabsContent value="add-meal" className="w-full">
          <div className="w-full flex justify-between items-center p-4 mb-2 rounded-sm bg-[#fafbfd]">
            <div>
              <h1 className="font-bold">Water Goal</h1>
              {goals
                .filter((goal) => goal.goal_type === 'Water')
                .map((goal, index) => (
                  <span className="flex" key={index}>
                    <p className="mr-1 font-bold text-green-600">
                      {goal.goal_target}{' '}
                    </p>{' '}
                    total glasses
                  </span>
                ))}
            </div>
            <Button>Log water</Button>
          </div>

          <div className="w-full flex justify-between items-center p-4 mb-2 rounded-sm bg-[#fafbfd]">
            <div>
              <h1 className="font-bold">Sleep Goal</h1>
              {goals
                .filter((goal) => goal.goal_type === 'Sleep')
                .map((goal, index) => (
                  <span className="flex" key={index}>
                    <p className="mr-1 font-bold text-green-600">
                      {goal.goal_target}{' '}
                    </p>
                    total sleep
                  </span>
                ))}
            </div>
            <Button>Log sleep </Button>
          </div>
        </TabsContent>
        <TabsContent value="add-exercise">excercise here.</TabsContent>
      </Tabs>
    </div>
  );
}
