import { useParams } from 'react-router-dom';
import { Separator } from './ui/separator';

type DietPlanBasedOnBMIAndGender = {};

export const metadata = {
  title: 'Health Suggestions',
  description:
    'Your health suggestion, based on your BMI, will be displayed here.',
};

const dietPlanBasedOnBMIAndGender = [
  {
    category: 'Underweight',
    BMIRange: {
      minBMI: 0,
      maxBMI: 18.4,
    },
    genderBased: [
      {
        gender: 'Male',
        goals: 'Gain healthy weight',
        recommendations: [
          'Increase calorie intake through nutritious foods',
          'Include protein-rich foods like lean meats, beans, and dairy',
          'Incorporate healthy fats such as nuts, avocados, and olive oil',
        ],
      },
      {
        gender: 'Female',
        goals: 'Gain healthy weight',
        recommendations: [
          'Increase calorie intake through nutritious foods',
          'Include protein-rich foods like lean meats, beans, and dairy',
          'Incorporate healthy fats such as nuts, avocados, and olive oil',
          'Consider consulting with a healthcare professional for personalized advice',
        ],
      },
    ],
    foodRecommendations: [
      'Aim to incorporate a variety of fruits and vegetables to increase nutrient intake.',
      'Opt for energy-dense fruits and vegetables such as avocados, bananas, and potatoes.',
      'Consider smoothies and shakes with fruits, vegetables, and healthy fats for extra calories.',
    ],
  },
  {
    category: 'Normal Weight',
    BMIRange: {
      minBMI: 18.5,
      maxBMI: 24.9,
    },
    genderBased: [
      {
        gender: 'Male',

        recommendations: [
          'Consume a balanced diet with plenty of fruits and vegetables',
          'Include lean proteins and whole grains',
          'Moderate portion sizes to maintain weight',
        ],
      },
      {
        gender: 'Female',

        recommendations: [
          'Consume a balanced diet with plenty of fruits and vegetables',
          'Include lean proteins and whole grains',
          'Moderate portion sizes to maintain weight',
          'Consider calcium and iron intake for overall health',
        ],
      },
    ],
    foodRecommendations: [
      'Continue to consume a wide range of fruits and vegetables to maintain overall health.',
      'Focus on a variety of colorful fruits and vegetables to get a spectrum of nutrients.',
      'Consume a mix of raw and cooked vegetables for different textures and flavors.',
    ],
  },
  {
    category: 'Overweight',
    BMIRange: {
      minBMI: 25,
      maxBMI: 29.9,
    },
    genderBased: [
      {
        gender: 'Male',

        recommendations: [
          'Create a calorie deficit by reducing calorie intake and increasing physical activity',
          'Focus on whole, nutrient-dense foods',
          'Limit processed and sugary foods',
        ],
      },
      {
        gender: 'Female',

        recommendations: [
          'Create a calorie deficit by reducing calorie intake and increasing physical activity',
          'Focus on whole, nutrient-dense foods',
          'Limit processed and sugary foods',
          'Consult with a healthcare professional or dietitian for personalized guidance',
        ],
      },
    ],
    foodRecommendations: [
      'Emphasize lower-calorie and high-fiber vegetables in your diet.',
      'Opt for fruits with lower sugar content and consume them in moderation.',
      'Use fruits and vegetables as healthy snacks to replace processed snacks.',
    ],
  },
  {
    category: 'Obese',
    BMIRange: {
      minBMI: 30,
      maxBMI: Infinity,
    },
    genderBased: [
      {
        gender: 'Male',

        recommendations: [
          'Consult a healthcare professional or dietitian for a personalized plan',
          'Emphasize gradual and sustainable weight loss',
          'Incorporate regular physical activity into your routine',
        ],
      },
      {
        gender: 'Female',
        recommendations: [
          'Consult a healthcare professional or dietitian for a personalized plan',
          'Emphasize gradual and sustainable weight loss',
          'Incorporate regular physical activity into your routine',
        ],
      },
    ],
    foodRecommendations: [
      'Prioritize non-starchy vegetables and limit high-calorie fruits.',
      'Control portion sizes of fruits to manage calorie intake.',
      'Use fruits as natural sweeteners for recipes in place of added sugars.',
    ],
  },
];

export default function Suggestion() {
  const { bmi } = useParams() as any;

  console.log(bmi);

  return (
    <div className="w-full pl-[5rem]">
      <div>
        <span className="block py-8">
          <h1 className="font-bold text-3xl">{metadata.title}</h1>
          <p className="text-sm">{metadata.description}</p>
        </span>
        <Separator />
      </div>

      <div>
        <h1 className="font-bold text-2xl">
          Diet Recommendation and Suggestions
        </h1>
        <div className="flex flex-col">
          {dietPlanBasedOnBMIAndGender
            .find(
              (diet) =>
                diet.BMIRange.minBMI <= bmi && diet.BMIRange.maxBMI >= bmi,
            )
            ?.foodRecommendations.map((recommendation) => (
              <h1 className="font-bold bg-white p-2 border-2 mb-2 rounded-md">
                {recommendation}
              </h1>
            ))}
        </div>
      </div>
    </div>
  );
}
