function part1(textInput) {
	return Array.from(textInput.matchAll(/mul\((\d+),(\d+)\)/g))
		.map(x => +x[1] * +x[2])
  	.reduce((acc, item) => acc + item, 0);
}

function part2(textInput) {
	let regexp = /(?:mul\((\d+),(\d+)\)|do(?:n't)?\(\))/g;
	let instr = Array.from(textInput.matchAll(regexp));
  let enabled = true;
  let count = 0;
  for (let i of instr) {
    if (i[0] == 'do()') enabled = true;
    else if (i[0] == "don't()") enabled = false;
    else if (enabled) {
      count += +i[1] * i[2];
    }
  }
  return count;
}
