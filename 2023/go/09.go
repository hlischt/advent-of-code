package main

import (
	"bufio"
	"io"
	"log"
	"slices"
)

func day09deltaSeq(nums []int) []int {
	delta := []int{}
	for i := 0; i < len(nums)-1; i++ {
		delta = append(delta, nums[i+1]-nums[i])
	}
	return delta
}

func day09deltaTriang(nums []int) [][]int {
	d := day09deltaSeq(nums)
	deltas := [][]int{nums, d}
	for !day09isAllElem(deltas[len(deltas)-1], 0) {
		d = day09deltaSeq(d)
		deltas = append(deltas, d)
	}
	return deltas
}

func day09isAllElem(nums []int, x int) bool {
	for i := 0; i < len(nums); i++ {
		if nums[i] != x {
			return false
		}
	}
	return true
}

func day09processDeltas(deltas [][]int, part1 bool) {
	for i := len(deltas) - 1; i >= 1; i-- {
		lastThis := len(deltas[i]) - 1
		lastPrev := len(deltas[i-1]) - 1
		newNum := 0
		if part1 {
			newNum = deltas[i][lastThis] + deltas[i-1][lastPrev]
		} else {
			newNum = deltas[i-1][lastPrev] - deltas[i][lastThis]
		}
		deltas[i-1] = append(deltas[i-1], newNum)
	}
}

func day09processLine(line string) ([][]int, [][]int) {
	ints, revInts := stringToInts(line), stringToInts(line)
	deltas, deltaRev := day09deltaTriang(ints), day09deltaTriang(revInts)
	for _, nums := range deltaRev {
		slices.Reverse(nums)
	}
	day09processDeltas(deltas, true)
	day09processDeltas(deltaRev, false)
	return deltas, deltaRev
}

func day09(f io.Reader) (int, int) {
	scanner := bufio.NewScanner(f)
	p1, p2 := 0, 0
	for scanner.Scan() {
		line := scanner.Text()
		seq1, seq2 := day09processLine(line)
		fst, fstRev := seq1[0], seq2[0]
		p1 += fst[len(fst)-1]
		p2 += fstRev[len(fstRev)-1]
	}
	if err := scanner.Err(); err != nil {
		log.Panic(err)
	}
	return p1, p2
}
