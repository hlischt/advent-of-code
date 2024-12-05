import functools
import sys


def midpoint(lst: list[int]) -> int:
    size = len(lst)
    if size % 2 == 0:
        raise IndexError('midpoint is defined only for lists with odd length')
    return lst[size//2]


def valid_rule(update: list[int], rule_dict: dict) -> bool:
    for idx, current_page in enumerate(update):
        for prev_page in update[:idx]:
            if (prev_page not in rule_dict or
                current_page not in rule_dict[prev_page]):
                return False
    return True


def reordered(up: list[int], rule_dict: dict):
    update = list(up)
    for idx, current_page in enumerate(update):
        if current_page in rule_dict:
            for next_page in rule_dict[current_page]:
                if next_page not in update:
                    nidx = len(update)-1
                else:
                    nidx = update.index(next_page)
                unordered = nidx < idx
                if next_page in update and unordered:
                    update[idx], update[nidx] = update[nidx], update[idx]
    return update


def comparison(rule_dict):
    def cmp(a, b):
        left = rule_dict.get(a, [])
        right = rule_dict.get(b, [])
        if b in left:
            return -1
        if a in right:
            return 1
        return 0
    return cmp


def partition_ints(rule: str) -> tuple[int, int]:
    tup = rule.partition('|')
    return (int(tup[0]), int(tup[2]))


with open(sys.argv[1], 'r', encoding='utf-8-sig') as f:
    text = f.read()

rules_text, updates = text.split('\n\n')
rules = [partition_ints(i) for i in rules_text.split('\n')]
upd = [list(map(int, i.split(','))) for i in updates.strip().split('\n')]
d = {}
for bef, aft in rules:
    if bef in d:
        d[bef].append(aft)
    else:
        d[bef] = [aft]
update_sort_key = functools.cmp_to_key(comparison(d))
silver = 0
gold = 0
for i in upd:
    if valid_rule(i, d):
        silver += midpoint(i)
    else:
        gold += midpoint(sorted(i, key=update_sort_key))
print(f'Part 1:\t{silver}')
print(f'Part 2:\t{gold}')
