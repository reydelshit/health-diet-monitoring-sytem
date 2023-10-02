import { useState, useEffect } from 'react';
import AddWorkoutPlans from './workout-plans/AddWorkoutPlans';
import { Button } from './ui/button';
import axios from 'axios';
import { FaGreaterThan } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import moment from 'moment';
import { Link } from 'react-router-dom';

type WorkoutPlans = {
  workout_id: number;
  workout_plans_name: string;
  workout_mins: string;
  workout_description: string;
  workout_when: string;
  workout_status: string;
  user_id: number;
};

type Properties<T, U> = U extends keyof T ? T[U] : never;

export default function WorkoutPlans() {
  const [workoutPlansDecider, setWorkoutPlansDecider] = useState(false);

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
    <div className="h-screen w-full flex flex-col items-center py-10 px-[4rem]">
      <h1 className="text-3xl font-bold text-[#2b3e54] self-start">
        Workout Plans
      </h1>

      <Button
        className="w-[15rem] self-end"
        onClick={() => setWorkoutPlansDecider(true)}
      >
        Add workout plans
      </Button>

      {workoutPlansDecider ? (
        <AddWorkoutPlans
          // handleSubmit={handleSubmit}
          // handleChange={handleChange}
          setWorkoutPlansDecider={setWorkoutPlansDecider}
        />
      ) : (
        <div className="w-[80%] h-fit mt-[2rem] flex flex-col justify-between rounded-md p-4 bg-white">
          <div className="self-end">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Finished">Finished</SelectItem>
                <SelectItem value="All">All</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex flex-col">
              {workoutPlans &&
                workoutPlans.map((workout, index) => {
                  const {
                    workout_plans_name,
                    workout_description,
                    workout_status,
                    workout_when,
                    workout_mins,
                  } = workout;
                  return (
                    <div
                      key={index}
                      className="flex gap-4 items-center justify-between mb-2 p-2 rounded-md"
                    >
                      <div className="flex gap-4 items-center w-full">
                        <div className="flex items-center justify-between w-full border-2 p-2 rounded-md">
                          <div>
                            <Link to={`/workout-plans/${workout.workout_id}`}>
                              <h1 className="font-bold cursor-pointer text-3xl">
                                {workout_plans_name.length &&
                                  workout_plans_name.slice(0, 1).toUpperCase() +
                                    workout_plans_name.slice(1).slice(0, 20)}
                              </h1>
                            </Link>

                            <p>{moment(workout_when).format('LL')}</p>
                          </div>

                          <div
                            className="p-2 w-[5rem] text-center rounded-md text-white cursor-pointer"
                            style={{
                              backgroundColor:
                                workout_status === 'Ongoing' ? 'green' : 'red',
                            }}
                          >
                            <span>{workout_status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
