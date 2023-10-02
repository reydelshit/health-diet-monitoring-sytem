import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaGreaterThan } from 'react-icons/fa';

type WorkoutPlans = {
  workout_id: number;
  workout_plans_name: string;
  workout_mins: string;
  workout_when: string;
  workout_status: string;
  user_id: number;
};

export default function WorkoutPlansComponent() {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlans[]>([]);

  const user_id = localStorage.getItem('token') as unknown as number;

  const fetchWorkoutPlans = () => {
    axios
      .get('http://localhost/hd-monitoring/workout.php', {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setWorkoutPlans(res.data);
      });
  };

  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

  return (
    <div className="w-full border-2 h-[20rem] mt-[2rem] flex flex-col justify-between rounded-md p-4">
      <div className="flex justify-between">
        <h1 className="font-bold">Workout plans</h1>
        <span className="cursor-pointer">see all</span>
      </div>

      <div>
        <div className="flex flex-col">
          {workoutPlans &&
            workoutPlans
              .slice(0, 3)
              .filter((workout) => workout.workout_status === 'Ongoing')
              .map((workout, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-4 items-center justify-between border-2 mb-2 p-2 rounded-md"
                  >
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div>
                        <h1 className="font-bold cursor-pointer">
                          {workout.workout_plans_name.length > 12
                            ? workout.workout_plans_name.slice(0, 12) + '...'
                            : workout.workout_plans_name}
                        </h1>
                        <p>{workout.workout_mins} minutes</p>
                      </div>
                    </div>

                    <FaGreaterThan className="cursor-pointer" />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
