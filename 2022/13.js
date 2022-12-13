function recurse(pair) {
  let [left, right] = pair;
  for (let idx = 0; idx < left.length && idx < right.length; idx++) {
    let [l, r] = [left[idx], right[idx]];
    if (typeof l === 'number' && typeof r === 'number') {
      if (l < r) return true;
      if (l > r) return false;
    } else if (l instanceof Array && r instanceof Array) {
      let arrayComparison = recurse([l,r]);
      if (arrayComparison !== null) {
        return arrayComparison;
      }
    } else {
      if (typeof l === 'number') {
        l = [l];
      } else {
        r = [r];
      }
      let arrayComparison = recurse([l,r]);
      if (arrayComparison !== null) {
        return arrayComparison;
      }
    }
  }
  if (left.length < right.length) return true;
  if (left.length > right.length) return false;
  return null; // left and right are identical lists
}

function compareLists(a, b) {
  let result = recurse([a, b]);
  if (result) return -1;
  else return 1;
}

function parseInput(textInput) {
	let input = textInput.trim().split('\n\n');
	// Let's hope eval doesn't do anything bad
	return input.map(x => x.split('\n').map(eval));
}

function part1(textInput) {
	const input = parseInput(textInput);
	return input.map(recurse).map((x, idx) => x ? idx+1 : 0)
		.reduce((acc, item) => acc + item, 0);
}

function part2(textInput) {
	const input = parseInput(textInput);
	const dividers = [
		[[2]],
		[[6]],
	];
	input.push(dividers);
	const packets = input.flat().sort(compareLists).map(JSON.stringify);
	return (packets.indexOf('[[2]]') + 1) *
		(packets.indexOf('[[6]]') + 1);
}
