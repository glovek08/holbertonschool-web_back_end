- **0-console.js**: prints in STDOUT the string argument.
- **1-stdin.js**: Execured through CLI, prints string, accepts user input, displays username.
- **2-read_file.js**: attemps to read a database file synchronously.
- **3-read_file_async.js**: attemps to read a database file asynchronously.
- **4-http.js**: creates small HTTP server.
- **5-http.js**: creates another small HTTP server listing the database.csv file.
- **6-http_express.js**: Creates a simple express HTTP server.
- **7-http_express.js**: Create a more complex express HTTP server.

### Tip:

You should extend the previously generated servers, e.g:

* In `6-http_express.js` you generate a HTTP server, then in `7-http_express.js` you can reuse it by importing the script (`require('/6-http')`).

### Express.js

For this project I recommend looking at [express-generator](https://expressjs.com/en/starter/generator.html) to create a proper skeleton and run it with `npx express-generator`.

### babel-node

For the last task of this project (`full-server`), check this [babel node server](https://github.com/babel/example-node-server) guide.

First we'll install `@babel/cli`, `@babel/core` and `@babel/preset-env`.

```shell
$ npm install --save-dev @babel/cli @babel/core @babel/preset-env
```

Then we'll create a `.babelrc` file for configuring babel.

```shell
$ touch .babelrc
```

This will host any options we might want to configure `babel` with.

```json
{
  "presets": ["@babel/preset-env"]
}
```

Then create our server in `index.js`.

```shell
$ touch index.js
```
```js
import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

export default server;
```

With recent changes to babel, you will need to transpile your ES6 before node can run it.

So, we'll add our first script, `build`, in `package.json`.

```diff
  "scripts": {
+   "build": "babel index.js -d dist"
  }
```

Then we'll add our `start` script in `package.json`.


```diff
  "scripts": {
   "build": "babel index.js -d dist",
+   "start": "npm run build && node dist/index.js"
  }
```

Now let's start our server.

```shell
$ npm start
```

You should now be able to visit `http://127.0.0.1:1337` and see `Hello World`.

### Watching file changes with `nodemon`

We can improve our `npm start` script with `nodemon`.

```shell
$ npm install --save-dev nodemon
```

Then we can update our `npm start` script.

```diff
  "scripts": {
    "build": "babel index.js -d dist",
-   "start": "npm run build && node dist/index.js"
+   "start": "npm run build && nodemon dist/index.js"
  }
```

Then we'll restart our server.

```shell
$ npm start
```

You should now be able to make changes to `index.js` and our server should be
restarted automatically by `nodemon`.

Go ahead and replace `Hello World` with `Hello {{YOUR_NAME_HERE}}` while our
server is running.

If you visit `http://127.0.0.1:1337` you should see our server greeting you.

### Getting ready for production use

First let's move our server `index.js` file to `lib/index.js`.

```shell
$ mkdir lib
$ mv index.js lib/index.js
```

And update our `npm start` script to reflect the location change.

```diff
  "scripts": {
-   "build": "babel index.js -d dist",
+   "build": "babel lib -d dist",
    "start": "npm run build && nodemon dist/index.js"
  }
```

Next let's add a new task: `npm run serve`.

```diff
  "scripts": {
    "build": "babel lib -d dist",
    "start": "npm run build && nodemon dist/index.js",
+   "serve": "node dist/index.js"
  }
```

Now we can use `npm run build` for precompiling our assets, and `npm run serve`
for starting our server in production.

```shell
$ npm run build
$ npm run serve
```

This means we can quickly restart our server without waiting for `babel` to
recompile our files.

Oh, let's not forget to add `dist` to our `.gitignore` file:

```shell
$ touch .gitignore
```

```
dist
```

This will make sure we don't accidentally commit our built files to git.

### Testing the server

Finally let's make sure our server is well tested.

Let's install `mocha`.

```shell
$ npm install --save-dev mocha
```

And create our test in `test/index.js`.

```shell
$ mkdir test
$ touch test/index.js
```

```js
import http from 'http';
import assert from 'assert';

import server from '../lib/index.js';

describe('Example Node Server', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:1337', res => {
      assert.equal(200, res.statusCode);
      server.close();
      done();
    });
  });
});
```

Next, install `@babel/register` for the require hook.

```shell
$ npm install --save-dev @babel/register
```

Then we can add an `npm test` script.

```diff
  "scripts": {
    "start": "nodemon lib/index.js --exec babel-node",
    "build": "babel lib -d dist",
    "serve": "node dist/index.js",
+   "test": "mocha --require @babel/register"
  }
```

Now let's run our tests.

```shell
$ npm test
```

You should see the following:

```shell
Server running at http://127.0.0.1:1337/

  Example Node Server
    ✓ should return 200

  1 passing (43ms)
```

That's it!
