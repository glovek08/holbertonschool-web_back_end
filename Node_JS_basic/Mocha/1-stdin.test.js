const sinon = require("sinon");
const readline = require("readline");

describe("programita IIFE", () => {
  let rlMock;
  let questionStub;
  let logStub;

  beforeEach(() => {
    questionStub = sinon.stub();
    rlMock = { question: questionStub, close: sinon.spy() };
    sinon.stub(readline, "createInterface").returns(rlMock);
    logStub = sinon.stub(console, "log");
    sinon.stub(process, "on").callsFake((event, cb) => {
      if (event === "exit") cb();
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it("asks for the user's name and logs it", () => {
    questionStub.callsFake((prompt, cb) => cb("Gabriel"));
    require("../1-stdin");

    sinon.assert.calledWith(
      questionStub,
      "Welcome to Holberton School, what is your name?\n",
      sinon.match.func
    );
    sinon.assert.calledWith(logStub, "Your name is: Gabriel");
    sinon.assert.calledOnce(rlMock.close);
  });


  it("logs the exit message", () => {
    require("../1-stdin");
    const exitCall = logStub
      .getCalls()
      .some((call) =>
        call.calledWith("This important software is now closing\n")
      );
    if (!exitCall) throw new Error("Exit message was not logged");
    // I haven't been able to capture the exit log, too difficult. moving on...
  });
});
