function Dir(name, parent = null) {
	this.name = name;
	this.type = 'dir';
	this.children = null;
	this.parent = parent;
}

function FileObj(name, size) {
	this.name = name;
	this.type = 'file';
	this.size = +size;
}

const totalSpace = 70000000;
const neededSpace = 30000000;
const fs = new Dir('/');

function parseInput(textInput) {
	return textInput.split('$ ').slice(1)
		.map(x => x.trim().split('\n'));
}

function cd(dir, current) {
	if (dir === '..') {
		return current.parent;
	}
	if (dir === '/') {
		return fs;
	}
	for (let i of current.children) {
		if (i.name === dir) {
			return i;
		}
	}
  throw new Error(`No subdirectory ${dir} in ${current.name}`);
}

function ls(items, current) {
	current.children = items.map(x => x.split(' '))
		.map(x => x[0] === 'dir' ? new Dir(x[1], current) : new FileObj(x[1], x[0]));
	return current;
}

function run(command, current) {
	if (command[0].startsWith('cd')) {
		return cd(command[0].split(' ')[1], current);
	} else {
		return ls(command.slice(1), current);
	}
}

function dirSize(dir) {
	if (dir.size) return dir.size;
  let size = 0;
  for (let i of dir.children) {
    if (i.type === 'dir') {
      size += dirSize(i);
    } else {
      size += i.size;
    }
  }
	dir.size = size;
  return size;
}

function dfsSizes(dir) {
  let lessthan = [];
  let traversed = new Set();
  let s = [];
  let current;
  s.push(dir);
  while (s.length > 0) {
    current = s.pop();
    if (current.type === 'dir' && current.size <= 100000) {
      lessthan.push(current);
    }
    if (!traversed.has(current)){
      traversed.add(current);
      if (current.children) {
        for (let i of current.children) {
					s.push(i);
				}
			}
    }
  }
  return lessthan.reduce((acc, item) => acc + item.size, 0);
}

function wouldFreeEnough(dir) {
  return totalSpace - (fs.size - dir.size) > neededSpace;
}

// Too tired to modularize properly
// Enjoy a copypaste of the previous function
function dfsSizes2(dir) {
  let smallest = null;
  let traversed = new Set();
  let s = [];
  let current;
  s.push(dir);
  while (s.length > 0) {
    current = s.pop();
    if (current.type === 'dir' && wouldFreeEnough(current)) {
      if (smallest === null || smallest.size > current.size) {
        smallest = current;
      }
    }
    if (!traversed.has(current)){
      traversed.add(current);
      if (current.children) {
        for (let i of current.children) {
          s.push(i);
        }
      }
    }
  }
  return smallest;
}

function part1(textInput) {
	let input = parseInput(textInput);
	let current = fs;
	for (let i of input) {
		current = run(i, current);
	}
	dirSize(fs);
	return dfsSizes(fs);
}

function part2(textInput) {
	let input = parseInput(textInput);
	let current = fs;
	if (fs.children) {
		return dfsSizes2(fs);
	}
	for (let i of input) {
		current = run(i, current);
	}
	dirSize(fs);
	return dfsSizes2(fs);
}
