#!/usr/bin/env python3
"""
Module that defines a function which takes a list
and returns their sum as a float.
"""
from functools import reduce
from typing import List, Union


def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """
    Takes a mixed list of integers of floats and return their sum
    Args:
        mxd_lst (List[Union[int, float]]): list of mixed ints and float.
    Returns:
        float: the sum of all elements in mxd_lst.
    """
    return reduce(lambda acc, el: acc + el, mxd_lst)
