// Create a function named hasValuesFromArray that returns a boolean if all the elements in the array exist within the set.
// It accepts two arguments: a set (Set) and an array (Array).
const hasValuesFromArray = (controlSet, myArray) => {
  if (!Array.isArray(myArray) || !(controlSet instanceof Set)) {
    throw new TypeError("Invalid argument type");
  }
  let isInSet = true;
  myArray.forEach((el) => {
    if (controlSet.has(el)) {
      return;
    } else {
      isInSet = false;
      return;
    }
  });
  return isInSet;
};
export default hasValuesFromArray;
