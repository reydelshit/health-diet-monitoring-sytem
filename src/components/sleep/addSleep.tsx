import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export default function AddSleepLog({
  setSleepDecider,
}: {
  setSleepDecider: (value: boolean) => void;
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
      .post('http://localhost/hd-monitoring/sleep.php', {
        ...formData,
        user_id: token,
      })
      .then((res) => {
        if (res.data.status === 'success') {
          setSleepDecider(false);
          window.location.reload();
        } else {
          console.log(res.data);
        }
      });
  };

  return (
    <div className="w-[100%] p-5 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-[30%]"
      >
        <div className="mb-4 w-full">
          <Select
            onValueChange={(value: string) =>
              handleChange({
                target: { name: 'sleep_time', value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            required
            name="sleep_time"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sleep time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning sleep</SelectItem>
              <SelectItem value="afternoon">Afternoon sleep</SelectItem>
              <SelectItem value="night">Night sleep</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4 w-full">
          <Select
            onValueChange={(value: string) =>
              handleChange({
                target: { name: 'sleep_hours', value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            required
            name="sleep_hours"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="No. of hours sleep" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Hour</SelectItem>
              <SelectItem value="2">2 Hours</SelectItem>
              <SelectItem value="3">3 Hours</SelectItem>
              <SelectItem value="4">4 Hours</SelectItem>
              <SelectItem value="5">5 Hours</SelectItem>
              <SelectItem value="6">6 Hours</SelectItem>
              <SelectItem value="7">7 Hours</SelectItem>
              <SelectItem value="8">8 Hours</SelectItem>
              <SelectItem value="9">9 Hours</SelectItem>
              <SelectItem value="10">10 Hours</SelectItem>
              <SelectItem value="11">11 Hours</SelectItem>
              <SelectItem value="12">12 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full flex items-center justify-center gap-4">
          <Button
            // onClick={() => setWorkoutPlansDecider(false)}
            className="w-[50%] self-center"
            type="submit"
          >
            Log sleep now!
          </Button>

          <Button
            onClick={() => setSleepDecider(false)}
            className="w-[50%] self-center bg-red-600"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
