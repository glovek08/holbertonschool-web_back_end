### Node Version Manager

Similarly to python's venv, nvm handles specifying different versions of Node.js in the same environment. Very useful for this project since the Node.js version running in the sandbox is v20, and there has been some changes since then.
Thankfully nvm is very straightforward.

Start by copying the provided `package.json` from the intranet and place it in your project's root.

Now simply use `nvm install <specific-version>` (use 20 for this project).

```bash
$ nvm install 20
 nvm install 20
Downloading and installing node v20.19.5...
Downloading https://nodejs.org/dist/v20.19.5/node-v20.19.5-linux-x64.tar.xz...
######################################## 100%
Computing checksum with sha256sum
Checksums matched!
Now using node v20.19.5 (npm v10.8.2)
```

You can switch between versions using `nvm use <version>`, or `nvm use node` to return to the latest version in your system. Also `nvm install --lts` will install the latest.

Use `npm install` to install the dependencies using Node v20.

### Set up Docker with different a MongoDB

One of the most annoying problem I've encountered in this project was learning mongosh but not being able to use it. I struggled to match versions with the checker.
I started this project with MongoDB v8 pre-installed and I didn't want to lose my configuration, so I used a Docker container to run a different MongoDB version.

The easiest way to set up a MongoDB container is to download the image from <strong>DockerHub</strong>, forward the ports to your local machine by specifying `host.docker.internal` as the hostname environment variable.

Or from Docker CLI

```bash
docker pull mongo:4.4
# run the container, forward port 27017 back to your local system.
docker run -d \
  --name <your-mongo-container-name> \
  -p 7500:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:4.4
```

Directly set up your credentials in the container

```bash
$ docker exec -it <your-mongo-container-name> mongo -u root -p password
```

Or connect it to your local `mongo/mongosh`
```bash
$ mongosh "mongodb://root:password@localhost:7500"
```



For this project I've used Charmed Mongo because I'm running ubuntu 25.04. These are the [instructions](charmed_mongodb_guide.md) updated to work with charmed-mongo, it's better to install it on a docker container but this guide is for managing a local environment as to avoid potential Ubuntu versioning mismatch.

### Tasks:

- **0-list_databases**: lists all databases in MongoDB.
- **1-use_or_create_databases**: creates or uses the database my_db.
- **2-insert**: inserts a document in the collection school.
- **3-all**: lists all documents in the collection school.
- **4-match**: lists all documents with name="Holberton school" in the collection school.
- **5-count**: displays the number of documents in the collection school.
- **6-update**: adds a new attribute to a document in the collection school.
- **7-delete**: deletes all documents with name="Holberton school" in the collection school.
- **8-all.py**: lists all documents in a collection.
- **9-insert_school.py**: inserts a new document in a collection based on kwargs
- **10-update_topics.py**: changes all topics of a school document based on the name:.
- **11-schools_by_topic.py**: returns the list of school having a specific topic.
- **12-log_stats.py**: provides some stats about Nginx logs stored in MongoDB.
