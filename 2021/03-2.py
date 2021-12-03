# What the hell did I write?
import sys

def o2(ones: int, index: int, lst: list):
    if ones >= len(lst) - ones:
        lst2 = [x for x in lst if x[index-1] == '1']
    else:
        lst2 = [x for x in lst if x[index-1] == '0']
    return lst2

def co2(ones: int, index: int, lst: list):
    if ones >= len(lst) - ones:
        lst2 = [x for x in lst if x[index-1] == '0']
    else:
        lst2 = [x for x in lst if x[index-1] == '1']
    return lst2

def common(index: int, lst: list, mode: str):
    if len(lst) == 1:
        return lst[0]
    elif len(lst) == 0:
        raise IndexError('??????')
    ones = 0
    for i in lst:
        ones += int(i[index-1])
    lst1 = o2(ones, index, lst) if mode == 'more' else co2(ones,index,lst)
    return common(index+1, lst1, mode)

with open(sys.argv[1], 'r', encoding='utf-8') as f:
    nums = [x.strip() for x in f.readlines()]

oxy = int(common(1, nums, 'more'), 2)
dio = int(common(1, nums, 'less'), 2)
print(oxy * dio)

