import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

type MedicalHistory = {
  medical_id: number;
  medical_title: string;
  medical_desc: string;
  medical_date: string;
};

export const metadata = {
  title: 'Medical History',
  description:
    'Record of your past health issues, treatments, surgeries, and any important health information!',
};

export default function ViewMedicalHistory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchMedicalHistory = () => {
    axios
      .get(`http://localhost/hd-monitoring/medical.php/`, {
        params: {
          medical_id: id,
        },
      })
      .then((res) => {
        setTitle(res.data[0].medical_title);
        setDescription(res.data[0].medical_desc);
        setMedicalHistory(res.data);

        console.log(res.data, 'nice');
      });
  };

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // console.log(formData);
    e.preventDefault();
    axios
      .put(`http://localhost/hd_monitoring/medical.php/${id}`, {
        medical_title: title,
        medical_desc: description,
        medical_id: id,
        indicator: 'update_medical',
      })
      .then((res) => {
        location.reload();
      });
  };

  const deleteWorkoutPlans = (id: number) => {
    console.log(id);
    axios
      .delete(`http://localhost/hd_monitoring/medical.php/${id}`)
      .then((res) => {
        fetchMedicalHistory();

        if (res.status === 200) {
          navigate('/medical-history');
        }
      });
  };

  return (
    <div className="h-screen w-[100%] items-center flex flex-col py-10 pl-[5rem]">
      <div className="pt-5 pb-5 flex justify-start items-center w-full">
        <span className="block">
          <h1 className="text-3xl font-bold text-[#2b3e54] self-start">
            {metadata.title}
          </h1>
          <p className="text-sm">{metadata.description}</p>
        </span>
      </div>

      <Separator />
      {medicalHistory.map((medical, index) => {
        return (
          <div
            key={index}
            className="bg-white w-[50%] break-words p-4 rounded-md mt-10"
          >
            <div className="flex justify-between mb-4">
              <div className="flex gap-4">
                <h1 className="font-semibold">{medical.medical_title}</h1>
                <span className="block">
                  {moment(medical.medical_date).format('LL')}
                </span>
              </div>
              <div className="flex gap-4 h-[2rem]">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <BsThreeDotsVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
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
                              name="medical_title"
                              onChange={(e) => setTitle(e.target.value)}
                            />

                            <Textarea
                              className="h-[8rem]"
                              defaultValue={description}
                              name="medical_desc"
                              onChange={(e) => setDescription(e.target.value)}
                            ></Textarea>
                            <Button name="update" type="submit">
                              Save
                            </Button>
                          </form>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <DropdownMenuItem
                      onClick={() => deleteWorkoutPlans(medical.medical_id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <p>{medical.medical_desc}</p>
          </div>
        );
      })}
    </div>
  );
}
