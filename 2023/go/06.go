package main

import (
	"bufio"
	"io"
	"log"
	"math"
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

func day06quadratic(duration, record int) int {
	t := float64(duration)
	d := float64(record)
	discr := math.Sqrt((t * t) - (4.0 * d))
	x1 := (-t + discr) / -2
	x2 := (-t - discr) / -2
	return int(math.Ceil(x2) - math.Floor(x1) - 1)
}

func day06getSpeeds(times, dist []int) int {
	total := 1
	for i := 0; i < len(times); i++ {
		total *= day06quadratic(times[i], dist[i])
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
	p2 := day06quadratic(time2, distance2)
	return p1, p2
}
