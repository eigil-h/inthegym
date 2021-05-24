const WORKOUT_LIGHT = [
  {
    title: "thrusters",
    description: "squat then throw kettle bells or similar up in the air while not loosing the grip",
    unit: "skiver",
    amount: 3,
    series: 3,
    repeats: 14,
    pause: 90
  },
  {
    title: "bulgarian split",
    unit: "skiver",
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
    unit: "skiver",
    amount: 4,
    series: 3,
    repeats: 14,
    pause: 90
  },
  {
    title: "skulderpress",
    unit: "skiver",
    amount: 2,
    series: 3,
    repeats: 14,
    pause: 90
  }
];

const WORKOUT_MEDIUM = [
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
    unit: "skiver",
    amount: 4,
    series: 3,
    repeats: 8,
    pause: 120
  },
  {
    title: "Sidehev med hantler",
    unit: "skiver",
    amount: 2,
    series: 3,
    repeats: 8,
    pause: 120
  }
];

const WORKOUT_HEAVY = [
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
    unit: "skiver",
    amount: 7,
    series: 3,
    repeats: 5,
    pause: 150
  },
  {
    title: "Skulderpress med hantler",
    unit: "skiver",
    amount: 4,
    series: 3,
    repeats: 5,
    pause: 150
  }
];

const WORKOUT_LIGHT_REDUCED = [
  {
    title: "thrusters",
    description: "squat then throw kettle bells or similar up in the air while not loosing the grip",
    unit: "skiver",
    amount: 2,
    series: 3,
    repeats: 14,
    pause: 90
  },
  {
    title: "bulgarian split",
    unit: "skiver",
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
    title: "grunne knebøy",
    description: 'ikke gå helt ned',
    unit: "kg",
    amount: 20.0,
    series: 3,
    repeats: 10,
    pause: 90
  },
  {
    title: "brystpress, 3 minutes super slow",
    description: "note - time rather than repeats is not yet supported by the app",
    unit: "skiver",
    amount: 1,
    series: 2,
    repeats: 0,
    pause: 30
  },
  {
    title: "skulderpress, 3 minutes super slow",
    description: "note - time rather than repeats is not yet supported by the app",
    unit: "skiver",
    amount: 1,
    series: 2,
    repeats: 0,
    pause: 30
  }
];

const WORKOUT_MEDIUM_REDUCED = [
  {
    title: "markløft",
    unit: "kg",
    amount: 60.0,
    series: 3,
    repeats: 8,
    pause: 120
  },
  {
    title: "knebøy",
    unit: "kg",
    amount: 45.0,
    series: 3,
    repeats: 8,
    pause: 120
  },
  {
    title: "skrå push up, super slow",
    description: "bruk stang",
    unit: "body",
    amount: 1,
    series: 2,
    repeats: 0,
    pause: 30
  },
  {
    title: "Skrå brystpress med hantler, super slow",
    unit: "skiver",
    amount: 1,
    series: 2,
    repeats: 0,
    pause: 30
  },
  {
    title: "Skrå sidehev med discs",
    unit: "kg",
    amount: 2.5,
    series: 2,
    repeats: 0,
    pause: 30
  }
];

const WORKOUT_HEAVY_REDUCED = [
  {
    title: "frontbøy",
    unit: "kg",
    amount: 47.5,
    series: 3,
    repeats: 5,
    pause: 150
  },
  {
    title: "markløft",
    unit: "kg",
    amount: 72.5,
    series: 3,
    repeats: 5,
    pause: 150
  },
  {
    title: "chins, superslow",
    unit: "upper body somehow",
    amount: 1,
    series: 2,
    repeats: 0,
    pause: 30
  },
  {
    title: "brystpress, superslow",
    description: "note - time rather than repeats is not yet supported by the app",
    unit: "skiver",
    amount: 1,
    series: 2,
    repeats: 0,
    pause: 30
  },
  {
    title: "roing med hantel, superslow",
    unit: "skiver",
    amount: 3,
    series: 2,
    repeats: 0,
    pause: 30
  }
];

const WORKOUT = {
  lett: WORKOUT_LIGHT,
  medium: WORKOUT_MEDIUM,
  tung:  WORKOUT_HEAVY,
  'lett redusert': WORKOUT_LIGHT_REDUCED,
  'medium redusert': WORKOUT_MEDIUM_REDUCED,
  'tung redusert': WORKOUT_HEAVY_REDUCED
};

export default WORKOUT
