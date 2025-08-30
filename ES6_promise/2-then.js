export default function handleResponseFromAPI(promise) {
  promise.then(handleFullfilled, handleRejected);
  console.log("Got a repsonse from the API");
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
