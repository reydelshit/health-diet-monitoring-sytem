import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

export default function AddWaterLog({
  setWaterDecider,
}: {
  // handleSubmit: any;
  // handleChange: any;
  setWaterDecider: (value: boolean) => void;
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
      .post('http://localhost/hd-monitoring/water.php', {
        ...formData,
        user_id: token,
      })
      .then((res) => {
        if (res.data.status === 'success') {
          setWaterDecider(false);
          window.location.reload();
        }
      });
  };

  return (
    <div className="w-[100%] p-5 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-[30%]"
      >
        <Input
          type="date"
          className="mb-2"
          name="water_date"
          onChange={handleChange}
        />
        <div className="mb-4 w-full">
          <Select
            onValueChange={(value: string) =>
              handleChange({
                target: { name: 'water_glasses', value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            required
            name="water_glasses"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="No. of glasses of water" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Glasses</SelectItem>
              <SelectItem value="2">2 Glasses</SelectItem>
              <SelectItem value="3">3 Glasses</SelectItem>
              <SelectItem value="4">4 Glasses</SelectItem>
              <SelectItem value="5">5 Glasses</SelectItem>
              <SelectItem value="6">6 Glasses</SelectItem>
              <SelectItem value="7">7 Glasses</SelectItem>
              <SelectItem value="8">8 Glasses</SelectItem>
              <SelectItem value="9">9 Glasses</SelectItem>
              <SelectItem value="10">10 Glasses</SelectItem>
              <SelectItem value="11">11 Glasses</SelectItem>
              <SelectItem value="12">12 Glasses</SelectItem>
              <SelectItem value="13">13 Glasses</SelectItem>
              <SelectItem value="14">14 Glasses</SelectItem>
              <SelectItem value="15">15 Glasses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full flex items-center justify-center gap-4">
          <Button
            // onClick={() => setWorkoutPlansDecider(false)}
            className="w-[50%] self-center"
            type="submit"
          >
            Log water now!
          </Button>

          <Button
            onClick={() => setWaterDecider(false)}
            className="w-[50%] self-center bg-red-600"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
