export function taskFirst() {
  const task = 'I prefer const when I can. ';
  return task;
}
export function getLast() { return ' is okay'; }

export function taskNext() {
  // eslint-disable-next-line prefer-const
  let combination = 'But sometimes let';
  return `${combination}${getLast()}`;
}

// console.log(`${taskFirst()}${taskNext()}`);
