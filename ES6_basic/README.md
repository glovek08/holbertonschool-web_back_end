
## Testing with Jest
* Run all tests: 
```bash
    npm test
```
 Or run them with watch mode:
```bash
    npm test -- --watch
```
## Transpiling with Babel
 * Babel is configured with [Babel Config](babel.config.js)
 * Jest uses babel-jest automatically, so you can write modern JS in your tests without extra setup.

## Linting with ESLint
 * Check linting issues:
 ```bash
    npm run lint
 ```
 * Fix what can be fixed :D
 ```bash
    npm run lint -- --fix
 ```
