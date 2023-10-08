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
import { Separator } from '@/components/ui/separator';
type WorkoutPlans = {
  workout_id: number;
  workout_plans_name: string;
  workout_mins: string;
  workout_description: string;
  workout_when: string;
  workout_status: string;
  user_id: number;
};

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
    <>
      <div className="flex items-center justify-between py-8 pl-[5rem]">
        <span className="block">
          <h1 className="text-3xl font-bold text-[#2b3e54] self-start">
            Workout Plans
          </h1>
          <p className="text-sm">
            Plan a schedule that tells you which exercises to do!
          </p>
        </span>

        <Button
          className="w-[15rem]"
          onClick={() => setWorkoutPlansDecider(true)}
        >
          Add workout plans
        </Button>
      </div>
      <Separator />
      <div>
        {workoutPlansDecider ? (
          <AddWorkoutPlans setWorkoutPlansDecider={setWorkoutPlansDecider} />
        ) : (
          <div className="mt-5">
            <div className="flex justify-end">
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

            <div className="mt-5 flex flex-col justify-center items-center w-full">
              {workoutPlans &&
                workoutPlans.map((workout, index) => {
                  return (
                    <div
                      key={index}
                      className="border-2 p-5 rounded-sm mb-5 w-[50%] break-words bg-white"
                    >
                      <div className="flex justify-between gap-4 mb-2">
                        <Link to={`/workout-plans/${workout.workout_id}`}>
                          <h1 className="font-semibold cursor-pointer">
                            {workout.workout_plans_name.length &&
                              workout.workout_plans_name
                                .slice(0, 1)
                                .toUpperCase() +
                                workout.workout_plans_name
                                  .slice(1)
                                  .slice(0, 20)}
                          </h1>
                        </Link>

                        <span
                          className="block p-1 w-[5rem] text-center rounded-md text-white cursor-pointer"
                          style={{
                            backgroundColor:
                              workout.workout_status === 'Ongoing'
                                ? 'green'
                                : 'red',
                          }}
                        >
                          {workout.workout_status}
                        </span>
                      </div>

                      <p>{workout.workout_description.slice(0, 100)}...</p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

{
  /* <div className="py-10 flex justify-center flex-col">
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
        <div className="w-[50%] h-fit mt-[2rem] flex flex-col justify-between rounded-md p-4 ">
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

          <div className="flex flex-col mt-5 border-2">
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
                    className="flex gap-4 items-center justify-between p-5 rounded-md bg-white border-2 mb-4"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row gap-8">
                        <Link to={`/workout-plans/${workout.workout_id}`}>
                          <h1 className="font-bold cursor-pointer text-3xl">
                            {workout_plans_name.length &&
                              workout_plans_name.slice(0, 1).toUpperCase() +
                                workout_plans_name.slice(1).slice(0, 20)}
                          </h1>
                        </Link>
                        <div
                          className="block p-2 w-[5rem] text-center rounded-md text-white cursor-pointer"
                          style={{
                            backgroundColor:
                              workout_status === 'Ongoing' ? 'green' : 'red',
                          }}
                        >
                          <span>{workout_status}</span>
                        </div>
                      </div>

                      <p className="break-words w-[70%]">
                        {workout.workout_description.slice(0, 150)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div> */
}
