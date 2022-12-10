'use strict';

function CPU() {
	this.cycle = 0;
	this.x = 1;
	this.instructionQueue = [];
}

CPU.prototype.schedule = function (ins) {
	this.instructionQueue.push(...this.parseInstruction(ins));
};

CPU.prototype.parseInstruction = function (ins) {
	if (ins.startsWith('noop')) {
		return [() => {}];
	} else if (ins.startsWith('addx')) {
		const value = Number(ins.split(' ')[1]);
		return [() => {}, () => {
			this.x += value;
		}];
	}
	throw new Error(`${ins} is not a valid instruction`);
};

CPU.prototype.run = function () {
	if (this.instructionQueue.length === 0) return;
	(this.instructionQueue.shift())();
	this.cycle++;
};

CPU.prototype.reset = function () {
	this.cycle = 0;
	this.x = 1;
	this.instructionQueue = [];
};

function parseInput(textInput) {
	return textInput.trim().split('\n');
}

function part1(textInput) {
	const input = parseInput(textInput);
	const cpu = new CPU();
	for (const i of input) {
		cpu.schedule(i);
	}
	const values = [];
	const limit = cpu.instructionQueue.length;
	for (let i = 0; i < limit; i++) {
		if (cpu.cycle === 19 || (cpu.cycle - 20) % 40 === 39) {
			values.push(cpu.x);
		}
		cpu.run();
	}
	return values.map((x, idx) => ((idx * 40) + 20) * x)
		.reduce((acc, item) => acc + item, 0);
}

function part2(textInput) {
	const input = parseInput(textInput);
	const cpu = new CPU();
	const crt = [];
	input.forEach((x) => cpu.schedule(x));
	const limit = cpu.instructionQueue.length;
	for (let i = 0; i < limit; i++) {
		crt.push(
			cpu.x - 1 === i % 40 ||
				cpu.x === i % 40 ||
				cpu.x + 1 === i % 40,
		);
		cpu.run();
	}
	const output = crt.map((x) => x ? '#' : ' ').join('')
		.match(/.{40}/g).join('\n');
	console.log(output);
}
