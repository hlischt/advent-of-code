#include <stdio.h>
#include <stdlib.h>

#include "aoc.h"

struct answer (*funcs[]) (FILE*) = {
	day01
};

int main(int argc, char **argv) {
	if (argc != 3) {
		fprintf(stderr, "Usage: %s [day_number] [input_file]\n",
			argv[0]);
		return EXIT_FAILURE;
	}
	char *endptr = NULL;
	int day = strtol(argv[1], &endptr, 10);
	if (*endptr != '\0' || day < 1 || 25 < day) {
		fprintf(stderr, "Usage: %s [day_number] [input_file]\n",
			argv[0]);
		fprintf(stderr, "Error: \"%s\" is not a valid day number.\n",
			argv[1]);
		return EXIT_FAILURE;
	}
	FILE *input = fopen(argv[2], "r");
	if (input == NULL) {
		perror(argv[2]);
		return EXIT_FAILURE;
	}
	struct answer answer = funcs[day-1](input);
	printf("Part 1:\t%ld\nPart 2:\t%ld\n", answer.silver, answer.gold);
	fclose(input);
	return EXIT_SUCCESS;
}
