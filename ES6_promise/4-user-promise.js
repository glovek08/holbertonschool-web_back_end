// Using the following prototype
// function signUpUser(firstName, lastName) {}
// That returns a resolved promise with this object:
// {
//   firstName: value,
//   lastName: value,
// }
export default function signUpUser(firstName, lastName) {
  const myPromise = new Promise((resolve, reject) => {
    resolve({
      firstName,
      lastName
    });
    reject(new Error("The fake API is not working currently"));
  });
  return myPromise;
}

// console.log(signUpUser("Bob", "Dylan"));
