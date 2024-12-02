#include "aoc.h"
#include <string.h>

#define LEN 64

bool is_intarr_safe(int nums[], size_t size) {
	int increase = nums[0] < nums[1] ? 1 : nums[0] > nums[1] ? -1 : 0;
	if (increase == 0) {
		return false;
	}
	for (size_t i = 1; i < size; i++) {
		int diff = abs(nums[i-1] - nums[i]);
		if (diff < 1 || 3 < diff) {
			return false;
		}
		int incnew = nums[i-1] < nums[i] ? 1 :
			nums[i-1] > nums[i] ? -1 : 0;
		if (incnew == 0 || incnew != increase) {
			return false;
		}
	}
	return true;
}

bool is_safe_with_tolerance(int nums[], size_t size) {
	for (size_t skip = 0; skip < size; skip++) {
		int less_nums[LEN] = {0};
		size_t ln_idx = 0;
		for (size_t i = 0; i < size; i++) {
			if (i == skip) {
				continue;
			}
			less_nums[ln_idx] = nums[i];
			ln_idx++;
		}
		if (is_intarr_safe(less_nums, ln_idx)) return true;
	}
	return false;
}

size_t parse_line(char *line, int nums[]) {
	char *token;
	size_t num_len;
	token = strtok(line, " ");
	nums[0] = strtol(token, NULL, 10);
	for (num_len = 1; token != NULL; num_len++) {
		token = strtok(NULL, " ");
		if (token != NULL) {
			nums[num_len] = strtol(token, NULL, 10);
		}
	}
	num_len--;
	return num_len;
}

struct answer day02(FILE *input) {
	struct answer answer = {0, 0};
	char line[BUFLEN] = {0};
	while (fgets(line, sizeof line, input) != NULL) {
		line[strcspn(line, "\n")] = '\0';
		int nums[LEN] = {0};
		size_t nums_size = parse_line(line, nums);
		if (is_intarr_safe(nums, nums_size)) answer.silver++;
		if (is_safe_with_tolerance(nums, nums_size)) answer.gold++;
	}
	return answer;
}
