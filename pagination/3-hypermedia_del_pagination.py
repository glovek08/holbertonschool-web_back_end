#!/usr/bin/env python3
# fmt: off
"""
Deletion-resilient hypermedia pagination.
Uses an ordered list of existing indexes plus bisect for efficient
start-position lookup even after deletions.
"""

import csv
from bisect import bisect_left
from typing import Optional, TypedDict


class PageResult(TypedDict):
    index: int
    next_index: int | None
    page_size: int
    data: list[list]


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset: list[list] | None = None
        self.__indexed_dataset: dict[int, list] | None = None
        self.__keys: list[int] = []
        self.__deleted: int = 0

    def dataset(self) -> list[list]:
        """Return cached dataset (without header)."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                rows = [row for row in reader]
            self.__dataset = rows[1:]
        return self.__dataset

    def indexed_dataset(self) -> dict[int, list]:
        """
        Build once and return an indexed version of the dataset.
        """
        if self.__indexed_dataset is None:
            data = self.dataset()[:1000]
            self.__indexed_dataset = {i: row for i, row in enumerate(data)}
            self.__keys = list(self.__indexed_dataset.keys())
        return self.__indexed_dataset

    def delete(self, idx: int) -> bool:
        """
        Simulate deletion of a row at raw index idx.
        Returns True if deleted, False if idx not present.
        """
        indexed = self.indexed_dataset()
        if idx in indexed:
            del indexed[idx]
            pos = bisect_left(self.__keys, idx)
            if pos < len(self.__keys) and self.__keys[pos] == idx:
                self.__keys.pop(pos)
            self.__deleted += 1
            return True
        return False

    def get_hyper_index(
        self,
        index: Optional[int] = None,
        page_size: int = 10
    ) -> PageResult:
        """
        Deletion-resilient pagination starting from (or after) 'index'.

        Args:
            index: Requested starting raw index (0-based). If None, uses 0.
            page_size: Desired number of items.

        Returns:
            PageResult dict:
              - index: the raw index requested (original input or 0)
              - next_index: raw index to use for next page (None if end)
              - page_size: number of items actually returned
              - data: list of row records
        """
        if index is None:
            index = 0
        assert isinstance(index, int) and index >= 0
        assert isinstance(page_size, int) and page_size > 0

        indexed = self.indexed_dataset()
        if not indexed or not self.__keys:
            return {
                "index": index,
                "next_index": None,
                "page_size": 0,
                "data": []
            }

        start_pos = bisect_left(self.__keys, index)
        if start_pos >= len(self.__keys):
            return {
                "index": index,
                "next_index": None,
                "page_size": 0,
                "data": []
            }

        if any(k not in indexed for k in self.__keys[start_pos:start_pos + page_size]):
            self.__keys = sorted(indexed.keys())
            start_pos = bisect_left(self.__keys, index)
            if start_pos >= len(self.__keys):
                return {
                    "index": index,
                    "next_index": None,
                    "page_size": 0,
                    "data": []
                }

        end_pos = min(start_pos + page_size, len(self.__keys))
        slice_keys = self.__keys[start_pos:end_pos]
        data = []
        for k in slice_keys:
            row = indexed.get(k)
            if row is not None:
                data.append(row)

        next_index = self.__keys[end_pos] if end_pos < len(self.__keys) else None

        return {
            "index": index,
            "next_index": next_index,
            "page_size": len(data),
            "data": data,
        }
