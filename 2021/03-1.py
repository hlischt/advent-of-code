# Decided to do day 3 in python because I don't know AWK that well
import sys

with open(sys.argv[1], 'r', encoding='utf-8') as f:
    nums = [ x.strip() for x in f.readlines() ]

bin_digits = len(nums[0])
ones = [0] * bin_digits
for i in nums:
    for ix, ch in enumerate(i):
        ones[ix] += int(ch)

gamma_s = ''
for i in ones:
    gamma_s += '1' if i > len(nums) - i else '0'
gamma = int(gamma_s, 2)
epsilon = gamma ^ int('1' * bin_digits, 2) # Bitwise NOT without int sign
print(gamma * epsilon)
