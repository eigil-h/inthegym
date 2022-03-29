import React from 'react';
import ProgressList from './ProgressList';
import ExerciseDetails from './ExerciseDetails';

const Overview = ({
  exercises,
  exerciseIndex,
  steps,
  stepIndex
}) => {
  return (
    <>
      <ProgressList
        elements={exercises}
        activeIndex={exerciseIndex}
      />
      <ExerciseDetails exercise={exercises[exerciseIndex]} />
      <ProgressList
        elements={steps}
        activeIndex={stepIndex}
      />
    </>
  );
};

export default Overview;
