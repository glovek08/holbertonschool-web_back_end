/* eslint-disable */
export default function taskBlock(trueOrFalse) {
  const task = false;
  const task2 = true;

  if (trueOrFalse) {
    const taskInside = true;
    const task2Inside = false;
  }

  return [task, task2];
}
/* eslint-enable */
