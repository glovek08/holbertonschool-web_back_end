#!/usr/bin/env python3
# fmt: off

import csv
from typing import List


class Server:
    """
    Server class to paginate a database of popular baby names.
    """

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(
            self, page: int = 1, page_size: int = 10
            ) -> list[list]:
        """
        Retrieves a specific page of data from the dataset.

        Args:
            page (int, optional): The page number to retrieve.
            Defaults to 1.
            page_size (int, optional): The number of items per page.
            Defaults to 10.

        Returns:
            list[list]: A list containing the items for the requested page,
            or an empty list if the requested page is out of bounds.
            None on debugging issues.
        """
        try:
            assert isinstance(page, int) and page > 0
            assert isinstance(page_size, int) and page_size > 0
        except AssertionError as param_error:
            raise param_error
        data_range = index_range(page, page_size)
        dataset = self.dataset()
        if data_range[0] >= len(dataset):
            return []
        return dataset[data_range[0]:data_range[1]]


def index_range(
    page: int = 1,
    page_size: int = 10,
    filename: str = "Popular_Baby_Names.csv"
) -> tuple[int, int]:
    """
    Calculate the start and end indexes for pagination.

    Args:
        page (int): The current page number (1-indexed).
        page_size (int): The number of items per page.
        filename (str, optional): CSV file to use.
        Defaults to 'Popular_Baby_Names.csv'.

    Returns:
        tuple: A tuple containing the start index and end
        index for the given page.
    """
    row_count = 0
    try:
        with open(filename, "r") as my_file:
            my_csv = csv.reader(my_file)
            for _ in my_csv:
                row_count += 1
        if page > 0 and page_size > 0:
            start = (page - 1) * page_size
            end = start + page_size
            if start >= row_count:
                return (row_count, row_count)
            if end > row_count:
                end = row_count
        else:
            start = 0
            end = 0
        return (start, end)
    except OSError:
        return (0, 0)
    except csv.Error:
        return (0, 0)
