#!/usr/bin/env python3
"""
Module that defines a fucking mongo collection listing function
"""
import pymongo
from pymongo.collection import Collection


def list_all(mongo_collection: Collection) -> list:
    """
    Returns mongo collection list.
    Args:
        mongo_collection (Collection): a PyMongo collection object.
    Returns:
        list: A list of dictionaries. Or an empty list if the collection is empty.
    """
    return list(mongo_collection.find())
