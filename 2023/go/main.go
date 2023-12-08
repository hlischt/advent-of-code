package main

import (
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
)

var days map[int]func(io.Reader) (int, int) = map[int]func(io.Reader) (int, int){
	1: day01,
	2: day02,
	3: day03,
	4: day04,
	// 5: day05,
	6: day06,
	7: day07,
	8: day08,
}

func main() {
	if len(os.Args) < 3 {
		log.Fatalf(`Usage: %s [day number] [input file]
	Example: %s 2 input/02.txt`+"\n", os.Args[0], os.Args[0])
	}
	dayNum, err := strconv.Atoi(os.Args[1])
	if err != nil {
		log.Fatal("Error: ", err)
	}
	filepath := os.Args[2]
	f, err := os.Open(filepath)
	if err != nil {
		log.Panic("Couldn't open " + filepath)
	}
	defer f.Close()
	p1, p2 := days[dayNum](f)
	fmt.Printf("Part 1: %d\n", p1)
	fmt.Printf("Part 2: %d\n", p2)
}
