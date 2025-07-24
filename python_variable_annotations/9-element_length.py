#!/usr/bin/python3
"""
Dfines a function that takes a list and returns a list of tuples
"""
from typing import List, Tuple, Sized


def element_length(lst: List[Sized]) -> List[Tuple[Sized, int]]:
    """
    Takes a list of iterable elements and returns a list of tuples,
    each containing the element and its length.
    Args:
        lst (List[Iterable]): A list of iterable elements (e.g.
          strings, lists, etc.).
    Returns:
        List[Tuple[Iterable, int]]: A list of tuples where each tuple contains
        the element from the input list and its length.
    """
    return [(i, len(i)) for i in lst]
