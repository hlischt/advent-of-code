#include <stdio.h>
#include <stdlib.h>

#define BUFLEN 1024

struct answer {
	long silver;
	long gold;
};

void append(int **list, int num, size_t idx, size_t *size) {
	if (idx >= *size) {
		*size = *size * 2;
		*list = realloc(*list, *size);
	}
	(*list)[idx] = num;
}

int compare_ints(const void *a, const void *b) {
	const int *aa = a;
	const int *bb = b;
	if (*aa < *bb) return -1;
	else if (*aa == *bb) return 0;
	return 1;
}

struct answer day01(FILE *input) {
	struct answer answer = {0, 0};
	char line[BUFLEN] = {0};
	size_t list1_size = BUFLEN;
	size_t list2_size = BUFLEN;
	int *list1 = malloc(list1_size * sizeof(int));
	int *list2 = malloc(list2_size * sizeof(int));
	size_t i = 0;
	for (; fgets(line, sizeof line, input) != NULL; i++) {
		int a, b;
		int read = sscanf(line, "%d %d", &a, &b);
		if (read != 2) {
			free(list1); free(list2);
			return answer;
		}
		list1[i] = a;
		list2[i] = b;
	}
	/*
	  Too lazy to implement a hash table right now.

	  Input is small enough for an O(n^2) solution
	  to be very fast.
	*/
	for (size_t idx = 0; idx < i; idx++) {
		int times = 0;
		for (size_t jdx = 0; jdx < i; jdx++) {
			if (list1[idx] == list2[jdx]) {
				times++;
			}
		}
		answer.gold += list1[idx] * times;
	}
	qsort(list1, i, sizeof(int), compare_ints);
	qsort(list2, i, sizeof(int), compare_ints);
	for (size_t idx = 0; idx < i; idx++) {
		int dist = abs(list1[idx] - list2[idx]);
		answer.silver += dist;
	}
	free(list1); free(list2);
	return answer;
}

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
	struct answer answer = day01(input);
	printf("Part 1:\t%ld\nPart 2:\t%ld\n", answer.silver, answer.gold);
	fclose(input);
	return EXIT_SUCCESS;
}
