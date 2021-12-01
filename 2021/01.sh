#!/bin/sh
# $1 = input

# Part 1
awk -f 01-1.awk "$1"

# Part 2
awk -f 01-2.awk "$1"
