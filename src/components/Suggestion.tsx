import { useParams } from 'react-router-dom';
import { Separator } from './ui/separator';

export const metadata = {
  title: 'Health Suggestions',
  description:
    'Your health suggestion, based on your BMI, will be displayed here.',
};

const healthPlans = [
  {
    category: 'Underweight',
    BMIRange: {
      minBMI: 0,
      maxBMI: 18.4,
    },
    recommendations: [
      'Increase calorie intake through nutritious foods',
      'Include protein-rich foods like lean meats, beans, and dairy',
      'Incorporate healthy fats such as nuts, avocados, and olive oil',
      'Consider consulting with a healthcare professional for personalized advice',
    ],
    foodRecommendations: [
      'Aim to incorporate a variety of fruits and vegetables to increase nutrient intake.',
      'Opt for energy-dense fruits and vegetables such as avocados, bananas, and potatoes.',
      'Consider smoothies and shakes with fruits, vegetables, and healthy fats for extra calories.',
    ],
    dietPlan: [
      'Breakfast: Scrambled eggs with spinach and whole-grain toast.',
      'Lunch: Quinoa salad with chickpeas, vegetables, and olive oil dressing.',
      'Dinner: Grilled chicken breast with brown rice and steamed broccoli.',
      'Snacks: Greek yogurt with honey and mixed berries, or a handful of nuts.',
    ],
    workoutPlan: [
      'Focus on building lean muscle mass and strength.',
      'Include strength training exercises with light to moderate weights.',
      'Incorporate resistance bands or bodyweight exercises.',
      'Include flexibility exercises to improve mobility.',
    ],
    exampleWorkout: [
      'Bodyweight squats: 3 sets of 12 reps.',
      'Push-ups: 3 sets of 10 reps.',
      'Light dumbbell curls: 3 sets of 12 reps.',
    ],
  },
  {
    category: 'Normal Weight',
    BMIRange: {
      minBMI: 18.5,
      maxBMI: 24.9,
    },
    recommendations: [
      'Consume a balanced diet with plenty of fruits and vegetables',
      'Include lean proteins and whole grains',
      'Moderate portion sizes to maintain weight',
      'Consider calcium and iron intake for overall health',
    ],
    foodRecommendations: [
      'Continue to consume a wide range of fruits and vegetables to maintain overall health.',
      'Focus on a variety of colorful fruits and vegetables to get a spectrum of nutrients.',
      'Consume a mix of raw and cooked vegetables for different textures and flavors.',
    ],
    dietPlan: [
      'Breakfast: Oatmeal topped with sliced bananas and a sprinkle of chia seeds.',
      'Lunch: Grilled salmon with a side of quinoa and roasted vegetables.',
      'Dinner: Stir-fried tofu with mixed vegetables and brown rice.',
      'Snacks: Sliced apples with almond butter, or carrot sticks with hummus.',
    ],
    workoutPlan: [
      'Maintain overall fitness and health.',
      'Engage in a balanced workout routine.',
      'Include both cardiovascular and strength training exercises.',
      'Incorporate stretching for flexibility.',
    ],
    exampleWorkout: [
      '30 minutes of brisk walking or jogging.',
      'Strength training: Dumbbell lunges, planks, and bicep curls.',
    ],
  },
  {
    category: 'Overweight',
    BMIRange: {
      minBMI: 25,
      maxBMI: 29.9,
    },
    recommendations: [
      'Create a calorie deficit by reducing calorie intake and increasing physical activity',
      'Focus on whole, nutrient-dense foods',
      'Limit processed and sugary foods',
      'Consult with a healthcare professional or dietitian for personalized guidance',
    ],
    foodRecommendations: [
      'Emphasize lower-calorie and high-fiber vegetables in your diet.',
      'Opt for fruits with lower sugar content and consume them in moderation.',
      'Use fruits and vegetables as healthy snacks to replace processed snacks.',
    ],
    dietPlan: [
      'Breakfast: Greek yogurt with granola and fresh berries.',
      'Lunch: Turkey and avocado sandwich on whole-grain bread with a side salad.',
      'Dinner: Baked cod with quinoa and steamed asparagus.',
      'Snacks: Sliced cucumber with a light dip, or a small handful of mixed nuts.',
    ],
    workoutPlan: [
      'Focus on weight loss and cardiovascular health.',
      'Incorporate regular cardiovascular exercise to burn calories.',
      'Include strength training to build muscle and boost metabolism.',

      'Include flexibility exercises for mobility and injury prevention.',
    ],
    exampleWorkout: [
      '45 minutes of brisk walking, cycling, or swimming.',
      'Strength training: Bodyweight squats, push-ups, and resistance band exercises.',
    ],
  },
  {
    category: 'Obese',
    BMIRange: {
      minBMI: 30,
      maxBMI: Infinity,
    },
    recommendations: [
      'Consult a healthcare professional or dietitian for a personalized plan',
      'Emphasize gradual and sustainable weight loss',
      'Incorporate regular physical activity into your routine',
    ],
    foodRecommendations: [
      'Prioritize non-starchy vegetables and limit high-calorie fruits.',
      'Control portion sizes of fruits to manage calorie intake.',
      'Use fruits as natural sweeteners for recipes in place of added sugars.',
    ],
    dietPlan: [
      'Example Breakfast: Veggie omelette with a side of whole-grain toast.',
      'Example Lunch: Grilled chicken and vegetable stir-fry with brown rice.',
      'Example Dinner: Lentil soup with a mixed greens salad and a vinaigrette dressing.',
      'Snacks: Sliced pear with cottage cheese, or air-popped popcorn.',
    ],
    workoutPlan: [
      'Prioritize weight loss and overall health improvement.',
      'Emphasize cardiovascular workouts for calorie burning.',
      'Include strength training to build muscle and enhance metabolism.',
      'Regularly engage in flexibility and mobility exercises.',
    ],
    exampleWorkout: [
      '60 minutes of aerobic exercise like brisk walking, cycling, or elliptical training.',
      'Strength training: Full-body exercises, including squats, deadlifts, and push-ups.',
    ],
  },
];

export default function Suggestion() {
  const { bmi } = useParams() as any;
  const replaceBmi = bmi.toString().replace(/\*/g, '.');
  console.log(replaceBmi);

  return (
    <div className="w-full pl-[5rem]">
      <div>
        <span className="block py-8">
          <h1 className="font-bold text-3xl">{metadata.title}</h1>
          <p className="text-sm">{metadata.description}</p>
        </span>
        <Separator />
      </div>

      <div className="m-4">
        <div className="flex items-center font-bold text-2xl py-2">
          <h1 className="font-bold bg-white p-2 rounded-md">
            {
              healthPlans.find(
                (diet) =>
                  diet.BMIRange.minBMI <= replaceBmi &&
                  diet.BMIRange.maxBMI >= replaceBmi,
              )?.category
            }
          </h1>

          <p className="bg-green-400 p-2 rounded-md">{replaceBmi}</p>
        </div>

        <div className="bg-white rounded-md h-fit my-4 border-2 px-8 py-2">
          {/* <h1 className="font-bold p-2 mb-2 rounded-md">Advice</h1> */}
          {healthPlans
            .find(
              (diet) =>
                diet.BMIRange.minBMI <= replaceBmi &&
                diet.BMIRange.maxBMI >= replaceBmi,
            )
            ?.recommendations.map((recommendation, index) => (
              <div key={index} className="w-fit flex items-center gap-2">
                <span className="font-bold">{index + 1}.</span>
                <h1 className="p-2 mb-2 rounded-md">{recommendation}</h1>
              </div>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border-2 p-2 rounded-md h-fit px-8 py-4">
            <h1 className="font-boldp-2 mb-2 rounded-md font-bold text-2xl">
              Diet Suggestions
            </h1>
            {healthPlans
              .find(
                (diet) =>
                  diet.BMIRange.minBMI <= replaceBmi &&
                  diet.BMIRange.maxBMI >= replaceBmi,
              )
              ?.foodRecommendations.map((recommendation, index) => (
                <div key={index} className="w-fit flex items-center gap-2">
                  <span className="font-bold">{index + 1}.</span>
                  <h1 className="p-2 mb-2 rounded-md">{recommendation}</h1>
                </div>
              ))}

            <div className="p-2 rounded-md ml-2">
              <h1 className="font-boldp-2 mb-2 rounded-md font-bold">
                Examples of what to eat
              </h1>
              {healthPlans
                .find(
                  (diet) =>
                    diet.BMIRange.minBMI <= replaceBmi &&
                    diet.BMIRange.maxBMI >= replaceBmi,
                )
                ?.dietPlan.map((recommendation, index) => (
                  <div key={index} className="w-fit">
                    <h1 className="bg-white p-2 mb-2 rounded-md">
                      {recommendation}
                    </h1>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white p-2 rounded-md h-fit px-8 py-4">
            <h1 className="p-2 mb-2 rounded-md font-bold text-2xl">Workout</h1>
            {healthPlans
              .find(
                (diet) =>
                  diet.BMIRange.minBMI <= replaceBmi &&
                  diet.BMIRange.maxBMI >= replaceBmi,
              )
              ?.workoutPlan.map((recommendation, index) => (
                <div key={index} className="w-fit flex items-center gap-2">
                  <span className="font-bold">{index + 1}.</span>
                  <h1 className="p-2 mb-2 rounded-md">{recommendation}</h1>
                </div>
              ))}

            <div className="p-2 ml-2">
              <h1 className="font-bold">Workout Examples:</h1>
              {healthPlans
                .find(
                  (diet) =>
                    diet.BMIRange.minBMI <= replaceBmi &&
                    diet.BMIRange.maxBMI >= replaceBmi,
                )
                ?.exampleWorkout.map((recommendation, index) => (
                  <div key={index} className="w-fit">
                    <h1 className="p-2 mb-2 rounded-md">{recommendation}</h1>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
