import { Separator } from './ui/separator';

export default function Water() {
  return (
    <div className="w-full">
      <div>
        <span className="block py-8">
          <h1 className="font-bold text-3xl">Record Water!</h1>
          <p className="text-sm">
            Start your hydration journey right here. Track your daily water
            intake and stay on top of your hydration goals with our easy-to-use
            water logging form.
          </p>
        </span>
        <Separator />
      </div>
    </div>
  );
}
