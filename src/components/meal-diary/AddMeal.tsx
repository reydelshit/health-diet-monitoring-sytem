import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function AddMeal({
  handleSubmit,
  handleChange,
  setAddMealDecider,
}: {
  handleSubmit: any;
  handleChange: any;
  setAddMealDecider: (value: boolean) => void;
}) {
  return (
    <div className="border-2 w-[100%] p-5 flex justify-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-[30%]"
      >
        <Input
          placeholder="Meal Name"
          name="meal_name"
          className="mb-2"
          onChange={handleChange}
        />
        <Input
          placeholder="Meal Time"
          name="meal_time"
          className="mb-2"
          onChange={handleChange}
        />

        <Input
          type="text"
          placeholder="Enter calorie"
          name="calorie"
          className="mb-2"
          onChange={handleChange}
        />

        <Input
          type="text"
          placeholder="Enter nutri information"
          name="nutriInfo"
          className="mb-2"
          onChange={handleChange}
        />

        <div>
          <Button className=" self-center mr-2" type="submit">
            Save
          </Button>
          <Button
            onClick={() => setAddMealDecider(false)}
            className=" self-center"
            type="submit"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
