package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"slices"
	"strings"
)

type binTree struct {
	value       string
	left, right *binTree
}

func (t binTree) String() string {
	left, right := "[nil]", "[nil]"
	if t.left != nil {
		left = t.left.value
	}
	if t.right != nil {
		right = t.right.value
	}
	return fmt.Sprintf("%s <- %s -> %s", left, t.value, right)
}

func day08parseLine(line string, nodes map[string]*binTree) {
	split := strings.Split(line, " = ")
	curr := split[0]
	l := split[1][1:4]
	r := split[1][6:9]
	var tree *binTree = nil
	if v, ok := nodes[curr]; ok {
		tree = v
	} else {
		tree = &binTree{value: curr, left: nil, right: nil}
		nodes[curr] = tree
	}
	if v, ok := nodes[l]; ok {
		tree.left = v
	} else {
		leftTree := binTree{value: l}
		nodes[l] = &leftTree
		tree.left = &leftTree
	}
	if v, ok := nodes[r]; ok {
		tree.right = v
	} else {
		rightTree := binTree{value: r}
		nodes[r] = &rightTree
		tree.right = &rightTree
	}
}

func day08traverse(nodes map[string]*binTree, dir string) int {
	node := nodes["AAA"]
	steps := 0
	for node.value != "ZZZ" {
		d := dir[steps%len(dir)]
		if d == 'L' {
			node = node.left
		} else {
			node = node.right
		}
		steps++
	}
	return steps
}

func day08travMultiple(sl []*binTree, dir string, step int) {
	for idx := 0; idx < len(sl); idx++ {
		node := sl[idx]
		d := dir[step%len(dir)]
		if d == 'L' {
			sl[idx] = node.left
		} else {
			sl[idx] = node.right
		}
	}
}

func day08notAllZ(sl []*binTree, stz []int, step int) bool {
	if !slices.Contains(stz, 0) {
		return false
	}
	for idx, node := range sl {
		last := node.value[len(node.value)-1]
		if last == 'Z' && stz[idx] == 0 {
			stz[idx] = step
		}
	}
	return true
}

func gcd(a, b int) int {
	for b > 0 {
		a, b = b, a%b
	}
	return a
}

func lcm(a, b int) int {
	return (a * b) / gcd(a, b)
}

func sliceLCM(nums []int) int {
	total := 1
	for _, n := range nums {
		total = lcm(n, total)
	}
	return total
}

func day08(f io.Reader) (int, int) {
	scanner := bufio.NewScanner(f)
	scanner.Scan()
	directions := scanner.Text()
	scanner.Scan() // Empty line
	nodes := map[string]*binTree{}
	for scanner.Scan() {
		day08parseLine(scanner.Text(), nodes)
	}
	if err := scanner.Err(); err != nil {
		log.Panic(err)
	}
	p1 := day08traverse(nodes, directions)
	aSlice := []*binTree{}
	stepsToZ := []int{}
	for k, v := range nodes {
		if k[len(k)-1] == 'A' {
			aSlice = append(aSlice, v)
			stepsToZ = append(stepsToZ, 0)
		}
	}
	step := 0
	for day08notAllZ(aSlice, stepsToZ, step) {
		day08travMultiple(aSlice, directions, step)
		step++
	}
	return p1, sliceLCM(stepsToZ)
}
