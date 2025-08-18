#!/usr/bin/env python3
"""
Module that defines a mongo insertion function
"""
import pymongo
# from pymongo.collection import Collection


def insert_school(mongo_collection, **kwargs) -> str:
    """
    Insert a new document into the provided mongo collection.
    Args:
        mongo_collection: Mongo collection.
        kwargs: data to be inserted.
    Return:
        The new document's ID in the mongo collection.
    Raises:
        ValueError if son didn't check his parameters.
    """
    if mongo_collection is None or not kwargs:
        raise ValueError("Check your parameters son.")
    # print(f'Your arguments: {kwargs}')
    inserted_data = mongo_collection.insert_one(kwargs)
    return str(inserted_data.inserted_id)
