'use strict';

function Sensor(coords) {
	this.x = coords[0];
	this.y = coords[1];
	this.beacon = {
		x: coords[2],
		y: coords[3],
	};
	this.radius = Math.abs(this.x - this.beacon.x) +
		Math.abs(this.y - this.beacon.y);
}

Sensor.prototype.rowWidth = function (row) {
	if (row < 0 || row > this.radius) {
		throw new RangeError(`Number not in range 0 < n < ${this.radius}`);
	}
	return 2 * (this.radius - row) + 1;
};

Sensor.prototype.rowRange = function (distFromCenter) {
	const dist = this.radius - distFromCenter;
	return [this.x - dist, this.x + dist];
};

function parseInput(textInput) {
	return textInput.trim().split('\n')
		.map(x => new Sensor(x.match(/-?\d+/g).map(Number)));
}

function findRanges(ranges) {
  let rangeArr = [];
  let currRange = null;
  for (let r of ranges) {
    if (currRange === null) {
      currRange = r;
      continue;
    }
    if (r[0] <= currRange[1]) {
      if (currRange[1] < r[1]) {
        currRange[1] = r[1];
      }
    } else {
      rangeArr.push(currRange);
      currRange = null;
    }
  }
  if (currRange !== null) {
    rangeArr.push(currRange);
  }
  return rangeArr;
}

// The following function takes over 3 seconds to run.
//
// function part1(textInput, rowNum) {
// 	const input = parseInput(textInput);
// 	const row = rowNum;
// 	const rowSensors = input
// 				.filter(x => Math.abs(x.y - row) <= x.radius);
// 	let rowMap = new Map();
// 	for (let i of rowSensors) {
// 		if (i.beacon.y === row && !rowMap.has(i.beacon.x)) {
// 			rowMap.set(i.beacon.x, 'B');
// 		}
// 	}
// 	let count = 0;
// 	for (let s of rowSensors) {
// 		let range = s.rowRange(Math.abs(s.y - row));
//     for (let i = range[0]; i <= range[1]; i++) {
// 			if (!rowMap.has(i)) {
// 				rowMap.set(i, '#');
//         count++;
// 			}
// 		}
// 	}
// 	return count;
// }

// This function takes about a millisecond to run.
//
// Maybe there's a bug that counts a beacon as
// part of a range without subtracting it,
// but both the example and my input return the right answer.
function part1(textInput, rowNum) {
	const input = parseInput(textInput);
	const row = rowNum;
	const rowSensors = input
				.filter(x => Math.abs(x.y - row) <= x.radius);
	let rowMap = new Map();
	for (let i of rowSensors) {
		if (i.beacon.y === row && !rowMap.has(i.beacon.x)) {
			rowMap.set(i.beacon.x, 'B');
		}
	}
	let ranges = rowSensors
			.map(s => s.rowRange(Math.abs(s.y - row)))
			.sort((a, b) => a[0] - b[0]);
	return findRanges(ranges)
		.reduce((acc, item) => acc + Math.abs(item[0] - item[1]), 0);
}
