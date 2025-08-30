export default function handleResponseFromAPI(promise) {
  return promise
    .then(handleFullfilled, handleRejected)
    .finally(() => {
      console.log("Got a response from the API");
    });

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
