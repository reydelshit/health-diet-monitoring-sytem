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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import BarChartWeight from './profile-overview/WeightHeightChanges';

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
          user_id: localStorage.getItem('token') as unknown as number,
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
    <div className="flex justify-center flex-col pl-[5rem]">
      <div className="pt-10 pb-5 flex justify-between items-center">
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
      </div>

      <Separator />

      {medicalHistoryDecider ? (
        <AddMedicalHistory
          setMedicalHistoryDecider={setMedicalHistoryDecider}
        />
      ) : (
        <div className="p-2 grid place-content-center mt-10 ">
          <Table className="block w-fit border-2 rounded-md">
            <TableCaption>A list of your medical history.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-black">Title</TableHead>
                <TableHead className="font-bold text-black">
                  Description
                </TableHead>
                <TableHead className="font-bold text-black">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className=" w-full">
              {medicalHistory.map((medical, index) => {
                return (
                  <TableRow className="w-full" key={index}>
                    <TableCell>
                      <Link
                        className="font-medium"
                        to={`/medical-history/${medical.medical_id}`}
                      >
                        {medical.medical_title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {medical.medical_desc &&
                        medical.medical_desc.slice(0, 60)}
                      ...
                    </TableCell>
                    <TableCell className="font-medium">
                      {moment(medical.medical_date).format('LL')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
