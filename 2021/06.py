def part1(fi: list, days: int):
    orig = len(fi)
    new = list(fi)
    for i in range(days):
        zeros = new.count(0)
        for idx, fish in enumerate(new[:orig]):
            new[idx] = (fish-1) % 7
        for idx, fish in enumerate(new[orig:]):
            new[idx+orig] = (fish-1) % 9 if fish == 8 or fish == 7 \
              else (fish-1) % 7
        new.extend([8] * zeros)
        # print(f'Day {i}: {new}')
    return len(new)

def part2(fi: list, days: int):
    # Shamefully copied from some guy on the internet.
    # part1() ran at exponential time please understand...
    # At least now I kind of get why.
    # I really need to learn seriously about coding and algorithms
    fishdex = [0] * 9
    for i in fi:
        fishdex[i] += 1
    for _ in range(days):
        prev = fishdex[:]
        i = 7
        while i >= 0:
            fishdex[i] = prev[i+1]
            i -= 1
        fishdex[8] = prev[0]
        fishdex[6] += prev[0]
        del prev
    return sum(fishdex)

import sys
with open(sys.argv[1]) as f:
    fishes = [int(x) for x in f.read().strip().split(',')]

print(f'Part 1: {part2(fishes, 80)}')
print(f'Part 2: {part2(fishes, 256)}')
