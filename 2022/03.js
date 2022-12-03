function containers(arr) {
	const len = Math.floor(arr.length / 2);
	return [arr.slice(0, len), arr.slice(len, arr.length)];
}

function priority(letter) {
	const upper = [...Array(26).keys()].map((x) => String.fromCodePoint(x + 65));
	const lower = upper.map((x) => x.toLowerCase());
	const upIndex = upper.indexOf(letter);
	const lowIndex = lower.indexOf(letter);
	if (upIndex !== -1) {
		return upIndex + 27;
	} else if (lowIndex !== -1) {
		return lowIndex + 1;
	}
	throw new Error(`${letter} is not a letter in "A".."Z" or "a".."z"`);
}

function repeated(rucksack) {
	const rs = containers(rucksack);
	const letters = new Set(rs[0]);
	for (let i of rs[1]) {
		if (letters.has(i)) {
			return priority(i);
		}
	}
	throw new Error('No repeated item type found');
}

function parseInput(input) {
	return input.trim().split('\n');
}

function groupsOf3(parsedInput) {
	const groups = [];
	let c = 0;
	while (c in parsedInput) {
		if (c % 3 == 0) {
			groups.push([parsedInput[c]]);
		} else {
			groups[Math.floor(c / 3)].push(parsedInput[c]);
		}
		c++;
	}
	return groups;
}

function commonInGroup(group) {
	for (let ch of group[0]) {
		if (group[1].includes(ch) && group[2].includes(ch)) {
			return ch;
		}
	}
	throw new Error('No common item found in group');
}

function part1(input) {
	return parseInput(input).map(repeated)
		.reduce((acc, item) => acc + item, 0);
}

function part2(input) {
	return groupsOf3(parseInput(input)).map(commonInGroup).map(priority)
		.reduce((acc, item) => acc + item, 0);
}
