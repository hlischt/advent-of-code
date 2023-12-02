package main

import (
	"bufio"
	"io"
	"log"
	"regexp"
	"strconv"
	"strings"
)

type day02CubeSet struct {
	red, green, blue int
}

type day02Game struct {
	GameID      int
	CubeSubsets []day02CubeSet
}

var day02regexp []*regexp.Regexp = []*regexp.Regexp{
	regexp.MustCompile(`(\d+) (red|green|blue)`),
	regexp.MustCompile(`^Game (\d+)`),
}

func buildCubeSubset(cubeSet string) day02CubeSet {
	var red, green, blue int
	re := day02regexp[0]
	set := strings.SplitN(cubeSet, ", ", -1)
	for _, color := range set {
		matches := re.FindStringSubmatch(color)
		num, err := strconv.Atoi(matches[1])
		if err != nil {
			log.Panic(err)
		}
		colorName := matches[2]
		switch colorName {
		case "red":
			red += num
		case "green":
			green += num
		case "blue":
			blue += num
		}
	}
	return day02CubeSet{
		red: red, green: green, blue: blue,
	}
}

func lineToGame(line string) day02Game {
	l := strings.Split(line, ": ")
	re := day02regexp[1]
	gameID, err := strconv.Atoi(re.FindStringSubmatch(l[0])[1])
	if err != nil {
		log.Panic("Game number not listed: " + line)
	}
	subsets := strings.SplitN(l[1], "; ", -1)
	var subsetSlice []day02CubeSet
	for _, subset := range subsets {
		subsetSlice = append(subsetSlice, buildCubeSubset(subset))
	}
	return day02Game{
		GameID:      gameID,
		CubeSubsets: subsetSlice,
	}
}

func isGamePossible(game day02Game, reference day02CubeSet) (bool, *int) {
	for _, g := range game.CubeSubsets {
		if g.red > reference.red ||
			g.green > reference.green ||
			g.blue > reference.blue {
			return false, nil
		}
	}
	return true, &game.GameID
}

func maxCubes(game day02Game) day02CubeSet {
	var red, green, blue int
	for _, set := range game.CubeSubsets {
		if set.red > red {
			red = set.red
		}
		if set.green > green {
			green = set.green
		}
		if set.blue > blue {
			blue = set.blue
		}
	}
	return day02CubeSet{
		red: red, green: green, blue: blue,
	}
}

func day02(f io.Reader) (int, int) {
	scanner := bufio.NewScanner(f)
	reference := day02CubeSet{
		red:   12,
		green: 13,
		blue:  14,
	}
	var p1, p2 int
	for scanner.Scan() {
		game := lineToGame(scanner.Text())
		ok, id := isGamePossible(game, reference)
		if ok {
			p1 += *id
		}
		max := maxCubes(game)
		p2 += max.red * max.green * max.blue
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	return p1, p2
}
