package main

import (
	"bufio"
	"io"
	"log"
	"slices"
	"strconv"
	"strings"
)

// Convert a string with space-separated numbers ("1 2 3  4  56  789")
// into a slice of ints ([]int{1, 2, 3, 4, 56, 789})
func stringToInts(s string) []int {
	spaceNums := strings.NewReader(s)
	scanner := bufio.NewScanner(spaceNums)
	scanner.Split(bufio.ScanWords)
	nums := []int{}
	for scanner.Scan() {
		num, err := strconv.Atoi(scanner.Text())
		if err != nil {
			log.Println("Can't convert number:", err)
			continue
		}
		nums = append(nums, num)
	}
	return nums
}

func day04manualParse(line string) int {
	colonSplit := strings.Split(line, ": ")
	barSplit := strings.Split(colonSplit[1], " | ")
	cardNums := stringToInts(barSplit[0])
	myNums := stringToInts(barSplit[1])
	count := 0
	for _, num := range myNums {
		if slices.Contains(cardNums, num) {
			count++
		}
	}
	return count
}

func day04growMatches(matches []int) int {
	copies := map[int]int{}
	for i := 0; i < len(matches); i++ {
		copies[i+1] = 1
	}
	for idx, num := range matches {
		times := copies[idx+1]
		for i := num; i > 0; i-- {
			copies[idx+i+1] += times
		}
	}
	total := 0
	for _, v := range copies {
		total += v
	}
	return total
}

func day04(f io.Reader) (int, int) {
	scanner := bufio.NewScanner(f)
	// cardsWon := map[int]int{}
	matches := []int{}
	p1 := 0
	for scanner.Scan() {
		line := scanner.Text()
		matchingNum := day04manualParse(line)
		if matchingNum > 0 {
			p1 += 1 << (matchingNum - 1)
		}
		matches = append(matches, matchingNum)
	}
	if err := scanner.Err(); err != nil {
		log.Panic(err)
	}
	p2 := day04growMatches(matches)
	return p1, p2
}
