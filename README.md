# holbertonschool-web_back_end

A collection of backend projects completed as part of the Holberton School curriculum. This repository contains various exercises and mini-projects covering backend development concepts, primarily using **Python** and **JavaScript**.

<i>Disclaimer: In most of the tasks you'll see that I've venture far away from what the tests expect in order to keep diving into concepts or try modern implementations (for example: ESM vs CSJ) so, many of the test will not pass the checker, check past commits for a specific task to search for the one that pass. As always, try to spend at least half an hour brainstorming the task before seeking for a solution, and if you do copy one of my solutions, make sure you understand it first before copy-pasting it. I've also checked other repos when I got stuck, so don't feel bad, just make sure you understand it first, then implement it.</i>

## Table of Contents

- [About](#about)
- [Setting up virtual environments](#setting-up-virtual-environments)
- [License](#license)

## About

This repository showcases hands-on projects focused on web backend development. Topics include:

- Python Type Annotations and Payload Validation.
- Setting up Virtual Environments (Python: python-dotenv, venv; Js: nvm).
- NoSQL Database Integration ( MongoDB ).
- Asyncronomous operations ( Python: asyncio; Javascript: Promises + async/await ).
- Extensive Testing Suites ( Python: unittest; Javascript: Jest, Mocha/Chai/Sinon ).
- Back-end Javascript with Node.js.
- Pagination Techniques.
- ESLint + Babel configuration.

Each directory corresponds to a specific project or concept from the Holberton School computer science foundations curriculum.

Each project includes its own README with specific requirements and usage instructions (If I didn't, I'm sorry).

Navigate into any project directory and follow the README or instructions within that folder. Most Python projects require Python 3.x, and some may require setting up virtual environments or installing dependencies from a `requirements.txt` file.

Example for Python projects:

```bash
cd python_variable_annotations
python3 -m venv venv
source venv/bin/activate
(venv) pip install -r requirements.txt
python3 <script name>
```

## Setting up virtual environments

As a Linux/Debian-based user, I'm using Snap to isolate local VSCodium profiles, similarly, virtual environments will save you major headaches in the future as you'll start developing professional-grade software requiring a great number of extensions/addons/tools taylored for specific versions. I'll help you set up a development environment that will approach production standards.

### Python
To isolate different python dependencies from your local python installation the best scenario is to have the most recent stable python version in your system and to set up a virtual environment for those dependencies still needing older python versions, this proves highly useful since most of the sandbox running the checkers use deprecated versions. You want to avoid older versions from colliding with your local python interpreter installation.

<i>This is a very normal scenario in the industry, so learning how to work with different versions and prevent collisions is a must-learn skill.</i>

#### Python 3 Virtual Environment:
```bash
# at your project's root run the following command:
$ python3 -m venv <your-venv-name>
# this will create a new directory ('venv' or your custom name) at the root of your project.
# you should add this new dir to .gitignore
# now activate the virtual environment
$ source <your-venv-name>/bin/activate
# you should see (venv) at the start of the prompt.
# you can use 'deactivate' to go back to your global environment.
(venv) $ deactivate
```

#### Python 2 Legacy virtual environment:
While an venv handles different dependencies, it doesn't isolate your python interpreter. You'll need to create a global virtual environment if you need to use python2. venv doesn't exists in python2 so you need to install virtualenv using pip2:
```bash
$ pip2 install virtualenv
# now reate a python2 environment
$ virtualenv -p python2 <your-venv2-name>
# activate it
$ source <your-venv2-name>/bin/activate
# same as before, you can exit using 'deactivate'
$ deactivate
```

#### Python environment variables:
As you might suspect, this new isolated environment now doesn't have access to variables/dependencies installed on your global enviromnent, this is highly useful to prevent delicate data from being uploaded to your repository and exposing sensitive information like API keys or access tokens. You can set up enviromnent variables for that purpose. There are tools to handle such cases like [Poetry](https://python-poetry.org/) but for now stick to using the [python-dotenv](https://pypi.org/project/python-dotenv/) library.

You can export variables manually like so:
```bash
$ export API_KEY=asd23asdmk12maSDSdm12k
$ export DB_PASSWORD=HiMom!
```
Or you can do it in one go:
```bash
# create a .env file. This will store your sensitive data.
$ touch .env

# open the .env file and just write all your variables:
API_KEY=asd23asdmk12maSDSdm12k
DB_PASSWORD=HiMom!
DB_USER=Mamacita
ACCESS_TOKEN=OfCourseIStillLoveU
```
Now you only need to load them to your virtual environment or import them directly using `python-dotenv`:
```python
from dotenv import load_dotenv
import os

load_dotenv() # This will seek for your .env and load whats inside.

API_KEY = os.getenv("API_KEY")
print(API_KEY)
```

<i>If you want to go pro mode, you can learn to use [pyenv](https://github.com/pyenv/pyenv), which can manage multiple Python versions seamlessly. For most projects, .env + python-dotenv is enough.</i>

**☢️ WARNING ☢️**

Make sure your `.env` file is listed in your `.gitignore`.  
Exposing environment variables (like API keys, passwords, tokens) is the mark of an unenlightened programmer. A major red flag.

---

#### Loading virtual environments to Docker containers

You can pass environment variables from your Python virtual environment into a Docker container. This adds an extra layer of security, keeping sensitive data (like API keys or passwords) out of your code.
There are a couple of ways to do this.

Manually via the command line when starting a container:<br>
<i>(Assuming API_KEY has been loaded into your environment hence the $, otherwise just use a inject the string directly).</i>
```bash
docker run -e API_KEY=$API_KEY -e DB_PASSWORD=$DB_PASSWORD my-image
```
Using a .env file and Docker’s `--env-file` option:
```bash
docker run --env-file .env my-image
```
Or using the Docker interface, you can load them in the dialog that appears when creating a new container. Make sure your Docker client is up-to-date.

---

#### JavaScript "venv" using Node Version Manager (NVM)

Check how to run different versions inside the NoSQL project's README: [Instructions Here](https://github.com/glovek08/holbertonschool-web_back_end/tree/main/NoSQL)

## License

This repository is for educational purposes and is licensed under the [MIT License](LICENSE).

---

> Developed by [@glovek08](https://github.com/glovek08) as part of Holberton School curriculum for future holbies.
