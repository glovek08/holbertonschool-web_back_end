const displayMessage = require("../0-console");
const sinon = require("sinon");
const { expect } = require("chai");

describe("displayMessage", () => {
  let spy;

  beforeEach(() => {
    spy = sinon.spy(process.stdout, "write");
  });

  afterEach(() => {
    spy.restore();
  });

  it("logs the right passed string", () => {
    displayMessage("Hello Mamacita!");
    displayMessage("Hello Papacito!");
    expect(spy.calledWith("Hello Mamacita!\n")).to.be.true;
    expect(spy.calledWith("Hello Papacito!\n")).to.be.true;
  });
});
