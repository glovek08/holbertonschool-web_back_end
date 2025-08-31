import { uploadPhoto, createUser } from "./utils.js";
// In this file, import uploadPhoto and createUser from utils.js
// Knowing that the functions in utils.js return promises, use the prototype
// below to collectively resolve all promises and log body firstName lastName to the console.
// function handleProfileSignup()
// In the event of an error, log Signup system offline to the console
export default async function handleProfileSignup() {
  try {
    const [photoObj, userObj] = await Promise.all([
      uploadPhoto(),
      createUser()
    ]);

    if (photoObj.body && userObj.firstName && userObj.lastName) {
      console.log(
        `${photoObj.body} ${userObj.firstName} ${userObj.lastName}`
      );
    }
  } catch {
    console.log("Signup system offline");
  }
}
// handleProfileSignup();
