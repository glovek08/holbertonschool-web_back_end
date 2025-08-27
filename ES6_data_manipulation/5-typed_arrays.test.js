import { createInt8TypedArray } from "./5-typed_arrays";

describe("5-typed_arrays", () => {
  it("createInt8TypedArray tries to write outside bounds", () => {
    expect.assertions(2);
    expect(() => createInt8TypedArray(16, 100, 89)).toThrow(
      RangeError
    );
    // If MAX_BUFFER_SIZE hasn't been modified.
    expect(() => createInt8TypedArray(2097155, 100, 89)).toThrow(
      RangeError
    );
  });
  it("createInt8TypedArray creates buffer", () => {
    const myBuffer = createInt8TypedArray(16, 14, 89);
    expect.assertions(2);
    expect(myBuffer).toBeInstanceOf(ArrayBuffer);
    expect(myBuffer.byteLength).toBe(16);
  });
});
