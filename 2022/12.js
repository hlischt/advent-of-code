function parseInput(textInput) {
	let input = textInput.trim().split('\n').map((x) => x.split(''));
	let [start, end] = [null, null];
	for (let [idx, i] of input.entries()) {
		for (let [jdx, j] of i.entries()) {
			if (j === 'S') start = [idx, jdx];
			else if (j === 'E') end = [idx, jdx];
		}
	}
	if (start === null || end === null) {
		throw new Error('No start or end position found');
	}
	input = input.map((row) =>
		row.map((item) => {
			switch (item) {
				case 'S':
					return 0;
				case 'E':
					return 25;
				default:
					return item.charCodeAt() - 97;
			}
		})
	);
	return {
		map: input,
		start: start,
		end: end,
	};
}

// Add as matrix method
function neighbors(row, column) {
	let makeObject = (r, c) => ({
		value: this[r][c],
		row: r,
		col: c,
	});
	if (this.length < 2 || this[0].length < 2) {
		throw new Error('Matrix must be at least 2x2 in size');
	}
	let nb = [];
	if (0 <= row && row < this.length - 1) {
		nb.push(makeObject(row + 1, column));
	}
	if (0 < row && row <= this.length) {
		nb.push(makeObject(row - 1, column));
	}
	if (0 <= column && column < this[0].length - 1) {
		nb.push(makeObject(row, column + 1));
	}
	if (0 < column && column <= this[0].length) {
		nb.push(makeObject(row, column - 1));
	}
	return nb;
}

function bfs(start, end, input) {
	let queue = [start];
	let cameFrom = new Map();
	cameFrom.set(start.toString(), null);
	while (queue.length > 0) {
		let current = queue.shift();
		if (current.toString() === end.toString()) {
			break;
		}
		for (let i of input.neighbors(...current)) {
			if (
				i.value <= input[current[0]][current[1]] + 1 &&
				!cameFrom.has([i.row, i.col].toString())
			) {
				cameFrom.set([i.row, i.col].toString(), current.toString());
				queue.push([i.row, i.col]);
			}
		}
	}
	return cameFrom;
}

function countPath(map, end) {
	let count = 1;
	let current = map.get(end.toString());
	while (map.get(current)) {
		count++;
		current = map.get(current);
	}
	return count;
}

function findZeros(input) {
	let zeros = [];
	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[i].length; j++) {
			if (
				input[i][j] === 0 && input.neighbors(i, j)
						.filter((x) => x.value === 1).length > 0
			) {
				zeros.push([i, j]);
			}
		}
	}
	return zeros;
}

function part1(textInput) {
	let { map: input, start, end } = parseInput(textInput);
	input.neighbors = neighbors;
	let path = bfs(start, end, input);
	return countPath(path, end.toString());
}

// SLOW... But about 2.5x faster than the previous version
// thanks to the second condition in findZeros
function part2(textInput) {
	let { map: input, start, end } = parseInput(textInput);
	input.neighbors = neighbors;
	let zeros = findZeros(input);
	let steps = [];
	for (let z of zeros) {
		let path = bfs(z, end, input);
		let count = countPath(path, end.toString());
		if (count > 1) {
			steps.push(count);
		}
	}
	return Math.min(...steps);
}
