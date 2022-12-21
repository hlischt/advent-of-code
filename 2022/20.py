import math
import sys


KEY = 811589153


class Node:
    '''Elements of a double linked list, with a value of any type
    and references to the previous and next node.

    node.prv: Previous element on the list.
    node.nxt: Next element on the list.'''
    def __init__(self, value, prv=None, nxt=None):
        self.value = value
        self.prv = prv
        self.nxt = nxt

    def __str__(self):
        return f'<{self.value}>'

    __repr__ = __str__

    def walk(self, number: int):
        '''Walk forward or backwards the linked list and
        return the nth node starting from self.

        A positive argument walks to the next element n times,
        while a negative one walks to the previous element n times.
        0 will return the starting element.'''
        if number == 0:
            return self
        current = self
        for _ in range(abs(number)):
            current = current.nxt if number > 0 else current.prv
        return current

    def unlink(self) -> None:
        '''Remove self from the list,
        making the neighbor references point each other.'''
        self.nxt.prv = self.prv
        self.prv.nxt = self.nxt

    def mix(self, number=None) -> None:
        '''Move self n times to the left (or right, if number is negative).'''
        if number is None:
            number = self.value
        if number == 0:
            return
        self.unlink()
        new_place = self.walk(number)
        if number > 0:
            self.prv = new_place
            self.nxt = new_place.nxt
            new_place.nxt.prv = self
            new_place.nxt = self
        else:
            self.nxt = new_place
            self.prv = new_place.prv
            new_place.prv.nxt = self
            new_place.prv = self

    def iterate(self, func):
        '''Apply func to all elements of the list,
        starting from self and ending with self.prev.'''
        func(self)
        current = self.nxt
        while current is not self:
            func(current)
            current = current.nxt

    def find(self, func):
        '''Find a node by returning the first one
        that returns True to a given function.'''
        if func(self) is True:
            return self
        current = self.nxt
        while current is not self:
            if func(current) is True:
                return current
            current = current.nxt
        raise ValueError("Couldn't find a node matching the given function")


def read_file(filename: str) -> list:
    '''Parse the input file as an array of ints.'''
    with open(filename, 'r', encoding='utf-8-sig') as f:
        nums = [int(i.strip()) for i in f.readlines()]
    return nums


def nodes_from_list(int_list: list, decryption_key: int = 1) -> list:
    '''From the initial list of ints, create a list of Node objects.'''
    nodes = [Node(i * decryption_key) for i in int_list]
    for idx, i in enumerate(nodes):
        i.prv = nodes[idx-1]
        i.nxt = nodes[idx+1] if len(nodes) > idx+1 else nodes[0]
    return nodes


def solution(inp: list, key=1, rounds=1) -> int:
    nodes = nodes_from_list(inp, key)
    # math.fmod(i.value, len(nodes)) gives an off by one error,
    # shifting the node one position less than it should.
    # I don't know why this is the case, but reducing the length of
    # the list by one seems to solve it.
    # Getting the remainder is useful to avoid unnecessary cycles
    # while iterating through the linked list,
    # not needed for part 1, but definitely so for part 2.
    for _ in range(rounds):
        for i in nodes:
            i.mix(int(math.fmod(i.value, len(nodes)-1)))
    zero = nodes[0].find(lambda x: x.value == 0)
    tup = (1000 % len(nodes),
           2000 % len(nodes),
           3000 % len(nodes))
    return sum((zero.walk(i).value for i in tup))


if __name__ == '__main__':
    try:
        input_list = read_file(sys.argv[1])
        print(f'Part 1: {solution(input_list)}')
        print(f'Part 2: {solution(input_list, KEY, 10)}')
    except IndexError:
        print(f'Usage: {sys.argv[0]} [input_file.txt]', file=sys.stderr)
    except FileNotFoundError:
        print(f'''"{sys.argv[1]}" is not a file or it couldn't be read.''',
              file=sys.stderr)
