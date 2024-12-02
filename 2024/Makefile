DEBUGFLAGS = -O0 -g3 -fsanitize=undefined,bounds,address
# DEBUGFLAGS = -O3
CFLAGS = -std=c99 -Wall -Werror -Wpedantic -Wextra -Wvla $(DEBUGFLAGS)
PREREQS = main.o 01.o 02.o

all: 2024

2024: $(PREREQS)
	$(CC) $(CFLAGS) $(LDFLAGS) -o $@ $(PREREQS) $(LDLIBS)
main.o: aoc.h
day01.o: aoc.h
day02.o: aoc.h

clean:
	rm -f *.o
	rm -f 2024
