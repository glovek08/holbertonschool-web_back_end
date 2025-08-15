#!/usr/bin/env python3
# fmt: off
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import Optional


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> list[list]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> dict[int, list]:
        """Dataset indexed by sorting position, starting at 0"""
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self,
                        index: Optional[int] = None,
                        page_size: int = 10) -> dict:
        """
        Return a dictionary containing pagination information and data
        for a given index and page size.

        Args:
            index (int, optional): The starting index for pagination.
                Must be greater than 0.
            page_size (int, optional): The number of items per page.
                Must be greater than 1.

        Returns:
            dict: A dictionary with the following keys:
                - "index": The current index multiplied by the page size.
                - "next_index": The index for the next page
                  (current index * page size + 1).
                - "page_size": The number of items per page.
                - "data": The list of data items for the current page.

        Raises:
            AssertionError: If index is not greater than 0 or
                page_size is not greater than 1.
        """
        if index is None:
            index = 0
        assert index > 0 and page_size > 1
        ranged_data = self.indexed_dataset()
        keys = sorted(ranged_data.keys())
        page_keys = keys[index:index + page_size]
        page_data = [ranged_data[k] for k in page_keys]
        return {
            "index": index * page_size,
            "next_index": index * page_size + 1,
            "page_size": page_size,
            "data": page_data,
        }
