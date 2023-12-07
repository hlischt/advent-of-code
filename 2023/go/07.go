package main

import (
	"bufio"
	"bytes"
	"io"
	"log"
	"slices"
	"strconv"
	"strings"
)

type handKind int

const (
	highCard handKind = 1 + iota
	onePair
	twoPair
	threeOfAKind
	fullHouse
	fourOfAKind
	fiveOfAKind
)

var day07Cards map[byte]int = map[byte]int{
	'2': 0, '3': 1, '4': 2, '5': 3, '6': 4, '7': 5, '8': 6, '9': 7,
	'T': 8, 'J': 9, 'Q': 10, 'K': 11, 'A': 12,
}

var day07CardsP2 map[byte]int = map[byte]int{
	'J': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7,
	'9': 8, 'T': 9, 'Q': 10, 'K': 11, 'A': 12,
}

type day07hand []byte

type day07handBid struct {
	hand, handJ day07hand
	kind, kindJ handKind
	bid         int
}

func day07convertHand(hand string, ranks map[byte]int) []byte {
	b := []byte{}
	for i := 0; i < len(hand); i++ {
		v := ranks[hand[i]]
		b = append(b, byte(v))
	}
	return b
}

// Function to compare day07handBid as specified by slices.SortFunc
func day07compareHand(a, b day07handBid) int {
	if a.kind < b.kind {
		return -1
	}
	if b.kind < a.kind {
		return 1
	}
	return bytes.Compare(a.hand, b.hand)
}

func day07compareHandJ(a, b day07handBid) int {
	if a.kindJ < b.kindJ {
		return -1
	}
	if b.kindJ < a.kindJ {
		return 1
	}
	return bytes.Compare(a.handJ, b.handJ)
}

func day07maxCardWithout(hand string, b byte) byte {
	set := map[byte]int{}
	for i := 0; i < len(hand); i++ {
		ch := hand[i]
		if ch == b {
			continue
		}
		if _, ok := set[ch]; ok {
			set[ch] += 1
		} else {
			set[ch] = 1
		}
	}
	if len(set) == 0 {
		return b
	}
	max := 0
	var maxch byte
	for k, v := range set {
		if v > max {
			max = v
			maxch = k
		}
	}
	return maxch
}

func day07rankHand(hand string) handKind {
	set := map[byte]int{}
	for i := 0; i < len(hand); i++ {
		if _, ok := set[hand[i]]; ok {
			set[hand[i]] += 1
		} else {
			set[hand[i]] = 1
		}
	}
	switch len(set) {
	case 1:
		return fiveOfAKind
	case 2:
		for _, v := range set {
			if v == 4 || v == 1 {
				return fourOfAKind
			}
			return fullHouse
		}
	case 3:
		for _, v := range set {
			if v == 2 {
				return twoPair
			}
		}
		return threeOfAKind
	case 4:
		return onePair
	case 5:
		return highCard
	default:
		return -1 // Not even a valid hand
	}
	return -1
}

func day07parseLine(line string) day07handBid {
	split := strings.Split(line, " ")
	num, err := strconv.Atoi(split[1])
	if err != nil {
		log.Panic(err)
	}
	jReplace := string(day07maxCardWithout(split[0], 'J'))
	jCard := strings.Replace(split[0], "J", jReplace, -1)
	return day07handBid{
		hand:  day07convertHand(split[0], day07Cards),
		handJ: day07convertHand(split[0], day07CardsP2),
		kind:  day07rankHand(split[0]),
		kindJ: day07rankHand(jCard),
		bid:   num,
	}
}

func day07(f io.Reader) (int, int) {
	scanner := bufio.NewScanner(f)
	hands := []day07handBid{}
	for scanner.Scan() {
		hand := day07parseLine(scanner.Text())
		hands = append(hands, hand)
	}
	if err := scanner.Err(); err != nil {
		log.Panic(err)
	}
	slices.SortStableFunc(hands, day07compareHand)
	p1 := 0
	for i := 0; i < len(hands); i++ {
		p1 += hands[i].bid * (i + 1)
	}
	slices.SortStableFunc(hands, day07compareHandJ)
	p2 := 0
	for i := 0; i < len(hands); i++ {
		p2 += hands[i].bid * (i + 1)
	}
	return p1, p2
}
