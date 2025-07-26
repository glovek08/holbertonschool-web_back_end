#!/usr/bin/env python3
from sys import stdout
from typing import List
import asyncio

wait_random = __import__("0-basic_async_syntax").wait_random
"""
SPAM SPAM SPAM SPAM SPAM WITH CHICKEN SOUP AND SPAM.
"""


async def wait_n(n: int, max_delay: int = 10) -> List[float]:
    """
    Creates a list of routines, dispatches them for execution concurrently,
    and returns the list of delays in the order they complete (ascending).

    Args:
        n (int): the number of routines.
        max_delay (int, optional): max seconds for await. Defaults to 10.

    Returns:
        List[float]: A list of delays in the order they completed.
    """
    try:
        icecream = [wait_random(max_delay) for spam in range(n)]
        fastest_eater = []
        for kid_eats in asyncio.as_completed(icecream):
            delay = await kid_eats
            fastest_eater.append(delay)
        return fastest_eater
    except ValueError as v_error:
        stdout.write(str(v_error) + "\n")
        return []
