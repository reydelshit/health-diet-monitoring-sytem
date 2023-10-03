import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import AddMedicalHistory from './medical-history/AddMedicalHistory';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

type MedicalHistory = {
  medical_id: number;
  medical_title: string;
  medical_desc: string;
  medical_date: string;
};

export default function MedicalHistory() {
  const [medicalHistoryDecider, setMedicalHistoryDecider] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>([]);

  const fetchMedicalHistory = () => {
    axios
      .get('http://localhost/hd-monitoring/medical.php', {
        params: {
          medical_id: 0,
          user_id: localStorage.getItem('token') as unknown as number,
          indicator: 'get-medical-history-by-user-id',
        },
      })
      .then((res) => {
        console.log(res.data);
        setMedicalHistory(res.data);
      });
  };

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  return (
    <div className="py-10 flex justify-center flex-col">
      <span className="block">
        <h1 className="text-3xl font-bold text-[#2b3e54] self-start">
          Medical history
        </h1>
        <p className="text-sm">
          Record of your past health issues, treatments, surgeries, and any
          important health information!
        </p>
      </span>
      <Button
        className="w-[12rem] self-end my-4"
        onClick={() => setMedicalHistoryDecider(true)}
      >
        Add medical history
      </Button>

      {medicalHistoryDecider ? (
        <AddMedicalHistory
          setMedicalHistoryDecider={setMedicalHistoryDecider}
        />
      ) : (
        <div className="grid grid-cols-4 w-full p-2 gap-4">
          {medicalHistory.map((medical, index) => {
            return (
              <Card className="w-[100%] mb-2 break-words" key={index}>
                <CardHeader>
                  <CardTitle className="cursor-pointer">
                    <Link to={`/medical-history/${medical.medical_id}`}>
                      {medical.medical_title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {moment(medical.medical_date).format('LL')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    {medical.medical_desc && medical.medical_desc.slice(0, 80)}
                    ...
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
