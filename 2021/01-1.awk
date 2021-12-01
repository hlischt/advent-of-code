BEGIN {
	result = 0;
}

NR>1 {
	if ($1 > a) {
		result++;
	}
	a = $1;
}

END {
	print result;
}
