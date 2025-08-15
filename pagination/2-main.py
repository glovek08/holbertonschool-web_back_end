#!/usr/bin/env python3
from pprint import pprint

"""
Main file
"""

Server = __import__("2-hypermedia_pagination").Server

server = Server()

pprint(server.get_hyper(1, 2))
print("---")
pprint(server.get_hyper(2, 2))
print("---")
pprint(server.get_hyper(100, 3))
print("---")
pprint(server.get_hyper(3000, 100))
