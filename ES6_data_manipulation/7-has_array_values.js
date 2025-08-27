// Create a function named hasValuesFromArray that returns a boolean if all the elements in the array exist within the set.
// It accepts two arguments: a set (Set) and an array (Array).
const hasValuesFromArray = (controlSet, myArray) => {
  if (!Array.isArray(myArray) || !(controlSet instanceof Set)) {
    throw new TypeError("Invalid argument type");
  }
//   let isInSet = true;
//   for (let i = 0; i < myArray.length; i++) {
//     if (!controlSet.has(myArray[i])) {
//         isInSet = false;
//         break;
//     }
//   }

  const isInArray = (el) => controlSet.has(el);
  return myArray.every(isInArray);
};
export default hasValuesFromArray;
