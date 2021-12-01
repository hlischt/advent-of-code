BEGIN {
	result = 0;
}

{
	prev_sum = sum;
	c=b;
	b=a;
	a=$1;
	sum = a + b + c;
	if (NR>3 && sum > prev_sum) {
		result++;
	}
}

END {
	print result;
}
