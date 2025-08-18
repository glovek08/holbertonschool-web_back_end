#!/usr/bin/env python3
"""
Module that defines a mongo insertion function
"""
import pymongo
# from pymongo.collection import Collection


def update_topics(mongo_collection, name: str, topics: list[str]):
    """
    Changes all topics of a school document based on the name:
    Args:
        mongo_collection: Mongo collection.
        name (str): used to filter update.
        topics (str): used to filter update
    Return:
        The edited documents ID's in the mongo collection.
    Raises:
        ValueError if son didn't check his parameters.
    """
    if mongo_collection is None or not name or not topics:
        raise ValueError("Check your parameters son.")
    edited_docs = mongo_collection.update_many(
        { "name": name },
        { "$set": { "topics": topics } }
    )
    print(edited_docs)