// Import uploadPhoto and createUser from utils.js
// Write an async function named asyncUploadUser that will call these two functions and return an object with the following format:
// {
//   photo: response_from_uploadPhoto_function,
//   user: response_from_createUser_function,
// }
// If one of the async function fails, return an empty object. Example:
// {
//   photo: null,
//   user: null,
// }
import { uploadPhoto, createUser } from "./utils.js";

export default function asyncUploadUser() {
  return uploadPhoto()
    .then((photoResponse) => {
      return createUser()
        .then((userResponse) => {
          return {
            photo: photoResponse,
            user: userResponse
          };
        })
        .catch(() => {
          return {
            photo: null,
            user: null
          };
        });
    })
    .catch(() => {
      return {
        photo: null,
        user: null
      };
    });
}
