BEGIN {
	hrz = 0;
	depth = 0;
	aim = 0;
}

$1 == "forward" {
	hrz += $2;
	depth += ($2 * aim)
}

$1 == "up" {
	aim -= $2;
}

$1 == "down" {
	aim += $2;
}

END {
	print (depth * hrz);
}
