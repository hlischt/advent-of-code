package main

import (
	"bufio"
	"io"
	"log"
	"strconv"
	"strings"
)

func day06processLine(line string) ([]int, int) {
	spl := strings.Split(line, ": ")
	single := strings.Replace(spl[1], " ", "", -1)
	num, err := strconv.Atoi(single)
	if err != nil {
		log.Panic(err)
	}
	return stringToInts(spl[1]), num
}

func day06waysToWin(duration, record int) int {
	waysToWin := 0
	for j := 0; j < duration; j++ {
		sToMove := duration - j
		movement := sToMove * j
		if movement > record {
			waysToWin = duration + 1 - j*2
			break
		}
	}
	return waysToWin
}

func day06getSpeeds(times, dist []int) int {
	total := 1
	for i := 0; i < len(times); i++ {
		// duration := times[i]
		// record := dist[i]
		// waysToWin := 0
		// for j := 0; j < duration; j++ {
		// 	sToMove := duration - j
		// 	movement := sToMove * j
		// 	if movement > record {
		// 		waysToWin = duration + 1 - j*2
		// 		break
		// 	}
		// }
		// total *= waysToWin
		total *= day06waysToWin(times[i], dist[i])
	}
	return total
}

func day06(f io.Reader) (int, int) {
	scanner := bufio.NewScanner(f)
	scanner.Scan()
	times1, time2 := day06processLine(scanner.Text())
	scanner.Scan()
	distances1, distance2 := day06processLine(scanner.Text())
	if err := scanner.Err(); err != nil {
		log.Panic(err)
	}
	p1 := day06getSpeeds(times1, distances1)
	p2 := day06waysToWin(time2, distance2)
	return p1, p2
}
