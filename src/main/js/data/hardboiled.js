const EXERCISE_LIGHT = [
  {
    title: "thrusters",
    description: "squat then throw kettle bells or similar up in the air while not loosing the grip",
    unit: "dumbbell disc",
    amount: 3,
    series: 3,
    repeats: 14,
    pause: 90
  },
  {
    title: "bulgarian split",
    unit: "dumbbell disc",
    amount: 1,
    series: 3,
    repeats: 14,
    pause: 90
  },
  {
    title: "strake markløft",
    unit: "kg",
    amount: 32.5,
    series: 3,
    repeats: 14,
    pause: 90
  },
  {
    title: "knebøy",
    unit: "kg",
    amount: 30.0,
    series: 3,
    repeats: 14,
    pause: 90
  },
  {
    title: "leg extension",
    description: "the variant where you have the feet on a bench and your hands on the ground",
    unit: "body weight",
    amount: 1,
    series: 3,
    repeats: 14,
    pause: 90
  },
  {
    title: "nedtrekk",
    description: "like chins with a lot of support",
    unit: "body weight",
    amount: 0.2,
    series: 3,
    repeats: 14,
    pause: 90
  },
  {
    title: "brystpress",
    unit: "dumbbell disc",
    amount: 4,
    series: 3,
    repeats: 14,
    pause: 90
  },
  {
    title: "skulderpress",
    unit: "dumbbell disc",
    amount: 2,
    series: 3,
    repeats: 14,
    pause: 90
  }
];

const EXERCISE_MEDIUM = [
  {
    title: "markløft",
    unit: "kg",
    amount: 62.5,
    series: 3,
    repeats: 8,
    pause: 120
  },
  {
    title: "knebøy",
    unit: "kg",
    amount: 50.0,
    series: 3,
    repeats: 8,
    pause: 120
  },
  {
    title: "chins",
    description: "with support from 3mm rubber band",
    unit: "body weight",
    amount: 0.4,
    series: 3,
    repeats: 8,
    pause: 120
  },
  {
    title: "Roing med stang",
    unit: "kg",
    amount: 32.5,
    series: 3,
    repeats: 8,
    pause: 120
  },
  {
    title: "Skrå brystpress med hantler",
    unit: "dumbbell disc",
    amount: 4,
    series: 3,
    repeats: 8,
    pause: 120
  },
  {
    title: "Sidehev med hantler",
    unit: "dumbbell disc",
    amount: 2,
    series: 3,
    repeats: 8,
    pause: 120
  }
];

const EXERCISE_HEAVY = [
  {
    title: "frontbøy",
    unit: "kg",
    amount: 50.0,
    series: 3,
    repeats: 5,
    pause: 150
  },
  {
    title: "markløft",
    unit: "kg",
    amount: 70.0,
    series: 3,
    repeats: 5,
    pause: 150
  },
  {
    title: "benkpress",
    unit: "kg",
    amount: 50.0,
    series: 3,
    repeats: 5,
    pause: 150
  },
  {
    title: "roing med hantel",
    unit: "dumbbell disc",
    amount: 7,
    series: 3,
    repeats: 5,
    pause: 150
  },
  {
    title: "Skulderpress med hantler",
    unit: "dumbbell disc",
    amount: 4,
    series: 3,
    repeats: 5,
    pause: 150
  }
];

const WORKOUT = {
  lett: EXERCISE_LIGHT,
  medium: EXERCISE_MEDIUM,
  tung:  EXERCISE_HEAVY
};

export default WORKOUT
