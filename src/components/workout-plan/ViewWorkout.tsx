import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type WorkoutPlans = {
  workout_id: number;
  workout_plans_name: string;
  workout_mins: string;
  workout_description: string;
  workout_when: string;
  workout_status: string;
  user_id: number;
};

export default function ViewWorkout() {
  const { id } = useParams();
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlans[]>([]);

  const fetchWorkoutPlans = () => {
    axios
      .get(`http://localhost/hd-monitoring/workout.php/${id}`)
      .then((res) => {
        console.log(res.data, 'dasda');
        setWorkoutPlans([res.data]);
      });
  };

  useEffect(() => {
    fetchWorkoutPlans();
  }, []);
  return (
    <div className="h-screen w-full flex flex-col items-center py-10 px-[4rem] ">
      {workoutPlans && (
        <div className="w-[60%] bg-white p-2 rounded-sm h-fit">
          {workoutPlans.map((workout) => {
            return (
              <div className="p-5">
                <div className="w-full justify-between flex mb-5">
                  <div className="flex items-center gap-5">
                    <h1 className="font-semibold text-3xl">
                      {workout.workout_plans_name}
                    </h1>
                    <p>{moment(workout.workout_when).format('LL')}</p>
                  </div>
                  <div
                    className="p-2 w-[5rem] text-center rounded-md text-white cursor-pointer"
                    style={{
                      backgroundColor:
                        workout.workout_status === 'Ongoing' ? 'green' : 'red',
                    }}
                  >
                    <span>{workout.workout_status}</span>
                  </div>
                </div>

                <div>
                  <span className="mb-5">{workout.workout_mins}</span>
                  <p className="break-words text-start">
                    {workout.workout_description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
