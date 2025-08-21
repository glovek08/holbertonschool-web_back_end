const getNeighborgoodsList = () => {
  this.sanFranciscoNeighborhoods = ['SOMA', 'Union Square'];
  const self = this;
  const add = (newNeighborhood) => {
    self.sanFranciscoNeighborhoods.push(newNeighborhood);
    return self.sanFranciscoNeighborhoods;
  }
  this.addNeighborhood = add;
};

export default getNeighborgoodsList;
