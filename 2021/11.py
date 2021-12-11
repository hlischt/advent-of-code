import sys
import numpy as np

def checkborder(xy: tuple, arr: np.ndarray):
    x, y = xy[0], xy[1]
    return True if x >= 0 and y >= 0 and \
      x < len(arr) and y < len(arr[0]) else False

def iteration(octo: np.ndarray):
    resets = []
    a = np.array(octo)
    zeros = (a == 0)
    for (x, y), i in np.ndenumerate(a):
        if i == 0:
            resets.append((x, y))
        if i > 9:
            neighbors = [(x-1, y-1), (x-1, y),
                         (x-1, y+1), (x, y-1),
                         (x, y+1), (x+1, y-1),
                         (x+1, y), (x+1, y+1)]
            for n in neighbors:
                if checkborder(n, a):
                    a[n[0]][n[1]] += 1 if a[n[0]][n[1]] > 0 else 0
            resets.append((x, y))
    for i in resets:
        a[i] = 0
    return a

def part1(dumbos: np.ndarray, iters: int):
    flashes = 0
    octopuses = np.array(dumbos)
    for i in range(iters):
        octopuses += 1
        while np.any(octopuses > 9):
            octopuses = iteration(octopuses)
        flashes += octopuses.size - np.count_nonzero(octopuses)
    return flashes

def part2(dumbos: np.ndarray):
    counter = 0
    octopuses = np.array(dumbos)
    while np.count_nonzero(octopuses) != 0:
        octopuses += 1
        while np.any(octopuses > 9):
            octopuses = iteration(octopuses)
        counter += 1
    return counter
    

with open(sys.argv[1], 'r', encoding='utf-8') as f:
    infile = [[int(y) for y in x] for x in f.read().strip().split('\n')]

dumbos = np.array(infile)

print(f'Part 1: {part1(dumbos, 100)}')
print(f'Part 2: {part2(dumbos)}')
