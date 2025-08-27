// Create a function named setFromArray that returns a Set from an array.
// It accepts an argument (Array, of any kind of element).
const setFromArray = (myArr) => {
  if (!Array.isArray(myArr)) {
    throw new TypeError("Invalid argument type");
  }
  try {
    const mySet = new Set(myArr);
    return mySet;
  } catch (error) {
    console.log("Couldnt convert to set: " + error);
    return new Set([]);
  }
};
export default setFromArray;
