#ifndef AOC_H
#define AOC_H

#include <stdio.h>
#include <stdlib.h>

#define BUFLEN 1024

struct answer {
	long silver;
	long gold;
};

struct answer day01(FILE*);

#endif
