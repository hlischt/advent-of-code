package main

import (
	"bufio"
	"io"
	"log"
	"regexp"
)

var wordDigits = map[string]int{
	"one":   1,
	"two":   2,
	"three": 3,
	"four":  4,
	"five":  5,
	"six":   6,
	"seven": 7,
	"eight": 8,
	"nine":  9,
}

var re = regexp.MustCompile(`one|two|three|four|five|six|seven|eight|nine|\d`)

func isAsciiDigit(c byte) bool {
	if '0' <= c && c <= '9' {
		return true
	}
	return false
}

func digits(line string) int {
	var first, second byte
	for i := 0; i < len(line); i++ {
		if isAsciiDigit(line[i]) {
			if first == 0 {
				first = line[i]
			}
			second = line[i]
		}
	}
	return int((first-'0')*10 + (second - '0'))
}

func textToNum(s string) int {
	if isAsciiDigit(s[0]) {
		return int(s[0] - '0')
	}
	word := wordDigits[s]
	return word
}

func spelled(line string) int {
	var first, second string
	first = re.FindString(line)
	for i := len(line) - 1; i >= 0; i-- {
		reResult := re.FindString(line[i:])
		if reResult != "" {
			second = reResult
			break
		}
	}
	return textToNum(first)*10 + textToNum(second)
}

func day01(f io.Reader) (int, int) {
	scanner := bufio.NewScanner(f)
	var count1, count2 int
	for scanner.Scan() {
		count1 += digits(scanner.Text())
		count2 += spelled(scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	return count1, count2
}
