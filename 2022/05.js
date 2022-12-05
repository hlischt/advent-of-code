function crateLine(line, arr) {
	for (let i = 1; i < line.length; i += 4) {
		if (line[i] !== ' ') {
			const idx = (i - 1) / 4;
			arr[idx].push(line[i]);
		}
	}
}

function textToStacks(input) {
	const reverseStacks = input.split('\n').reverse();
	const stackNum = Number(
		reverseStacks[0].trim()
			.match(/\b\d+\b/g).at(-1),
	);
	const stackArr = [];
	for (let i = 0; i < stackNum; i++) {
		stackArr.push([]);
	}
	for (let i of reverseStacks.slice(1)) {
		crateLine(i, stackArr);
	}
	return stackArr;
}

function parseInstruction(ins) {
	const re = /move (\d+) from (\d+) to (\d+)/i;
	return ins.match(re).slice(1).map(Number);
}

function move(stacks, howMany, from, to) {
	for (let i = 0; i < howMany; i++) {
		const popped = stacks[from - 1].pop();
		stacks[to - 1].push(popped);
	}
}

function move9001(stacks, howMany, from, to) {
	const popped = [];
	for (let i = 0; i < howMany; i++) {
		popped.unshift(stacks[from - 1].pop());
	}
	stacks[to - 1].push(...popped);
}

function solution(input, moveFunc) {
	const [stacks, ins] = input.split('\n\n');
	const instructions = ins.trim().split('\n').map(parseInstruction);
	const stackArr = textToStacks(stacks);
	for (let i of instructions) {
		moveFunc(stackArr, ...i);
	}
	return stackArr.reduce((acc, item) => acc + item.at(-1), '');
}

const part1 = (x) => solution(x, move);
const part2 = (x) => solution(x, move9001);
