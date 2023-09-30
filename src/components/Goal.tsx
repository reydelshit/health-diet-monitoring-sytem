import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Goal() {
  return (
    <div className="w-full flex justify-center p-2">
      <form className="flex flex-col w-[40%] mt-[5rem]">
        <Label
          className="pb-2 text-gray-500 dark:text-[#9b7366] pl-2"
          htmlFor="goalType"
        >
          Goal Type
        </Label>
        <div className="mb-4 ">
          <Select required name="goalType">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Goal Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Weight Loss">Weight Loss</SelectItem>
              <SelectItem value="Calorie Intake">Calorie Intake</SelectItem>
              <SelectItem value="Hydration">Hydration</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          name="target"
          className="mb-4"
          type="text"
          placeholder="Target (e.g., 10 pounds, 5 miles)"
        />

        <Label
          className="pb-4 text-gray-500 dark:text-[#9b7366] pl-2"
          htmlFor="description"
        >
          Description (Optional)
        </Label>
        <Textarea
          name="description"
          className="mb-4"
          placeholder="Describe your goal (optional)"
        />

        <Label
          className="pb-4 text-gray-500 dark:text-[#9b7366] pl-2"
          htmlFor="targetDate"
        >
          Target Date
        </Label>
        <Input
          name="targetDate"
          className="mb-4"
          type="date"
          placeholder="Select a target date"
        />

        <Button className="w-[50%] self-center">Set Goal</Button>
      </form>
    </div>
  );
}
