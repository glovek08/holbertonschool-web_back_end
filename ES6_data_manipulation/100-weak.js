// Export a const instance of WeakMap and name it weakMap.
// Export a new function named queryAPI. It should accept an endpoint argument like so:
//   {
//     protocol: 'http',
//     name: 'getUsers',
//   }
// Track within the weakMap the number of times queryAPI is called for each endpoint.
// When the number of queries is >= 5 throw an error with the message Endpoint load is high.

export const weakMap = new WeakMap();

export const queryAPI = (endpointObj) => {
  //   console.log(endpointObj);
  if (!(endpointObj.hasOwnProperty("protocol") && endpointObj.hasOwnProperty("name"))) {
    throw new Error("Incorrect endpoint format");
  }
  const keys = Object.keys(endpointObj);
  if (keys.length !== 2) {
    throw new Error("You can't do that boy");
  }
  if (weakMap.has(endpointObj)) {
    let callCounter = weakMap.get(endpointObj);
    callCounter += 1;
    weakMap.set(endpointObj, callCounter);

    if (callCounter >= 5) {
      throw new Error("Endpoint load is high");
    }
  } else {
    weakMap.set(endpointObj, 1);
  }
};
