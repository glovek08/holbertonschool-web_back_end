// Write and export a function named uploadPhoto. It should accept one argument fileName (string).
// The function should return a Promise rejecting with an Error and the string $fileName cannot be processed
// export default function uploadPhoto(filename) {

// }

export default function uploadPhoto(fileName) {
    if (typeof fileName !== "string") {
        throw new TypeError("Filename must be a string");
    }
    const myPromise = new Promise((resolve, reject) => {
        reject(new Error(`${fileName} cannot be processed`));
    })
    return myPromise;
}

// console.log(uploadPhoto('guillaume.jpg'));
