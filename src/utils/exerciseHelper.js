// src/utils/exerciseHelper.js

import exercises from '../assets/data/exercises';

export const getExercisesByIds = exerciseIds => {
  if (!exerciseIds || !Array.isArray(exerciseIds)) {
    return [];
  }
  return exerciseIds
    .map(id => exercises[id])
    .filter(exercise => exercise !== undefined);
};

export const calculateTotalDuration = exerciseIds => {
  const exerciseList = getExercisesByIds(exerciseIds);
  let totalSeconds = 0;

  exerciseList.forEach(exercise => {
    if (exercise.type === 'time') {
      totalSeconds += exercise.value;
    } else {
      totalSeconds += exercise.value * 3;
    }
    totalSeconds += 15;
  });

  return Math.ceil(totalSeconds / 60);
};

export const calculateTotalCalories = exerciseIds => {
  const exerciseList = getExercisesByIds(exerciseIds);
  return exerciseList.reduce(
    (total, exercise) => total + (exercise.calories || 5),
    0,
  );
};

export const getDifficultyColor = difficulty => {
  const colors = {
    beginner: '#4CAF50',
    intermediate: '#FF9800',
    advanced: '#F44336',
  };
  return colors[difficulty] || '#8E8E93';
};

export const formatExerciseValue = (type, value) => {
  if (type === 'time') {
    const mins = Math.floor(value / 60)
      .toString()
      .padStart(2, '0');
    const secs = (value % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
  return `×${value}`;
};
