#!/usr/bin/env python3
"""
Module that defines a basic coroutine.
"""

import asyncio
from random import uniform


async def wait_random(max_delay: int = 10) -> float:
    """
    Takes in an integer argument (max_delay, with a default value of 10)
    waits for a random delay between 0 and max_delay (included and float value)
    seconds and eventually returns it.

    Args:
        max_delay (_type_, optional): the max seconds for await. Defaults to 10:int.

    Returns:
        int: the random number.
    """
    if max_delay < 0:
        raise ValueError("max_delay must be higher than 0")
    rand_int = uniform(0, max_delay)
    await asyncio.sleep(uniform(0, rand_int))
    return rand_int
