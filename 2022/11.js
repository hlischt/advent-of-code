'use strict';

function Monkey(text) {
	const lines = text.trim().split('\n');
	this.items = lines[1].match(/\d+/g).map(Number);
	this.operation = new Function(
		'old',
		'return ' +
			lines[2].split('= ')[1] + ';',
	);
	this.divBy = Number(lines[3].match(/\d+/)[0]);
	this.true = Number(lines[4].match(/\d+/)[0]);
	this.false = Number(lines[5].match(/\d+/)[0]);
	this.timesInspected = 0;
}

Monkey.prototype.inspect = function (modulo = null) {
	let level = this.operation(this.items.shift());
	if (modulo) {
		// Without using the % operation,
		// level would be too big to represent with normal ints.
		// The argument "modulo" is a number divisible by
		// all divisibility tests from the monkeys.
		// This code multiplies all of them,
		// but the lowest common multiple would suffice.
		// At least that's what I understood, looking for a hint
		// after BigInt threw a 'too big' error for some reason.
		level = level % modulo;
	} else {
		level = Math.floor(level / 3);
	}
	this.timesInspected++;
	return [this.throwTo(level), level];
};

Monkey.prototype.throwTo = function (level) {
	return this[level % this.divBy === 0];
};

function round(monkeyArr, part) {
	for (const monkey of monkeyArr) {
		const times = monkey.items.length;
		for (let i = 0; i < times; i++) {
			const result = monkey.inspect(part === 1 ? null : monkeyArr.modulo);
			monkeyArr[result[0]].items.push(result[1]);
		}
	}
}

function parseInput(textInput) {
	const input = textInput.trim().split('\n\n');
	const monkeys = [];
	for (const i of input) {
		monkeys.push(new Monkey(i));
	}
	return monkeys;
}

function solution(textInput, part) {
	const monkeys = parseInput(textInput);
	monkeys.modulo = monkeys.reduce((acc, item) => acc * item.divBy, 1);
	const iterations = part === 1 ? 20 : 10000;
	for (let i = 0; i < iterations; i++) {
		round(monkeys, part);
	}
	return monkeys.sort((a, b) => b.timesInspected - a.timesInspected)
		.slice(0, 2)
		.reduce((acc, item) => acc * item.timesInspected, 1);
}

const part1 = (x) => solution(x, 1);
const part2 = (x) => solution(x, 2);
