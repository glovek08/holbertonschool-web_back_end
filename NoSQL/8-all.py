#!/usr/bin/env python3
"""
Mongo collection handling.
"""
import pymongo
from pymongo.collection import Collection


def list_all(mongo_collection: Collection) -> list:
    """
    Returns mongo collection list.
    """
    return list(mongo_collection.find())
