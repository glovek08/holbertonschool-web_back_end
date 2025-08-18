export const taskFirst = () => {
  const task = 'I prefer const when I can. ';
  return task;
};
export const getLast = () => ' is okay';

export const taskNext = () => {
  // eslint-disable-next-line prefer-const
  let combination = 'But sometimes let';
  return `${combination}${getLast()}`;
};

console.log(`${taskFirst()}${taskNext()}`);
