import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaGreaterThan } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

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
      .get('http://localhost/hd_monitoring/workout.php', {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        console.log(res.data, 'component');
        setWorkoutPlans(res.data);
      });
  };

  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

  const refreshComponent = () => {
    useNavigate();
  };

  return (
    <div className="w-full h-fit mt-[2rem] flex flex-col rounded-md p-4 bg-white border-2">
      <div className="flex justify-between mb-4">
        <h1 className="font-bold">Workout plans</h1>
        <Link to="/workout-plans">
          <span className="cursor-pointer">see all</span>
        </Link>
      </div>

      <div>
        <div className="flex flex-col">
          {workoutPlans &&
            workoutPlans
              .filter((workout) => workout.workout_status === 'Ongoing')
              .slice(0, 3)
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
                        <Link
                          onClick={refreshComponent}
                          to={`/workout-plans/${workout.workout_id}`}
                        >
                          <h1 className="font-bold cursor-pointer text-1xl">
                            {workout.workout_plans_name.length &&
                              workout.workout_plans_name
                                .slice(0, 1)
                                .toUpperCase() +
                                workout.workout_plans_name
                                  .slice(1)
                                  .slice(0, 20)}
                          </h1>
                        </Link>
                        <p>{workout.workout_mins}</p>
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
