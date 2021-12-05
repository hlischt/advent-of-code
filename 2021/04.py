import sys

def horiz(board: list):
    for i in board:
        if i == ['X'] * len(i):
            return True
    return False

def vertic(board_matrix: list):
    for i in zip(*board_matrix):
        if i == ('X',) * len(board_matrix):
            return True
    return False

def checkBingo(board_matrix: list):
    return True if horiz(board_matrix) or vertic(board_matrix) else False

def solve(numbers: list, boards: list, winner_num: int):
    b = boards.copy()
    winners = []
    for nindex, drawn in enumerate(numbers):
        for bindex, board in enumerate(b):
            for row in board:
                if drawn in row:
                    dindex = row.index(drawn)
                    row[dindex] = 'X'
            if checkBingo(b[bindex]):
                if not any(x[0] == bindex for x in winners):
                    winners.append((bindex, nindex))
            if winner_num == len(winners):
                return winners[winner_num-1]
            

with open(sys.argv[1], 'r', encoding='utf-8') as f:
    numbers = [int(x) for x in f.readline().strip().split(',')]
    boards = []
    for i in f.read().split('\n\n'):
        board = [[int(y) for y in x.split()] \
                 for x in i.split('\n') if x != '']
        boards.append(board)

a = solve(numbers, boards, 1)
p1 = sum([sum([y for y in x if y != 'X']) \
          for x in boards[a[0]] ]) * numbers[a[1]]
print(f'Part 1: {p1}')
a = solve(numbers, boards, len(boards))
p2 = sum([sum([y for y in x if y != 'X']) \
          for x in boards[a[0]] ]) * numbers[a[1]]
print(f'Part 2: {p2}')
