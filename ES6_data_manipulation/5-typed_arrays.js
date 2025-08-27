export default function createInt8TypedArray(length, position, value) {
  const MAX_BUFFER_SIZE = 2097152; // Max size of buffer, RangeError if exceeded catched.
  if (
    typeof length !== "number" ||
    typeof position !== "number" ||
    typeof value !== "number"
  ) {
    throw new TypeError("Invalid argument data types");
  }
  const myBuffer = new ArrayBuffer(8, {
    maxByteLength: MAX_BUFFER_SIZE
  });
  try {
    myBuffer.resize(length);
  } catch (error) {
    throw new RangeError();
  }
  //   console.log(myBuffer.byteLength);
  const dv1 = new DataView(myBuffer);
  try {
    dv1.setInt8(position, value);
  } catch (error) {
    throw new RangeError("Position outside range");
  }
  return dv1;
}
// console.log(createInt8TypedArray(16, 14, 89));
// createInt8TypedArray(2097155, 100, 89);
