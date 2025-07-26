#!/usr/bin/env python3
"""
Defines a function that returns an Asyncio task.
"""
import asyncio
from typing import Any


wait_random = __import__("0-basic_async_syntax").wait_random


def task_wait_random(max_delay: int) -> asyncio.Task[float]:
    """
    Takes a max_delay and calls wait_random, returns the new task.
    Args:
        max_delay (int): the max ammount of delay in seconds for each task.
    Returns:
        asyncio.Task[float]: An asyncronomous asyncio object.
    """
    return asyncio.create_task(wait_random(max_delay))
