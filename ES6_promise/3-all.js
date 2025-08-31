import { uploadPhoto, createUser } from "./utils.js";
// In this file, import uploadPhoto and createUser from utils.js
// Knowing that the functions in utils.js return promises, use the prototype
// below to collectively resolve all promises and log body firstName lastName to the console.
// function handleProfileSignup()
// In the event of an error, log Signup system offline to the console
export default function handleProfileSignup() {
  try {
    Promise.all([uploadPhoto(), createUser()])
      .then((values) => {
        for (let i = 0; i < values.length; i++) {
          const obj = values[i];
          if (obj.firstName && obj.lastName) {
            console.log(obj.firstName, obj.lastName);
            break;
          }
        }
      })
      .catch(() => {
        console.log("Signup system offline");
      });
  } catch (error) {
    console.log(error);
  }
}
// handleProfileSignup();
