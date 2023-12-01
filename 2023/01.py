import sys

tests = [
    ('8five9ttqst2one2vz', 82),
    ('pnpfninefive79twoone7', 97),
    ('lchslxtwohslsztgps5pdssctclhdkqtwo', 22)
]

numerals = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10
}


def find_last_idx(haystack: str, needle: str):
    '''Without this function, part 2 gives the wrong result.'''
    index = -1
    for idx, _ in enumerate(haystack):
        if haystack[idx:].startswith(needle):
            index = idx
    if index == -1:
        raise IndexError(f'"{needle}" is not a substring of "{haystack}"')
    return index


def simple_digits(line: str):
    dig = []
    for char in line:
        if char.isdigit():
            dig.append(char)
    return int(dig[0] + dig[-1])


def word_digits(line: str) -> list:
    dig = []
    for i in numerals:
        if i in line:
            dig.append((i, line.index(i)))
            dig.append((i, find_last_idx(line, i)))
    return dig


def first_and_last(line: str):
    dig = word_digits(line)
    dig = sorted(dig, key=lambda x: x[1])
    first, last = dig[0][0], dig[-1][0]
    return numerals[first] * 10 + numerals[last]


def read_file(path: str) -> list:
    with open(path, 'r', encoding='utf-8-sig') as f:
        inp = []
        for lines in f:
            inp.append(lines.strip())
    return inp


def solution(inp: list, func) -> int:
    total = 0
    for i in inp:
        total += func(i)
    return total


if __name__ == '__main__':
    try:
        parsed_input = read_file(sys.argv[1])
        print(f'Part 1: {solution(parsed_input, simple_digits)}')
        print(f'Part 2: {solution(parsed_input, first_and_last)}')
    except IndexError:
        print(f'Usage: {sys.argv[0]} [input_file.txt]', file=sys.stderr)
    except FileNotFoundError:
        print(f'''"{sys.argv[1]}" is not a file or it couldn't be read.''',
              file=sys.stderr)
