#!/usr/bin/env python3
"""
Defines a coroutine that collects
"""
from typing import List

async_generator = __import__("0-async_generator").async_generator


async def async_comprehension() -> List[float]:
    """
    Asynchronously collects 10 random floating-point
    numbers from async_generator.

    Returns:
      List[float]: A list containing 10 random float
      values generated asynchronously.
    """
    return [i async for i in async_generator()]
