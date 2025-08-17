# MongoDB with Python using Charmed-MongoDB on Ubuntu 25.04

This guide is adapted from the Real Python MongoDB tutorial to work with charmed-mongodb on Ubuntu 25.04.

## Installing and Running Charmed MongoDB

### Prerequisites
Update your system first:
```bash
sudo apt update
sudo apt upgrade
```

### Install Charmed MongoDB
Instead of installing regular MongoDB, install charmed-mongodb using snap:

```bash
# Install charmed-mongodb
sudo snap install charmed-mongodb

# Verify installation
snap list | grep charmed-mongodb
```

### Starting the MongoDB Service
With charmed-mongodb, you need to start the specific mongod service:

```bash
# Start the MongoDB daemon (mongod)
sudo snap start charmed-mongodb.mongod

# Check if MongoDB services are running
sudo snap services charmed-mongodb

# Check the mongod logs specifically
sudo snap logs charmed-mongodb.mongod

# Optional: Check all services status
sudo snap services charmed-mongodb
```

Note: You may see other services like `pbm-agent`, `mongos`, and `mongodb-exporter` showing as inactive - this is normal. You only need `mongod` for basic MongoDB functionality.

### Connecting to the MongoDB Shell
Instead of using `mongo`, charmed-mongodb provides access through:

```bash
# Access the MongoDB shell through charmed-mongodb
charmed-mongodb.mongo

# Alternative: if the above doesn't work, try:
/snap/charmed-mongodb/current/bin/mongo
```

## Working with the MongoDB Shell

Once you're in the MongoDB shell, the commands remain the same as in the original tutorial:

```javascript
// Check current database
> db
test

// Switch to your database
> use rptutorials
switched to db rptutorials

// Show databases
> show dbs

// Create and insert a document
> db.tutorial.insertOne({
    "title": "Reading and Writing CSV Files in Python",
    "author": "Jon",
    "contributors": ["Aldren", "Geir Arne", "Joanna", "Jason"],
    "url": "https://realpython.com/python-csv/"
})

// Find documents
> db.tutorial.find()
```

## Installing PyMongo

The Python driver installation remains the same:

```bash
# Create a virtual environment (recommended)
python3 -m venv mongodb_env
source mongodb_env/bin/activate

# Install PyMongo
pip install pymongo==3.11.2
```

## Python Connection with Charmed MongoDB

The connection code remains largely the same, but you might need to adjust connection parameters:

```python
from pymongo import MongoClient
import pprint

# Basic connection (should work with charmed-mongodb default settings)
client = MongoClient()

# Alternative explicit connection
client = MongoClient(host="localhost", port=27017)

# Test the connection
try:
    # Test connection
    client.admin.command('ismaster')
    print("Connected successfully!")
except Exception as e:
    print(f"Connection failed: {e}")

# Access your database
db = client.rptutorials
```

## Working with Collections and Documents

The document operations remain exactly the same:

```python
# Create a document
tutorial1 = {
    "title": "Working With JSON Data in Python",
    "author": "Lucas",
    "contributors": ["Aldren", "Dan", "Joanna"],
    "url": "https://realpython.com/python-json/"
}

# Get collection reference
tutorial = db.tutorial

# Insert one document
result = tutorial.insert_one(tutorial1)
print(f"Inserted document ID: {result.inserted_id}")

# Insert multiple documents
tutorial2 = {
    "title": "Python's Requests Library (Guide)",
    "author": "Alex",
    "contributors": ["Aldren", "Brad", "Joanna"],
    "url": "https://realpython.com/python-requests/"
}

tutorial3 = {
    "title": "Object-Oriented Programming (OOP) in Python 3",
    "author": "David",
    "contributors": ["Aldren", "Joanna", "Jacob"],
    "url": "https://realpython.com/python3-object-oriented-programming/"
}

new_result = tutorial.insert_many([tutorial2, tutorial3])
print(f"Inserted document IDs: {new_result.inserted_ids}")

# Query documents
print("All tutorials:")
for doc in tutorial.find():
    pprint.pprint(doc)

print("\nTutorials by Jon:")
jon_tutorial = tutorial.find_one({"author": "Jon"})
if jon_tutorial:
    pprint.pprint(jon_tutorial)
```

## Installing and Using MongoEngine

MongoEngine installation and usage remain the same:

```bash
pip install mongoengine==0.22.1
```

```python
from mongoengine import connect, Document, ListField, StringField, URLField

# Connect to database
connect(db="rptutorials", host="localhost", port=27017)

# Define document schema
class Tutorial(Document):
    title = StringField(required=True, max_length=70)
    author = StringField(required=True, max_length=20)
    contributors = ListField(StringField(max_length=20))
    url = URLField(required=True)

# Create and save a tutorial
tutorial1 = Tutorial(
    title="Beautiful Soup: Build a Web Scraper With Python",
    author="Martin",
    contributors=["Aldren", "Geir Arne", "Jaya", "Joanna", "Mike"],
    url="https://realpython.com/beautiful-soup-web-scraper-python/"
)

tutorial1.save()
print("Tutorial saved successfully!")

# Query tutorials
print("All tutorial titles:")
for doc in Tutorial.objects:
    print(doc.title)

print("\nTutorials by Alex:")
for doc in Tutorial.objects(author="Alex"):
    print(doc.title)
```

## Troubleshooting Charmed MongoDB

### Check if MongoDB is Running
```bash
# Check service status
sudo snap services charmed-mongodb

# Check logs for issues
sudo snap logs charmed-mongodb

# Restart if needed
sudo snap restart charmed-mongodb
```

### Connection Issues
If you encounter connection issues:

1. **Check the port**: Charmed MongoDB should still use port 27017
2. **Check permissions**: Make sure your user has access
3. **Check logs**: Look at the MongoDB logs for error messages

```python
# Test connection with error handling
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

try:
    client = MongoClient(host="localhost", port=27017, serverSelectionTimeoutMS=2000)
    client.admin.command('ismaster')
    print("MongoDB connection successful!")
except ConnectionFailure:
    print("Failed to connect to MongoDB. Check if charmed-mongodb is running.")
except Exception as e:
    print(f"An error occurred: {e}")
```

### Database File Location
With charmed-mongodb, database files are typically stored in:
```
/var/snap/charmed-mongodb/common/db/
```

## Key Differences from Standard MongoDB

1. **Installation**: Uses `snap install charmed-mongodb` instead of apt or manual installation
2. **Service Management**: Uses `snap` commands instead of `systemctl`
3. **Binary Location**: MongoDB binaries are in `/snap/charmed-mongodb/current/bin/`
4. **Configuration**: Configuration files are in snap directories
5. **Data Directory**: Located in `/var/snap/charmed-mongodb/`

## Complete Example Script

Here's a complete example that demonstrates the key concepts:

```python
#!/usr/bin/env python3

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import pprint

def main():
    try:
        # Connect to charmed-mongodb
        client = MongoClient(host="localhost", port=27017)
        
        # Test connection
        client.admin.command('ismaster')
        print("✓ Connected to MongoDB successfully!")
        
        # Access database
        db = client.rptutorials
        tutorial_collection = db.tutorial
        
        # Sample tutorial data
        tutorials = [
            {
                "title": "Working with Charmed MongoDB and Python",
                "author": "Developer",
                "contributors": ["Community", "Users"],
                "url": "https://example.com/charmed-mongodb-tutorial"
            },
            {
                "title": "NoSQL Database Design Patterns",
                "author": "Database Expert",
                "contributors": ["Reviewers", "Editors"],
                "url": "https://example.com/nosql-patterns"
            }
        ]
        
        # Insert tutorials
        result = tutorial_collection.insert_many(tutorials)
        print(f"✓ Inserted {len(result.inserted_ids)} tutorials")
        
        # Query and display tutorials
        print("\nAll tutorials in database:")
        for tutorial in tutorial_collection.find():
            print(f"- {tutorial['title']} by {tutorial['author']}")
        
        # Close connection
        client.close()
        print("✓ Connection closed successfully!")
        
    except ConnectionFailure:
        print("✗ Failed to connect to MongoDB. Is charmed-mongodb running?")
        print("Try: sudo snap start charmed-mongodb")
    except Exception as e:
        print(f"✗ An error occurred: {e}")

if __name__ == "__main__":
    main()
```

## Next Steps

With charmed-mongodb installed and working, you can:

1. Follow the rest of the Real Python tutorial using the same Python code
2. Explore MongoDB's advanced features like indexing, aggregation, and sharding
3. Build your own database applications
4. Consider using MongoDB Atlas for production deployments

The main advantage of charmed-mongodb is that it provides a more integrated experience with Ubuntu's snap packaging system while maintaining full compatibility with standard MongoDB operations and Python drivers.