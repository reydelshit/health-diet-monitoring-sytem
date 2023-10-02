import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '../ui/textarea';

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export default function AddWorkoutPlans({
  setWorkoutPlansDecider,
}: {
  // handleSubmit: any;
  // handleChange: any;
  setWorkoutPlansDecider: (value: boolean) => void;
}) {
  const [formData, setFormData] = useState({});

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();

    const token = localStorage.getItem('token') as unknown as number;

    axios
      .post('http://localhost/hd-monitoring/workout.php', {
        ...formData,
        user_id: token,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.status === 'success') {
          setWorkoutPlansDecider(false);
          window.location.reload();
        }
      });
  };

  return (
    <div className="w-[100%] p-5 flex justify-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-[40%]"
      >
        <Input
          placeholder="Workout title"
          name="workout_plans_name"
          className="mb-2"
          onChange={handleChange}
        />
        <Input
          placeholder="Workout duration"
          name="workout_mins"
          className="mb-2"
          onChange={handleChange}
        />
        <Textarea
          name="workout_description"
          className="h-[10rem]"
          placeholder="Description.."
          onChange={handleChange}
        ></Textarea>

        <Label className="text-start ml-2 text-sm ">Schedule:</Label>
        <Input
          type="date"
          className="mb-2"
          name="workout_when"
          onChange={handleChange}
        />

        <div className="w-full flex items-center justify-center gap-4">
          <Button
            // onClick={() => setWorkoutPlansDecider(false)}
            className="w-[50%] self-center"
            type="submit"
          >
            Add workout plan
          </Button>

          <Button
            onClick={() => setWorkoutPlansDecider(false)}
            className="w-[50%] self-center bg-red-600"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
