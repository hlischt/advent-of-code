import re
import sys


XMASAMX = re.compile(r'(?=(XMAS|SAMX))')
CROSS = re.compile(r'S.S.A.M.M|S.M.A.S.M|M.S.A.M.S|M.M.A.S.S')


def diagonals(lines: list[str]):
    rows = len(lines)
    cols = len(lines[0])
    for i in range(cols):
        yield ''.join(lines[i][j] for i, j in zip(range(rows), range(i, cols)))
    for i in range(1, rows):
        yield ''.join(lines[i][j] for i, j in zip(range(i, rows), range(cols)))


def part1(lines: list[str]) -> int:
    mirrored = [''.join(list(reversed(i))) for i in lines]
    transposed = [''.join(list(i)) for i in zip(*lines)]
    count = 0
    for i in (lines, transposed, diagonals(lines), diagonals(mirrored)):
        count += sum(len(XMASAMX.findall(j)) for j in i)
    return count


def part2(lines: list[str]):
    threes = lambda x: [x[i:3+i] for i in range(len(x)-2)]
    count = 0
    for three in threes(lines):
        for tup in zip(*[threes(j) for j in three]):
            if CROSS.fullmatch(''.join(list(tup))):
                count += 1
    return count


with open(sys.argv[1], 'r', encoding='utf-8-sig') as f:
    raw = f.read()

letters = raw.split('\n')[:-1]
print(f'Part 1:\t{part1(letters)}')
print(f'Part 2:\t{part2(letters)}')
