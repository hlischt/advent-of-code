const logic = {
		// winner: 'loser'
		rock: 'scissors',
		paper: 'rock',
		scissors: 'paper'
};
const meaning = {
		A: 'rock', X: 'rock',
		B: 'paper', Y: 'paper',
		C: 'scissors', Z: 'scissors',
};
const options = ['rock', 'paper', 'scissors'];

options.loserAgainst = function (num) {
		return mod((num - 1), this.length);
};

options.winnerAgainst = function (num) {
		return (num + 1) % this.length;
};

function mod(num, limit) {
		return ((num % limit) + limit) % limit;
}

function rps(opponent, you) {
		const points = you.codePointAt() - 87; // 'X' is ASCII 88
		if (meaning[opponent] === meaning[you]) { // draw
				return points + 3;
		}
		if (logic[meaning[opponent]] === meaning[you]) { // opponent wins
				return points;
		}
		return points + 6; // you win
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
				X: (x => options.loserAgainst(options.indexOf(x)) + 1),
				Y: (x => options.indexOf(x) + 4),
				Z: (x => options.winnerAgainst(options.indexOf(x)) + 7)
		};
		let count = 0;
		for (let i of parseInput(input)) {
				const func = conditions[i[1]];
				count += func(meaning[i[0]]);
		}
		return count;
}
