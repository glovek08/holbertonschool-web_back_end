// Create a function named groceriesList that returns a map of groceries with the following items (name, quantity):
// Apples, 10
// Tomatoes, 10
// Pasta, 1
// Rice, 1
// Banana, 5
const groceriesList = () => {
  const myGroceries = new Map();
  const itemNames = ["Apples", "Tomatoes", "Pasta", "Rice", "Banana"];
  const itemAmount = [10, 10, 1, 1, 5];
  for (const [i, item] of itemNames.entries()) {
    myGroceries.set(item, itemAmount[i]);
  }
  console.log(myGroceries);
};


groceriesList();
export default groceriesList;
