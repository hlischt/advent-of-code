const logic = {
		// winner: 'loser'
		rock: 'scissors',
		paper: 'rock',
		scissors: 'paper'
};
const options = ['rock', 'paper', 'scissors'];
options.loseAgainst = function (num) {
		return mod((num - 1), this.length);
};
options.winAgainst = function (num) {
		return (num + 1) % this.length;
};

function mod(num, limit) {
		return ((num % limit) + limit) % limit;
}

function getNumber(char) {
		if (['A', 'B', 'C'].includes(char)) {
				return char.codePointAt() - 64;
		}
    if (['X', 'Y', 'Z'].includes(char)) {
				return char.codePointAt() - 87;
		}
		throw new Error('Invalid input (not "A", "B", "C", "X", "Y", "Z")');
}

function rps(opponent, you) {
		let [oppVal, youVal] = [getNumber(opponent), getNumber(you)];
		if (oppVal === youVal) return youVal + 3;
		if (logic[options[oppVal-1]] === options[youVal-1]) {
				return youVal;
		}
		return youVal + 6;
}

function parseInput(input) {
		return input.trim().split('\n').map(x => x.split(' '));
}

function part1(input) {
		return parseInput(input).map(x => rps(...x))
				.reduce((acc, item) => acc+item, 0);
}

function part2(input) {
		const conditions = {
				X: (x => options.loseAgainst(options.indexOf(x)) + 1),
				Y: (x => options.indexOf(x) + 4),
				Z: (x => options.winAgainst(options.indexOf(x)) + 7)
		};
		let count = 0;
		for (let i of parseInput(input)) {
				const func = conditions[i[1]];
				count += func(options[getNumber(i[0])-1]);
		}
		return count;
}
