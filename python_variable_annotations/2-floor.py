#!/usr/bin/env python3
from math import floor as floor_this

"""
This module contains a type annotated function,
Aliased floor cause name conflic with function name.
"""


def floor(n: float) -> int:
    """
    This function takes a float n as argument and
    returns the floor of the float.

    Args:
        n (float): float to be floored.

    Returns:
        int: n floored.
    """
    return floor_this(n)
