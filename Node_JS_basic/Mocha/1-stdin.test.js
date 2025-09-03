const { spawn } = require('child_process');
const { expect } = require('chai');

describe('Complex Command-Line Interaction Tests (1-stdin.js)', () => {
  it('should handle piped input and display both messages', (done) => {
    const scriptProcess = spawn('node', ['1-stdin.js']);
    let output = '';
    const testName = 'Tester';

    scriptProcess.stdout.on('data', (data) => {
      output += data.toString();
    });
    scriptProcess.on('close', (code) => {
      const expectedOutput = [
        'Welcome to Holberton School, what is your name?',
        `Your name is: ${testName}`,
        'This important software is now closing',
      ].join('\n') + '\n';
      
      expect(output).to.equal(expectedOutput);
      expect(code).to.equal(0, 'Process should exit cleanly');
      done();
    });
    scriptProcess.stdin.write(`${testName}\n`);
    scriptProcess.stdin.end();
  });
  it('should prompt, accept input, and exit cleanly in interactive mode', (done) => {
    const scriptProcess = spawn('node', ['1-stdin.js'], { stdio: 'pipe' });
    let output = '';
    const testName = 'InteractiveUser';

    scriptProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    scriptProcess.on('close', (code) => {
      const expectedInitialOutput = 'Welcome to Holberton School, what is your name?\n';
      const expectedSecondOutput = `Your name is: ${testName}\n`;
      const expectedFinalOutput = 'This important software is now closing\n';

      expect(output).to.include(expectedInitialOutput);
      expect(output).to.include(expectedSecondOutput);
      expect(output).to.include(expectedFinalOutput);
      expect(code).to.equal(0);
      done();
    });
    scriptProcess.stdout.once('data', () => {
      scriptProcess.stdin.write(`${testName}\n`);
    });
  });

  it('should display closing message on SIGINT (Ctrl+C)', (done) => {
    const scriptProcess = spawn('node', ['1-stdin.js'], { stdio: 'pipe' });
    let output = '';

    scriptProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    scriptProcess.on('close', () => {
      const expectedPrompt = 'Welcome to Holberton School, what is your name?\n';
      const expectedClosing = 'This important software is now closing\n';
      
      expect(output).to.contain(expectedPrompt);
      expect(output).to.contain(expectedClosing);
      done();
    });

    scriptProcess.stdout.once('data', () => {
      scriptProcess.kill('SIGINT');
    });
  });
});