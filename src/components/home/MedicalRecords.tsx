import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaGreaterThan } from 'react-icons/fa';
import { Label } from '../ui/label';
import moment from 'moment';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link, useNavigate } from 'react-router-dom';

type MedicalRecords = {
  medical_id: number;
  medical_title: string;
  medical_date: string;
  user_id: number;
  created_at: Date;
};

export default function MedicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecords[]>([]);

  const user_id = localStorage.getItem('token') as unknown as number;

  const fetchMedicalRecords = () => {
    axios
      .get('http://localhost/hd-monitoring/medical.php', {
        params: {
          medical_id: 0,
          user_id: user_id,
          indicator: 'get-medical-records-by-user-id',
        },
      })
      .then((res) => {
        // console.log(res.data);

        setMedicalRecords(res.data);
      });
  };

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const handleNavigate = () => {
    useNavigate();
  };

  return (
    <div className="w-full h-full flex flex-col rounded-md p-4 bg-white border-2">
      <div className="flex justify-between mb-5">
        <span className="block">
          <h1 className="font-bold">Medical Records</h1>
          <Label>Only shows 3</Label>
        </span>

        <span className="cursor-pointer">see all</span>
      </div>

      <div>
        <div className="flex flex-col">
          {medicalRecords.slice(0, 3).map((medical, index) => {
            return (
              <div
                key={index}
                className="flex gap-4 items-center justify-between border-2 mb-2 p-2 rounded-md"
              >
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div>
                    <Link
                      onClick={handleNavigate}
                      to={`/medical-history/${medical.medical_id}`}
                    >
                      <h1 className="font-bold cursor-pointer">
                        {medical.medical_title}
                      </h1>
                    </Link>

                    <p>{moment(medical.medical_date).format('LL')}</p>
                  </div>
                </div>

                <FaGreaterThan className="cursor-pointer" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
