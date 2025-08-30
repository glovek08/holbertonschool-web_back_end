export default function handleResponseFromAPI(promise) {
  console.log("Got a repsonse from the API");
  return promise.then(handleFullfilled, handleRejected);
  function handleFullfilled() {
    return {
      status: 200,
      body: "success"
    };
  }
  function handleRejected() {
    return new Error();
  }
}
