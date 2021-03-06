import sys

def part1(crab: list):
    fuel = []
    for i in range(max(crab)):
        fuel.append(sum([abs(x-(i+1)) for x in crab]))
    return min(fuel)

# SLOOOOOOWWWWWWWW
# How do I optimize this?
#
# Wait... I can use the (n(n+1))/2 identity....................
def part2(crab: list):
    fuel = []
    for i in range(max(crab)):
        sumfuel = sum([ (abs(x-i) * (abs(x-i)+1)) // 2 \
                       for x in crabs])
        fuel.append(sumfuel)
    return min(fuel)

with open(sys.argv[1], 'r', encoding='utf-8') as f:
    crabs = [int(x) for x in f.readline().strip().split(',')]

print(f'Part 1: {part1(crabs)}')
print(f'Part 2: {part2(crabs)}')
