function line(p1, p2) {
	let sameIdx = null;
	let [from, to] = [null, null];
  if (p1[0] === p2[0]) {
		sameIdx = 0;
    [from, to] = [p1[1], p2[1]];
  } else if (p1[1] === p2[1]) {
		sameIdx = 1;
    [from, to] = [p1[0], p2[0]];
  } else {
    throw new RangeError('One coordinate must be the same in both inputs');
  }
	let path = [];
	for (let i = Math.min(from, to); i <= Math.max(from, to); i++) {
		if (sameIdx === 0) {
			path.push([p1[sameIdx], i]);
		} else {
			path.push([i, p1[sameIdx]]);
		}
  }
	return path;
}

function nextPos([x, y], map) {
  if (!map.has([x, y+1].toString())) {
    return [x, y+1];
  } else  if (!map.has([x-1, y+1].toString())) {
    return [x-1, y+1];
  } else  if (!map.has([x+1, y+1].toString())) {
    return [x+1, y+1];
  }
  return [x, y];
}

function initMap(map, input) {
	for (let l of input) {
		for (let i = 0; i < l.length - 1; i++) {
			line(l[i], l[i+1])
				.forEach(x => map.set(x.toString(), 'r'));
    }
	}
}

function sandDestination(origin, map, height, part = 1) {
  let np = nextPos(origin, map);
	let nnp = nextPos(np, map);
	while (np.toString() !== nnp.toString()) {
		if (part === 1) {
			if (np[1] >= height) {
				throw new Error('Unit of sand falls to the void');
			}
		} else {
			if (nnp[1] >= height) {
				return np;
			}
		}
    np = nnp;
		nnp = nextPos(nnp, map);
  }
	return np;
}

function parseInput(textInput) {
	const input = textInput.trim().split('\n')
				.map(x => x.split(' -> '));
	return input.map(x => x.map(y => y.split(',').map(Number)));
}

function part1(textInput) {
	const input = parseInput(textInput);
	const sandOrigin = [500, 0];
	const map = new Map();
	const height = Math.max(...input.flat().map(x => x[1]));
	initMap(map, input);
	let count = 0;
	try {
		for (;;) {
			map.set(sandDestination(sandOrigin, map, height).toString(), 's');
      count++;
		}
	} catch (e) {
		// return count;
	}
	return count;
}

// Runs quite slowly (3.4 seconds on my machine)
// Guess there's plenty of room for optimization... Maybe later
function part2(textInput) {
	const input = parseInput(textInput);
	const sandOrigin = [500, 0];
	const map = new Map();
	const floor = Math.max(...input.flat().map(x => x[1])) + 2;
	initMap(map, input);
	let count = 0;
	for (;;) {
		if (map.has(sandOrigin.toString())) {
			break;
		}
		let pos = sandDestination(sandOrigin, map, floor, 2);
		if (map.has(pos.toString())) {
			break;
		}
		map.set(pos.toString(), 's');
		count++;
	}
	return count;
}
