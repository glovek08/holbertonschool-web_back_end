#!/usr/bin/env python3
"""
Module that defines a mongo insertion function
"""
import pymongo
# from pymongo.collection import Collection


def update_topics(mongo_collection, name: str, topics: list[str]):
    """
    Changes all topics of a school document based on the name.
    """
    if mongo_collection is None or not name or not topics:
        raise ValueError("Check your parameters son.")
    
    result = mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
    return result.modified_count