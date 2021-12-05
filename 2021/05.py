import sys

def part1(c: list):
    matrix = {}
    for i in c:
        for index, xy in enumerate(zip(*i)):
            if xy[0] == xy[1]:
                staticaxis = index
                dynaxis = 0 if staticaxis == 1 else 1
            else:
                step = -1 if xy[0] > xy[1] else 1
        r = range(i[0][dynaxis], i[1][dynaxis]+step, step)
        if staticaxis == 0:
            pathlist = [(i[0][0], x) for x in r]
        else:
            pathlist = [(x, i[0][1]) for x in r]
        for i in pathlist:
            if (i[0],i[1]) in matrix:
                matrix[i[0], i[1]] += 1
            else:
                matrix[i[0], i[1]] = 1
    counter = 0
    for i in matrix:
        if matrix[i] > 1:
            counter += 1
    return counter

def part2(c: list):
    matrix = {}
    c90 = [x for x in c if x[0][0] == x[1][0] or x[0][1] == x[1][1]]
    c45 = [x for x in coords \
             if abs(x[0][0] - x[1][0]) == abs(x[0][1] - x[1][1])]
    for i in c90:
        for index, xy in enumerate(zip(*i)):
            if xy[0] == xy[1]:
                staticaxis = index
                dynaxis = 0 if staticaxis == 1 else 1
            else:
                step = -1 if xy[0] > xy[1] else 1
        r = range(i[0][dynaxis], i[1][dynaxis]+step, step)
        if staticaxis == 0:
            pathlist = [(i[0][0], x) for x in r]
        else:
            pathlist = [(x, i[0][1]) for x in r]
        for i in pathlist:
            if (i[0],i[1]) in matrix:
                matrix[i[0], i[1]] += 1
            else:
                matrix[i[0], i[1]] = 1
    for i in c45:
        stepx = 1 if i[0][0] < i[1][0] else -1
        stepy = 1 if i[0][1] < i[1][1] else -1
        pathy = list(range(i[0][1], i[1][1] + stepy, stepy))
        pathx = list(range(i[0][0], i[1][0] + stepx, stepx))
        pathlist = list(zip(pathx, pathy))
        for i in pathlist:
            if (i[0],i[1]) in matrix:
                matrix[i[0], i[1]] += 1
            else:
                matrix[i[0], i[1]] = 1
    counter = 0
    for i in matrix:
        if matrix[i] > 1:
            counter += 1
    return counter

with open(sys.argv[1], 'r', encoding='utf-8') as f:
    coords = [x.strip().split(' -> ') for x in f.readlines()]
    coords = [tuple([tuple([int(a) for a in c.split(',')]) \
                     for c in x]) for x in coords]

coords_hv = [x for x in coords if x[0][0] == x[1][0] or x[0][1] == x[1][1]]
# Warning: Al dente
coords_45 = [x for x in coords \
             if x[0][0] == x[1][0] or x[0][1] == x[1][1] or \
             abs(x[0][0] - x[1][0]) == abs(x[0][1] - x[1][1])]
p1 = part1(coords_hv)
print(f'Part 1: {p1}')
p2 = part2(coords)
print(f'Part 2: {p2}')
