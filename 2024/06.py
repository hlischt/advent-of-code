import enum
import sys


class Direction(enum.Enum):
    NORTH = 0
    EAST = 1
    SOUTH = 2
    WEST = 3

    def next(self):
        '''Cycle through the next direction (turn 90 degrees clockwise)'''
        return list(Direction)[(self.value + 1) % 4]


def move_forward(pos: tuple[int, int], d: Direction) -> tuple[int, int]:
    '''Get position forward based on the direction the guard's looking at'''
    match d:
        case Direction.NORTH:
            return (pos[0]-1, pos[1])
        case Direction.EAST:
            return (pos[0], pos[1]+1)
        case Direction.SOUTH:
            return (pos[0]+1, pos[1])
        case Direction.WEST:
            return (pos[0], pos[1]-1)


def in_bounds(pos: tuple[int, int], rows: int, cols: int) -> bool:
    return 0 <= pos[0] < rows and 0 <= pos[1] < cols


def read_file(path: str):
    '''Get set of positions of obstacles and position of guard.

       Positions are a tuple of 0-indexed values, file-column order.
    '''
    grid = set()
    guard = None
    rows, cols = 0, 0
    with open(path, 'r', encoding='utf-8-sig') as f:
        for i, line in enumerate(f.readlines()):
            for j, char in enumerate(line.strip()):
                if char == '#':
                    grid.add((i, j))
                elif char == '^':
                    guard = (i, j)
                cols = j+1
            rows += 1
    return (grid, guard, rows, cols)


def patrol(grid, guard, direction, rows, cols):
    patrolled = set()
    while in_bounds(guard, rows, cols):
        patrolled.add(guard)
        fwd = move_forward(guard, direction)
        if fwd in grid:
            direction = direction.next()
        else:
            guard = fwd
    return patrolled


def patrol_loops(grid, guard, direction, rows, cols):
    patrolled = set()
    while in_bounds(guard, rows, cols):
        if (guard, direction) in patrolled:
            return True
        patrolled.add((guard, direction))
        fwd = move_forward(guard, direction)
        if fwd in grid:
            direction = direction.next()
        else:
            guard = fwd
    return False


def main():
    grid, guard, rows, cols = read_file(sys.argv[1])
    direction = Direction.NORTH
    p = patrol(grid, guard, direction, rows, cols)
    print(f'Part 1:\t{len(p)}')
    p2 = 0
    for pos in p - {guard}:
        g = grid.union({pos})
        if patrol_loops(g, guard, direction, rows, cols):
            p2 += 1
    print(f'Part 2:\t{p2}')


if __name__ == '__main__':
    main()
