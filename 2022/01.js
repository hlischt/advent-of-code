const input = document.querySelector('pre').textContent;
const common = (item) =>
	item.split('\n\n')
		.map((item) =>
			item.trim().split('\n')
				.reduce((acc, item) => Number(item) + acc, 0)
		)
		.sort((a, b) => b - a);
const sol1 = (item) => common(input)[0];
const sol2 = (item) =>
	common(input).slice(0, 3)
		.reduce((acc, item) => acc + item, 0);
console.log(`Part 1: ${sol1(input)}\nPart 2: ${sol2(input)}`);
