const getNeighborgoodsList = () => {
  this.sanFranciscoNeighborhoods = ['SOMA', 'Union Square'];
  const add = (newNeighborhood) => {
    this.sanFranciscoNeighborhoods.push(newNeighborhood);
    return this.sanFranciscoNeighborhoods;
  }
  this.addNeighborhood = add;
};

export default getNeighborgoodsList;
