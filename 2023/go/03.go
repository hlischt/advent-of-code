package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"regexp"
	"strconv"
)

// Position in a grid.
type gridPos struct {
	row, col int
}

// Rectangle on a grid, including the top left and bottom right corners.
type gridRect struct {
	tl, br gridPos
}

// A horizontal text in a grid, with the starting position as pos.
type gridString struct {
	text string
	pos  gridPos
}

// A character in a grid, with the position as pos.
type gridByte struct {
	char byte
	pos  gridPos
}

// Return a slice of positions surrounding pos, side to side and diagonally.
// It does check bounds, with br being the bottom-right corner;
// the top-left corner is (0,0).
func (pos gridPos) boundNeigh(br gridPos) []gridPos {
	gp := []gridPos{}
	for r := max(0, pos.row-1); r <= min(br.row, pos.row+1); r++ {
		for c := max(0, pos.col-1); c <= min(br.col, pos.col+1); c++ {
			if r != pos.row || c != pos.col {
				gp = append(gp, gridPos{row: r, col: c})
			}
		}
	}
	return gp
}

// Return a slice of direct neighbours of a position,
// without checking for boundaries.
func (pos gridPos) neigh() []gridPos {
	return []gridPos{
		gridPos{row: pos.row - 1, col: pos.col - 1},
		gridPos{row: pos.row - 1, col: pos.col},
		gridPos{row: pos.row - 1, col: pos.col + 1},
		gridPos{row: pos.row, col: pos.col - 1},
		// gridPos{row: pos.row, col: pos.col},
		gridPos{row: pos.row, col: pos.col + 1},
		gridPos{row: pos.row + 1, col: pos.col - 1},
		gridPos{row: pos.row + 1, col: pos.col},
		gridPos{row: pos.row + 1, col: pos.col + 1},
	}
}

type numIdx struct {
	number     string
	start, end int
}

func (n numIdx) toInt() (int, error) {
	num, err := strconv.Atoi(n.number)
	if err != nil {
		return 0, err
	}
	return num, nil
}

func (n numIdx) String() string {
	return fmt.Sprintf("%s[%d:%d]", n.number, n.start, n.end)
}

func day03ParseLine(line string) []numIdx {
	re := regexp.MustCompile(`\d+`)
	numbers := re.FindAllStringIndex(line, -1)
	numRow := []numIdx{}
	for _, number := range numbers {
		idx := numIdx{
			number: line[number[0]:number[1]],
			start:  number[0],
			end:    number[1],
		}
		numRow = append(numRow, idx)
	}
	return numRow
}

func day03ParseLineSymbols(line string, rownum int) []gridByte {
	slice := []gridByte{}
	for i := 0; i < len(line); i++ {
		ch := line[i]
		if ch != '.' && !isAsciiDigit(ch) {
			pos := gridPos{
				row: rownum,
				col: i,
			}
			gb := gridByte{pos: pos, char: ch}
			slice = append(slice, gb)
		}
	}
	return slice
}

func day03getPartIndices(symbols map[gridPos]byte, numMap map[gridPos]int) []int {
	intSet := map[int]struct{}{}
	indices := []int{}
	for pos := range symbols {
		neighs := pos.neigh()
		for _, n := range neighs {
			idx, ok := numMap[n]
			if ok {
				intSet[idx] = struct{}{}
			}
		}
	}
	for k := range intSet {
		indices = append(indices, k)
	}
	return indices
}

func day03numIndicesToInt(indices []int, nums []numIdx) []int {
	ints := []int{}
	for _, i := range indices {
		num := nums[i]
		nInt, err := num.toInt()
		if err != nil {
			log.Fatal(err)
		}
		ints = append(ints, nInt)
	}
	return ints
}

func sumInts(ints []int) int {
	total := 0
	for _, i := range ints {
		total += i
	}
	return total
}

func day03gears(symbols map[gridPos]byte, numMap map[gridPos]int) [][]int {
	gearIdx := [][]int{}
	for pos, sym := range symbols {
		intSet := map[int]struct{}{}
		if sym != '*' {
			continue
		}
		neighs := pos.neigh()
		for _, n := range neighs {
			idx, ok := numMap[n]
			if ok {
				intSet[idx] = struct{}{}
			}
		}
		if len(intSet) != 2 {
			continue
		}
		gearParts := []int{}
		for k := range intSet {
			gearParts = append(gearParts, k)
		}
		gearIdx = append(gearIdx, gearParts)
	}
	return gearIdx
}

func day03gearRatio(indices []int, parts []numIdx) int {
	adjParts := day03numIndicesToInt(indices, parts)
	return adjParts[0] * adjParts[1]
}

func day03(f io.Reader) (int, int) {
	scanner := bufio.NewScanner(f)
	lines := []string{}
	numbers := []numIdx{}
	numMap := map[gridPos]int{}
	symbols := map[gridPos]byte{}
	row := 0
	for scanner.Scan() {
		text := scanner.Text()
		lines = append(lines, text)
		numberPositions := day03ParseLine(text)
		numlen := len(numbers)
		for _, numPos := range numberPositions {
			for i := numPos.start; i < numPos.end; i++ {
				pos := gridPos{row: row, col: i}
				numMap[pos] = numlen
			}
			numbers = append(numbers, numPos)
			numlen++
		}
		for _, gb := range day03ParseLineSymbols(text, row) {
			symbols[gb.pos] = gb.char
		}
		row++
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	partIndices := day03getPartIndices(symbols, numMap)
	partNums := day03numIndicesToInt(partIndices, numbers)
	p1 := sumInts(partNums)
	gearIndices := day03gears(symbols, numMap)
	p2 := 0
	for _, gearIdx := range gearIndices {
		gr := day03gearRatio(gearIdx, numbers)
		p2 += gr
	}
	return p1, p2
}
