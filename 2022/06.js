function markerPos(data, offset) {
	for (let idx = 0; idx + offset <= data.length; idx++) {
		if (idx + offset > data.length) {
			break;
		}
		const set = new Set(data.slice(idx, idx + offset));
		if (set.size === offset) {
			return idx + offset;
		}
	}
	throw new Error('No packet marker marker found');
}

function part1(textInput) {
	return markerPos(textInput, 4);
}

function part2(textInput) {
	return markerPos(textInput, 14);
}
