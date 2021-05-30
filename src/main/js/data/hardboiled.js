const WORKOUT_LIGHT = [
  {
    title: "thrusters",
    description: "squat then throw kettle bells or similar up in the air while not loosing the grip",
    load: {
      unit: "skiver",
      amount: 3,
      increase: 1
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 14
    },
    pause: 90
  },
  {
    title: "bulgarian split",
    load: {
      unit: "skiver",
      amount: 1,
      increase: 1
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 14
    },
    pause: 90
  },
  {
    title: "strake markløft",
    load: {
      unit: "kg",
      amount: 32.5,
      increase: 2.5
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 14
    },
    pause: 90
  },
  {
    title: "knebøy",
    load: {
      unit: "kg",
      amount: 30.0,
      increase: 2.5
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 14
    },
    pause: 90
  },
  {
    title: "leg extension",
    description: "the variant where you have the feet on a bench and your hands on the ground",
    load: {
      unit: "body weight",
      amount: 1
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 14
    },
    pause: 90
  },
  {
    title: "nedtrekk",
    description: "like chins with a lot of support",
    load: {
      unit: "body weight",
      amount: 0.2,
      increase: 0.1
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 14
    },
    pause: 90
  },
  {
    title: "brystpress",
    load: {
      unit: "skiver",
      amount: 4,
      increase: 1
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 14
    },
    pause: 90
  },
  {
    title: "skulderpress",
    load: {
      unit: "skiver",
      amount: 2,
      increase: 1
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 14
    },
    pause: 90
  }
];

const WORKOUT_MEDIUM = [
  {
    title: "markløft",
    load: {
      unit: "kg",
      amount: 62.5,
      increase: 2.5
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 8
    },
    pause: 120
  },
  {
    title: "knebøy",
    load: {
      unit: "kg",
      amount: 50.0,
      increase: 2.5
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 8
    },
    pause: 120
  },
  {
    title: "chins",
    description: "with support from 3mm rubber band",
    load: {
      unit: "body weight",
      amount: 0.4,
      increase: 0.1
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 8
    },
    pause: 120
  },
  {
    title: "Roing med stang",
    load: {
      unit: "kg",
      amount: 32.5,
      increase: 2.5
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 8
    },
    pause: 120
  },
  {
    title: "Skrå brystpress med hantler",
    load: {
      unit: "skiver",
      amount: 4,
      increase: 1
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 8
    },
    pause: 120
  },
  {
    title: "Sidehev med hantler",
    load: {
      unit: "skiver",
      amount: 2,
      increase: 1
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 8
    },
    pause: 120
  }
];

const WORKOUT_HEAVY = [
  {
    title: "frontbøy",
    load: {
      unit: "kg",
      amount: 50.0,
      increase: 2.5
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 5
    },
    pause: 150
  },
  {
    title: "markløft",
    load: {
      unit: "kg",
      amount: 70.0,
      increase: 2.5
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 5
    },
    pause: 150
  },
  {
    title: "benkpress",
    load: {
      unit: "kg",
      amount: 50.0,
      increase: 2.5
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 5
    },
    pause: 150
  },
  {
    title: "roing med hantel",
    load: {
      unit: "skiver",
      amount: 7,
      increase: 1
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 5
    },
    pause: 150
  },
  {
    title: "Skulderpress med hantler",
    load: {
      unit: "skiver",
      amount: 4,
      increase: 1
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 5
    },
    pause: 150
  }
];

const WORKOUT_LIGHT_REDUCED = [
  {
    title: "thrusters",
    description: "squat then throw kettle bells or similar up in the air while not loosing the grip",
    load: {
      unit: "skiver",
      amount: 2,
      increase: 1
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 14
    },
    pause: 90
  },
  {
    title: "bulgarian split",
    load: {
      unit: "skiver",
      amount: 1,
      increase: 1
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 14
    },
    pause: 90
  },
  {
    title: "strake markløft",
    load: {
      unit: "kg",
      amount: 35.0,
      increase: 2.5
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 14
    },
    pause: 90
  },
  {
    title: "grunne knebøy",
    description: 'ikke gå helt ned',
    load: {
      unit: "kg",
      amount: 20.0,
      increase: 2.5
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 12
    },
    pause: 90
  },
  {
    title: "brystpress, 3 minutes super slow",
    description: "note - time rather than repeats is not yet supported by the app",
    load: {
      unit: "skiver",
      amount: 1,
      increase: 1
    },
    series: 2,
    execution: {
      unit: 'time',
      amount: 180
    },
    pause: 30
  },
  {
    title: "skulderpress, 3 minutes super slow",
    description: "note - time rather than repeats is not yet supported by the app",
    load: {
      unit: "skiver",
      amount: 1,
      increase: 1
    },
    series: 2,
    execution: {
      unit: 'time',
      amount: 180
    },
    pause: 30
  }
];

const WORKOUT_MEDIUM_REDUCED = [
  {
    title: "markløft",
    load: {
      unit: "kg",
      amount: 62.5,
      increase: 2.5
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 8
    },
    pause: 120
  },
  {
    title: "knebøy",
    load: {
      unit: "kg",
      amount: 45.0,
      increase: 2.5
    },
    series: 3,
    execution: {
      unit: 'repeats',
      amount: 8
    },
    pause: 120
  },
  {
    title: "skrå push up, super slow",
    description: "bruk stang",
    load: {
      unit: "body",
      amount: 1
    },
    series: 2,
    execution: {
      unit: 'time',
      amount: 180
    },
    pause: 30
  },
  {
    title: "Skrå brystpress med hantler, super slow",
    load: {
      unit: "skiver",
      amount: 1,
      increase: 1
    },
    series: 2,
    repeats: 0,
    execution: {
      unit: 'time',
      amount: 180
    },
    pause: 30
  },
  {
    title: "Skrå sidehev med discs",
    load: {
      unit: "kg",
      amount: 1.25
    },
    series: 2,
    repeats: 0,
    execution: {
      unit: 'time',
      amount: 180
    },
    pause: 30
  }
];

const WORKOUT_HEAVY_REDUCED = [
  {
    title: "frontbøy",
    load: {
      unit: "kg",
      amount: 47.5,
      increase: 2.5
    },
    series: 3,
    repeats: 5,
    execution: {
      unit: 'repeats',
      amount: 5
    },
    pause: 150
  },
  {
    title: "markløft",
    load: {
      unit: "kg",
      amount: 72.5,
      increase: 2.5
    },
    series: 3,
    repeats: 5,
    execution: {
      unit: 'repeats',
      amount: 5
    },
    pause: 150
  },
  {
    title: "chins, superslow",
    load: {
      unit: "upper body somehow",
      amount: 1
    },
    series: 2,
    repeats: 0,
    execution: {
      unit: 'time',
      amount: 180
    },
    pause: 30
  },
  {
    title: "brystpress, superslow",
    description: "note - time rather than repeats is not yet supported by the app",
    load: {
      unit: "skiver",
      amount: 1,
      increase: 1
    },
    series: 2,
    repeats: 0,
    execution: {
      unit: 'time',
      amount: 180
    },
    pause: 30
  },
  {
    title: "roing med hantel, superslow",
    load: {
      unit: "skiver",
      amount: 1,
      increase: 1
    },
    series: 2,
    repeats: 0,
    execution: {
      unit: 'time',
      amount: 180
    },
    pause: 30
  }
];

const WORKOUT = {
  lett: WORKOUT_LIGHT,
  medium: WORKOUT_MEDIUM,
  tung:  WORKOUT_HEAVY,
  'lett m ss': WORKOUT_LIGHT_REDUCED,
  'medium m ss': WORKOUT_MEDIUM_REDUCED,
  'tung m ss': WORKOUT_HEAVY_REDUCED
};

export default WORKOUT
