import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

type WorkoutPlans = {
  workout_id: number;
  workout_plans_name: string;
  workout_mins: string;
  workout_description: string;
  workout_when: string;
  workout_status: string;
  user_id: number;
};

export const metadata = {
  title: 'Workout Plans',
  description: ' Plan a schedule that tells you which exercises to do!',
};

export default function ViewWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlans[]>([]);

  const [title, setTitle] = useState('');
  const [mins, setMins] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const fetchWorkoutPlans = () => {
    axios
      .get(`${import.meta.env.VITE_HDMONITORING_LOCAL_HOST}/workout.php`, {
        params: {
          workout_id: id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setWorkoutPlans(res.data);
        setTitle(res.data[0].workout_plans_name);
        setMins(res.data[0].workout_mins);
        setDescription(res.data[0].workout_description);
        setStatus(res.data[0].workout_status);
      });
  };

  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // console.log(formData);
    e.preventDefault();

    axios
      .put(
        `${import.meta.env.VITE_HDMONITORING_LOCAL_HOST}/workout.php/${id}`,
        {
          workout_plans_name: title,
          workout_mins: mins,
          workout_description: description,
          id: id,
          indicator: 'update_workout',
        },
      )
      .then((res) => {
        // console.log(res.data);
        fetchWorkoutPlans();
        if (res.status === 200) {
          navigate('/workout-plans');
        }
      });
  };

  const deleteWorkoutPlans = (id: number) => {
    console.log(id);
    axios
      .delete(
        `${import.meta.env.VITE_HDMONITORING_LOCAL_HOST}/workout.php/${id}`,
      )
      .then((res) => {
        // console.log(res.data);
        fetchWorkoutPlans();

        if (res.status === 200) {
          navigate('/workout-plans');
        }
      });
  };

  const markFinish = (id: number, status: string) => {
    // console.log(id);
    axios
      .put(
        `${
          import.meta.env.VITE_HDMONITORING_LOCAL_HOST
        }/workout.php/finish/${id}`,
        {
          workout_status: status === 'Ongoing' ? 'Finished' : 'Ongoing',
          workout_id: id,
          indicator: 'update_workout_status',
        },
      )
      .then((res) => {
        location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="h-screen w-full flex flex-col items-center py-10 pl-[5rem]">
      <div className="py-5 flex items-start justify-start w-full">
        <span className="block">
          <h1 className="text-3xl font-bold text-[#2b3e54] self-start">
            {metadata.title}
          </h1>
          <p className="text-sm">{metadata.description}</p>
        </span>
      </div>
      <Separator />
      {workoutPlans && (
        <div className="w-[60%] bg-white p-2 rounded-sm h-fit mt-10">
          {workoutPlans.map((workout, index) => {
            return (
              <div key={index} className="p-5">
                <div className="w-full justify-between flex mb-5">
                  <div className="flex items-center gap-5">
                    <h1 className="font-semibold text-3xl">
                      {workout.workout_plans_name}
                    </h1>
                    <p>{moment(workout.workout_when).format('LL')}</p>
                  </div>

                  <div className="flex gap-4">
                    <div
                      className="p-2 w-[5rem] text-center rounded-md text-white cursor-pointer"
                      style={{
                        backgroundColor:
                          workout.workout_status === 'Ongoing'
                            ? 'green'
                            : 'red',
                      }}
                    >
                      <span>{workout.workout_status}</span>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <BsThreeDotsVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => markFinish(workout.workout_id, status)}
                          className="cursor-pointer"
                        >
                          Mark as{' '}
                          {status === 'Ongoing' ? 'Finished' : 'Ongoing'}
                        </DropdownMenuItem>
                        <Dialog>
                          <DialogTrigger className="px-2 text-sm">
                            Update
                          </DialogTrigger>
                          <DialogContent className="h-[25rem]">
                            <DialogHeader>
                              <DialogTitle>Update</DialogTitle>
                              <form
                                onSubmit={handleSubmit}
                                className="h-full flex flex-col justify-around"
                              >
                                <Input
                                  defaultValue={title}
                                  type="text"
                                  name="workout_plans_name"
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                                <Input
                                  defaultValue={mins}
                                  type="text"
                                  name="workout_mins"
                                  onChange={(e) => setMins(e.target.value)}
                                />
                                <Textarea
                                  className="h-[8rem]"
                                  defaultValue={description}
                                  name="workout_description"
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                ></Textarea>
                                <Button name="update" type="submit">
                                  Save
                                </Button>
                              </form>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem
                          onClick={() => deleteWorkoutPlans(workout.workout_id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
