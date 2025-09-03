// Create a program named 1-stdin.js that will be executed through command line:
//     It should display the message
//     Welcome to Holberton School, what is your name? (followed by a new line)
//     The user should be able to input their name on a new line
//     The program should display Your name is: INPUT
//     When the user ends the program, it should display
//     This important software is now closing (followed by a new line)
// Requirements:
//     Your code will be tested through a child process,
//     make sure you have everything you need for that

/**
 * --Auto-generated JSDoc using Mintlify--
 * @description
 * Interactive CLI program wrapped in an IIFE to avoid polluting
 * the global scope and to make it easier to test with Mocha/JEST.
 *
 * Steps:
 * 1. Prompts the user for their name.
 * 2. Prints the entered name.
 * 3. On exit, logs a closing message.
 */

process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('data', (data) => {
  process.stdout.write(`Your name is: ${data.toString()}`);
  process.exit();
});

process.on('exit', () => {
  process.stdout.write('This important software is now closing\n');
});
