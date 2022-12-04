function overlaps(arr1, arr2, part = 1) {
	if (![1, 2].includes(part)) {
		throw new Error('Argument "part" must be either 1 or 2');
	}
	const startEnd = part === 1 ? 'end' : 'start';
	arr1.start = arr1[0];
	arr1.end = arr1[1];
	arr2.start = arr2[0];
	arr2.end = arr2[1];
	return (arr1.start <= arr2.start && arr2[startEnd] <= arr1.end) ||
		(arr2.start <= arr1.start && arr1[startEnd] <= arr2.end);
}

function parseInput(textInput) {
	return textInput.trim().split('\n')
		.map((x) =>
			x.split(',')
				.map((y) =>
					y.split('-')
						.map(Number)
				)
		);
}

function part1(textInput) {
	return parseInput(textInput).map((x) => overlaps(...x))
		.reduce((acc, item) => acc + Number(item), 0);
}

function part2(textInput) {
	return parseInput(textInput).map((x) => overlaps(...x, 2))
		.reduce((acc, item) => acc + Number(item), 0);
}
