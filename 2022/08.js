function visibleInRow(arr, reverse = false) {
	const tallest = [{
		idx: reverse ? arr.length - 1 : 0,
		height: arr[reverse ? arr.length - 1 : 0],
	}];
	for (const [idx, i] of (reverse ? [...arr.entries()].reverse() : arr.entries())) {
		if (idx === 0 || idx === arr.length - 1) continue;
		if (i > tallest.at(-1).height) {
			tallest.push({
				idx: idx,
				height: i,
			});
		}
	}
	return tallest;
}

function scenicScore(arr, x, y) {
	let [left, right, up, down] = [0, 0, 0, 0];
	const tree = arr[y][x];
	for (let i = x + 1; i < arr[y].length; i++) { // right
		right++;
		if (arr[y][i] >= tree) break;
	}
	for (let i = x - 1; i >= 0; i--) { // left
		left++;
		if (arr[y][i] >= tree) break;
	}
	for (let i = y - 1; i >= 0; i--) { // up
		up++;
		if (arr[i][x] >= tree) break;
	}
	for (let i = y + 1; i < arr.length; i++) { // down
		down++;
		if (arr[i][x] >= tree) break;
	}
	return up * left * down * right;
}

function transpose(arr) {
	// https://stackoverflow.com/a/17428705
	return arr[0].map((_, idx) => arr.map((row) => row[idx]));
}

function parseInput(textInput) {
	return textInput.trim().split('\n').map((x) => x.split('').map(Number));
}

function part1(textInput) {
	const input = parseInput(textInput);
	const sets = input.map((x) => [...visibleInRow(x), ...visibleInRow(x, true)])
		.map((x) => new Set(x.map((y) => y.idx)));
	const tr = transpose(input)
		.map((x) => [...visibleInRow(x), ...visibleInRow(x, true)]);
	tr.forEach((item, idx) => item.forEach((obj) => sets[obj.idx].add(idx)));
	return sets.reduce((acc, item) => acc + item.size, 0);
}

function part2(textInput) {
	const input = parseInput(textInput);
	let best = 0;
	for (let y = 0; y < input.length; y++) {
		for (let x = 0; x < input[y].length; x++) {
			const score = scenicScore(input, x, y);
			if (score > best) {
				best = score;
			}
		}
	}
	return best;
}
