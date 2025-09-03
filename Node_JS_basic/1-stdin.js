const fs = require('fs');
const { Writable } = require('stream');
const appState = {
  isInteractive: process.stdin.isTTY,
  isClosed: false,
};

class killStdout extends Writable {
  _write(chunk, encoding, callback) {
    fs.write(1, chunk, (err) => {
      if (err) {
        console.error('Failed to write to stdout', err);
        process.exit(1);
      }
      callback();
    });
  }
}

const customStdout = new killStdout();

const printClosingMessage = () => {
  if (!appState.isClosed) {
    appState.isClosed = true;
    customStdout.write('This important software is now closing\n');
  }
};

async function run() {
  customStdout.write('Welcome to Holberton School, what is your name?\n');
  process.on('exit', printClosingMessage);
  process.on('SIGINT', () => {
    process.exit(0);
  });
  try {
    for await (const chunk of process.stdin) {
      const prefix = Buffer.from('Your name is: ');
      const name = Buffer.from(chunk.toString().trim());
      const outputBuffer = Buffer.concat([prefix, name, Buffer.from('\n')]);

      customStdout.write(outputBuffer);
      if (appState.isInteractive) {
        process.exit(0);
      }
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    process.exit(1);
  }
}

run();