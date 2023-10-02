import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { useState } from 'react';
import { Label } from '@radix-ui/react-label';

export default function AddMedicalHistory({
  setMedicalHistoryDecider,
}: {
  // handleSubmit: any;
  // handleChange: any;
  setMedicalHistoryDecider: (value: boolean) => void;
}) {
  const [formData, setFormData] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();

    const token = localStorage.getItem('token') as unknown as number;

    axios
      .post('http://localhost/hd-monitoring/medical.php', {
        ...formData,
        user_id: token,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="border-2 w-[100%] p-5 flex justify-center h-[80vh]">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <Input
          placeholder="Medical title"
          name="medical_title"
          className="mb-2"
          onChange={handleChange}
        />
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
