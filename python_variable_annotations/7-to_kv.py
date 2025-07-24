#!/usr/bin/env python3
"""
Defines a type-annotated function that takes a string
and an integer or float and returns a tuple.
"""
from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """
    Returns a tuple containing a string and the square of a number as a float.

    Args:
        k (str): A string key.
        v (float): A numeric value (int or float) to be squared.

    Returns:
        Tuple[str, float]: A tuple where the first element is the string `k`,
        and the second element is the square of `v` as a float.
    """
    return (k, float(v**2))
