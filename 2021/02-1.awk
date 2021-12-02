BEGIN {
	hrz = 0;
	depth = 0;
}

$1 == "forward" {
	hrz += $2;
}

$1 == "up" {
	depth -= $2;
}

$1 == "down" {
	depth += $2;
}

END {
	print (depth * hrz);
}
