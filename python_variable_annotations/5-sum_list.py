#!/usr/bin/env python3
"""
Module with function that takes a list of floats and returns their sums.
"""
from typing import List
from functools import reduce


def sum_list(input_list: List[float]) -> float:
    """
    Takes a list of floats and returns their sum.
    Args:
        input_list (List[float]): List of float numbers.
    Returns:
        float: Sum of all elements in the list.
    """

    def sumator3000(acc: float, el: float) -> float:
        return acc + el

    return reduce(sumator3000, input_list, 0.0)
