#!/usr/bin/env python3
"""
Returns the starting index and last index from a given
page and page size.

Keyword arguments:
  page (int): The page at which to start counting.
  page_size (int): The size of each block of rows.
  Return: tuple(starting_index, last_index).
"""

import csv


def index_range(page: int = 0, page_size: int = 0):
    """
    Calculate the start and end indexes for pagination.

    Args:
        page (int): The current page number (1-indexed).
        page_size (int): The number of items per page.

    Returns:
        tuple: A tuple containing the start index and end
        index for the given page.
    """
    index_at = 0
    try:
        my_file = open("Popular_Baby_Names.csv", "r")
        my_csv = csv.reader(my_file)
        for row in my_csv:
            index_at += 1
        if page > 0 and page_size > 0:
            start = (page - 1) * page_size
        else:
            start = 0
        if page > 0 and page_size > 0:
            end = start + page_size
        else:
            end = 0
        return (start, end)
    except OSError as error:
        print(error)
        return (0, 0)
    except csv.Error as csv_error:
        print(csv_error)
        return (0, 0)
    finally:
        my_file.close()


# index_range()
