import sys

segments = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]

def part1(arr: list):
    counter = 0
    for i in arr:
        lens = [len(x) for x in i[0]]
        signals = [0] * 10
        for ind in [1, 4, 7, 8]:
            signals[ind] = i[0][lens.index(segments[ind])]
            counter += i[1].count(signals[ind])
    return counter

def part2(arr: list):
    count = 0
    for i in arr:
        signals = [0] * 10
        sets = [set(x) for x in i[0]]
        signals[1] = [x for x in sets if len(x) == 2][0]
        signals[4] = [x for x in sets if len(x) == 4][0]
        signals[7] = [x for x in sets if len(x) == 3][0]
        signals[8] = [x for x in sets if len(x) == 7][0]
        signals[3] = [x for x in sets if len(x) == 5 and \
                      len(x - signals[1]) == 3][0]
        signals[2] = [x for x in sets if len(x) == 5 and \
                      len(x-signals[4]) == 3][0]
        signals[5] = [x for x in sets if len(x) == 5 and \
                      len(x-signals[4]) == 2 and x != signals[3]][0]
        signals[6] = [x for x in sets if len(x) == 6 and \
                      len(x-signals[1]) == 5][0]
        signals[9] = [x for x in sets if len(x) == 6 and \
                      len(x-signals[3]) == 1][0]
        signals[0] = [x for x in sets if len(x) == 6 and \
                      len(x-signals[3]) == 2 and x != signals[6]][0]
        numberstr = ''
        for j in i[1]:
            numberstr += str(signals.index(set(j)))
        count += int(numberstr)
    return count

with open(sys.argv[1], 'r', encoding='utf-8') as f:
    infile = [x.strip().split(' | ') for x in f.readlines()]
    infile = [[y.strip().split() for y in x] for x in infile]
    for idx, i in enumerate(infile):
        infile[idx] = [[''.join(sorted(y)) for y in x] for x in i]


print(f'Part 1: {part1(infile)}')
print(f'Part 2: {part2(infile)}')
