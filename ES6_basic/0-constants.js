// export function taskFirst() {
//   var task = 'I prefer const when I can.';
//   return task;
// }

// export function getLast() {
//   return ' is okay';
// }

// export function taskNext() {
//   var combination = 'But sometimes let';
//   combination += getLast();

//   return combination;
// }
export const taskFirst = () => {
  const task = 'I prefer const when I can. ';
  return task;
};
export const getLast = () => ' is okay';

export const taskNext = () => {
  let combination = 'But sometimes let';
  return `${combination}${getLast()}`;
};

console.log(`${taskFirst()}${taskNext()}`);
