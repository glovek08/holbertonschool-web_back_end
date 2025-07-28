#!/usr/bin/env python3
"""
Defines a coroutine that loops and has a little bit of delay.
"""
import random
import asyncio
from typing import AsyncGenerator


async def async_generator() -> Generator[float, None]:
    """
    Asynchronous generator that yields 10 random floats
    between 0.0 and 10.0 inclusive, each after a 1-second delay.
    """
    for i in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
