// Create a function named cleanSet that returns a string of all the set values
// that start with a specific string (startString).

// It accepts two arguments: a set (Set) and a startString (String).

// When a value starts with startString you only append the rest of the string.
// The string contains all the values of the set separated by -. 

const cleanSet = (mySet, startString) => {
  if (typeof startString !== "string") {
    throw new TypeError("Invalid separator string argument");
  }
  if (!(mySet instanceof Set)) {
    throw new TypeError("Invalid set argument");
  }
  if (startString === '') return '';
  let strinfigiedSet = '';
  mySet.forEach(el => {
    if (el.startsWith(startString)) {
      strinfigiedSet += el + ',';
    }
  });
  const splittedStringifiedSetArray = strinfigiedSet.split(startString);
  const joinedSplittedStringifiedSetArrayString = splittedStringifiedSetArray.join("-");
  const unseparattedJoinedSplittedStringifiedSetArrayString = joinedSplittedStringifiedSetArrayString.replace(/(^-|-$|,|-,$)/g, '');
  const uncommatedUnseparattedJoinedSplittedStringifiedSetArrayString = unseparattedJoinedSplittedStringifiedSetArrayString.replace(/,+/g, '-');
  const collapsedUncommatedUnseparattedJoinedSplittedStringifiedSetArrayString = uncommatedUnseparattedJoinedSplittedStringifiedSetArrayString.replace(/--+/g, '-');
  return collapsedUncommatedUnseparattedJoinedSplittedStringifiedSetArrayString;
};

export default cleanSet;

console.log(cleanSet(new Set(['bonjovi', 'bonaparte', 'bonappetit', 'banana']), 'bon'));
console.log(cleanSet(new Set(['bonjovi', 'bonaparte', 'bonappetit', 'banana']), ''));