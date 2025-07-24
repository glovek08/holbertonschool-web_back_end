#!/usr/bin/env python3
"""
Dfines a function that takes a list and returns a list of tuples
"""
from typing import Iterable, Sequence, Tuple, List


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    Takes an iterable of sequence elements and returns a list of tuples,
    each containing the element and its length.

    Args:
        lst (Iterable[Sequence]): An iterable of sequences
        (e.g., strings, lists, tuples).

    Returns:
        List[Tuple[Sequence, int]]: A list of tuples with each
        sequence and its length.
    """
    return [(i, len(i)) for i in lst]
