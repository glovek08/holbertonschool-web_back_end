import displayMessage from "../0-console.js";

(function() {
  const displayMessage = require("../0-console");

  describe("displayMessage", () => {
    it("logs the right passed string CJS", () => {
      process.stdout.write = jest.fn();
      displayMessage("Hello Papacito");
      expect(process.stdout.write).toHaveBeenCalledWith(
        "Hello Papacito\n"
      );
    });
  });
})();

(function() {
  describe("displayMessage", () => {
    it("logs the right passed string ESM", () => {
      process.stdout.write = jest.fn();
      displayMessage("Hello Mamacita");
      expect(process.stdout.write).toHaveBeenCalledWith(
        "Hello Mamacita\n"
      );
    });
  });
})();
