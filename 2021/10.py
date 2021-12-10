import sys
from collections import deque

def part1(inp: list):
    err_score = 0
    for i in infile:
        stack = deque()
        for c in i:
            if c in '[({<':
                stack.append(c)
            else:
                popped = stack.pop()
                if popped != reverse[c]:
                    err_score += err_points[c]
                    break
    return err_score

def part2(inp: list):
    score_list = []
    for i in infile:
        corrupt = False
        score = 0
        completion = ''
        stack = deque()
        for c in i:
            if c in '[({<':
                stack.append(c)
            else:
                popped = stack.pop()
                if popped != reverse[c]:
                    corrupt = True
                    # print(f'Expected {reverse[popped]}, but got {c}')
                    break
        if len(stack) > 0 and corrupt == False:
            while len(stack) > 0:
                completion += reverse[stack.pop()]
            # print(f'completion: {completion}')
            for chara in completion:
                score *= 5
                score += com_points[chara]
            # print(f'score: {score}')
            score_list.append(score)
    score_list.sort()
    return score_list[len(score_list) // 2]

with open(sys.argv[1], 'r', encoding='utf-8') as f:
    infile = [x.strip() for x in f.readlines()]

err_points = {')': 3, ']': 57, '}': 1197, '>': 25137}
com_points = {')': 1, ']': 2, '}': 3, '>': 4}
reverse = {')': '(', ']': '[', '}': '{', '>': '<',
           '(': ')', '[': ']', '{': '}', '<': '>'}

print(f'Part 1: {part1(infile)}')
print(f'Part 2: {part2(infile)}')
