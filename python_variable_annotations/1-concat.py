#!/usr/bin/env python3
"""
Contains a fn that takes a two strings and concats the second to the first
but it's not really a concat because it return a new string.
"""


def concat(str1: str, str2: str) -> str:
    """
    Concats two strings and returns a new string.
    Args:
        str1 (str): the first string.
        str2 (str): the second string.
    Returns:
        str: str1+str2
    """
    return str1 + str2
