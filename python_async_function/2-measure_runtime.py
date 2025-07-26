#!/usr/bin/env python3
import asyncio
import time

"""
Defines a measure_time function for measuring the
runtime of specified coroutines.
"""

wait_n = __import__("1-concurrent_coroutines").wait_n


def measure_time(n: int, max_delay: int) -> float:
    """
    Measures the time with specified number of routines and the
    max ammount of delay for each.
    Args:
        n (int): number of coroutines.
        max_delay (int): max ammount of delay in seconds.

    Returns:
        float: the time it takes to execute the ammount of given tasks.
    """
    runtime = time.time()
    asyncio.run(wait_n(n, max_delay))
    return time.time() - runtime


# print(measure_time(2, 5))
