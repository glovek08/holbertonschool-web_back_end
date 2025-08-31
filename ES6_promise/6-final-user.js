// Import signUpUser from 4-user-promise.js and uploadPhoto from 5-photo-reject.js.
// Write and export a function named handleProfileSignup.
// It should accept three arguments firstName (string), lastName (string), and fileName (string).
// The function should call the two other functions.
// When the promises are all settled it should return an array with the following structure:
// [
//     {
//       status: status_of_the_promise,
//       value: value or error returned by the Promise
//     },
//     ...
//   ]

import signUpUser from "./4-user-promise.js";
import uploadPhoto from "./5-photo-reject.js";

export default async function handleProfileSignup(
  firstName,
  lastName,
  fileName
) {
  const userPromise = signUpUser(firstName, lastName);
  const photoPromise = uploadPhoto(fileName);

  const results = (
    await Promise.allSettled([userPromise, photoPromise])
  ).map((res) =>
    res.status === "fulfilled"
      ? res
      : { status: res.status, value: res.reason.toString() }
  );

  return results;
}

// handleProfileSignup("Bob", "Dylan", "bob_dylan.jpg").then((results) =>
//   console.log(results)
// );
