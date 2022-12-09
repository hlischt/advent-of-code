'use strict';

function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.neighbors = function (point) {
	return (Math.abs(this.x - point.x) <= 1 &&
		Math.abs(this.y - point.y) <= 1);
};

Point.prototype.move = function (direction, following = null) {
	// Moves only 1 cell
	const dirs = {
		U: [0, 1],
		D: [0, -1],
		R: [1, 0],
		L: [-1, 0],
	};
	const [x, y] = dirs[direction];
	if (following) {
		this.moveFollowing(following);
	} else {
		this.x += x;
		this.y += y;
	}
};

Point.prototype.moveFollowing = function (following) {
	if (!this.neighbors(following)) {
		if (following.x === this.x) {
			following.y > this.y ? this.y++ : this.y--;
		} else if (following.y === this.y) {
			following.x > this.x ? this.x++ : this.x--;
		} else {
			this.x += Math.sign(following.x - this.x);
			this.y += Math.sign(following.y - this.y);
		}
	}
};

function Rope(size) {
	if (size < 1) {
		throw new Error('Rope size must be at least 1');
	}
	this.knots = [];
	for (let i = 0; i < size; i++) {
		this.knots.push(new Point(0, 0));
	}
}

Rope.prototype.move = function (direction, number, set = null) {
	for (let i = 0; i < number; i++) {
		for (const [idx, knot] of this.knots.entries()) {
			if (idx === 0) {
				knot.move(direction);
			} else {
				knot.move(direction, this.knots[idx - 1]);
			}
		}
		if (set) {
			const last = this.knots.at(-1);
			set.add([last.x, last.y].toString());
		}
	}
};

function parseInput(textInput) {
	const strings = textInput.trim().split('\n').map((x) => x.split(' '));
	for (const [idx, i] of strings.entries()) {
		strings[idx][1] = Number(i[1]);
	}
	return strings;
}

function solution(textInput, ropeLength) {
	const input = parseInput(textInput);
	const rope = new Rope(ropeLength);
	const set = new Set();
	set.add('0,0');
	for (const i of input) {
		rope.move(...i, set);
	}
	return set.size;
}

const part1 = (x) => solution(x, 2);
const part2 = (x) => solution(x, 10);
