import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

export default function CalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="w-[25rem] justify-center flex items-center">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
}
