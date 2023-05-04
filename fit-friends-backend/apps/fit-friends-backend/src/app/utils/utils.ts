
export const getRandomInteger = (a = 1, b = 10) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElementOfArray = (array) => array[getRandomInteger(0, array.length - 1)];
