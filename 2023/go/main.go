package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	f, err := os.Open(os.Args[1])
	if err != nil {
		log.Panic("Couldn't open " + os.Args[1])
	}
	defer f.Close()
	p1, p2 := day01(f)
	fmt.Printf("Part 1: %d\n", p1)
	fmt.Printf("Part 2: %d\n", p2)
}
