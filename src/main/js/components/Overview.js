import React from 'react';
import ProgressList, { PROGRESS_TYPE } from './ProgressList';
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
        progressType={PROGRESS_TYPE.EXERCISE}
        elements={exercises}
        activeIndex={exerciseIndex}
      />
      <ExerciseDetails exercise={exercises[exerciseIndex]} />
      <ProgressList
        progressType={PROGRESS_TYPE.STEP}
        elements={steps}
        activeIndex={stepIndex}
      />
    </>
  );
};

export default Overview;
