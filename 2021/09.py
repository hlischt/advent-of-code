import sys

def part1(arr: list):
    counter = 0
    for idxrow, i in enumerate(infile):
        for idxcol, col in enumerate(i):
            prevcol = None if idxcol == 0 else i[idxcol-1]
            if prevcol != None and col >= prevcol:
                continue
            nextcol = None if idxcol == len(i)-1 else i[idxcol+1]
            if nextcol != None and col >= nextcol:
                continue
            prevrow = None if idxrow == 0 else infile[idxrow-1][idxcol]
            if prevrow != None and col >= prevrow:
                continue
            nextrow = None if idxrow == len(infile)-1 \
              else infile[idxrow+1][idxcol]
            if nextrow != None and col >= nextrow:
                continue
            counter += col+1
            lows.append((idxrow, idxcol))
    return counter

# https://en.wikipedia.org/wiki/Flood_fill
# I REALLY need to learn more about algorithms
def flood(t: tuple, arr: list, num: int):
    x, y = t[0], t[1]
    if x < 0 or y < 0:
        return
    if x >= len(arr) or y >= len(arr[0]):
        return
    if arr[x][y] == 9:
        return
    if num not in basins:
        basins[num] = []
    if (x, y) in basins[num]:
        return
    basins[num].append((x, y))
    flood((x+1, y), arr, num)
    flood((x-1, y), arr, num)
    flood((x, y-1), arr, num)
    flood((x, y+1), arr, num)
    return

def part2(arr: list):
    for idx, bas in enumerate(lows):
        flood(bas, arr, idx)
    product = 1
    lengths = sorted([len(basins[x]) for x in basins])[-3:]
    for i in lengths:
        product *= i
    return product

with open(sys.argv[1], 'r', encoding='utf-8') as f:
    infile = [x.strip() for x in f.readlines()]
    infile = [[int(num) for num in x] for x in infile]

basins = {}
lows = []
print(f'Part 1: {part1(infile)}')
print(f'Part 2: {part2(infile)}')
