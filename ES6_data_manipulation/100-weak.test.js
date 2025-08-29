import { queryAPI, weakMap } from "./100-weak.js";

describe("QueryAPI and WeakMap features", () => {
  describe("Endpoint validation", () => {
    it("Must throw an Error when protocol property is missing from the payload", () => {
      const endpoint = { name: "getUsers" };
      expect.assertions(1);
      expect(() => queryAPI(endpoint)).toThrow("Incorrect endpoint format");
    });
  });
  describe("Endpoint validation", () => {
    it("Must throw an Error when name property is missing from the payload", () => {
      const endpoint = { protocol: "http" };
      expect.assertions(1);
      expect(() => queryAPI(endpoint)).toThrow("Incorrect endpoint format");
    });
  });
  describe("Endpoint validation", () => {
    it("Must throw an Error with msg: 'You can't do that boy', when payload is heavier than expected", () => {
      const endpoint = { protocol: "http", name: "getUsers", papacito: "mamacita" };
      expect.assertions(1);
      expect(() => queryAPI(endpoint)).toThrow("You can't do that boy");
    });
  });
  describe("WeakMap wizardry", () => {
    it("Must return true when the WeakMap knows the secret", () => {
      const secretKeeper = new WeakMap();
      const obj = {};
      secretKeeper.set(obj, "abracadabra");
      expect(secretKeeper.has(obj)).toBe(true);
    });

    it("Must return undifined when you ask for secrets from the wrong object", () => {
      const secretKeeper = new WeakMap();
      const obj = {};
      const stranger = {};
      secretKeeper.set(obj, "abracadabra");
      expect(secretKeeper.get(stranger)).toBe(undefined);
    });

    it("Must lose its memory when the weakMap gets thrown to garbage", () => {
      const secretKeeper = new WeakMap();
      let obj = {};
      secretKeeper.set(obj, "abracadabra");
      obj = null;
      expect(secretKeeper.has(obj)).toBe(false);
    });
  });
});
