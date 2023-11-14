import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '../ui/textarea';

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;
export default function AddMedicalHistory({
  setMedicalHistoryDecider,
}: {
  setMedicalHistoryDecider: (value: boolean) => void;
}) {
  const [formData, setFormData] = useState([]);

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();

    const token = localStorage.getItem('token') as unknown as number;

    axios
      .post(`${import.meta.env.VITE_HDMONITORING_LOCAL_HOST}/medical.php`, {
        ...formData,
        user_id: token,
        indicator: 'post_medical_records_general',
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.status === 'success') {
          setMedicalHistoryDecider(false);
          window.location.reload();
        }
      });
  };

  return (
    <div className="w-[100%] p-5 flex justify-center h-fit">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-[40%]"
      >
        <Input
          placeholder="Medical title"
          name="medical_title"
          className="mb-2"
          onChange={handleChange}
        />
        <Textarea
          placeholder="Medical description"
          name="medical_desc"
          className="mb-2"
          onChange={handleChange}
        ></Textarea>
        <Label className="text-start ml-2 text-sm">Date:</Label>
        <Input
          type="date"
          className="mb-2"
          name="medical_date"
          onChange={handleChange}
        />

        <Button className="w-[80%] self-center" type="submit">
          Add medical history
        </Button>
      </form>
    </div>
  );
}
