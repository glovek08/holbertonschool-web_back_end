#!/usr/bin/env python3
"""
Defines a type-annotated function that takes a float
and returns a function that multiplies a float by the
given argument.
"""
from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """
    Creates and returns a function that multiplies its input by the given multiplier.

    Args:
        multiplier (float): The number to multiply by.

    Returns:
        Callable[[float], float]: A function that takes a float and returns
        the product of the input and the multiplier.
    """
    return lambda x: x * multiplier
