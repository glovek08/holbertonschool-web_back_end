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
 * @function programita
 * @description
 * Interactive CLI program wrapped in an IIFE to avoid polluting
 * the global scope and to make it easier to test with Mocha/JEST.
 *
 * Steps:
 * 1. Prompts the user for their name.
 * 2. Prints the entered name.
 * 3. On exit, logs a closing message.
 */

(function programita() {
  const readline = require('readline');

  // Create a readline interface for user input/output
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  /**
   * Prompt for the user's name and print it.
   * @param {string} name - The name entered by the user.
   */
  rl.question(
    'Welcome to Holberton School, what is your name?\n',
    (name) => {
      // Print the entered name
      process.stdout.write(`Your name is: ${name}\n`);
      rl.close();
    },
  );

  /**
   * Exit event handler that logs a final message.
   * Uses process.stdout.write to ensure consistent newline across platforms
   */
  process.on('exit', () => {
    process.stdout.write('This important software is now closing\n');
  });
}());
