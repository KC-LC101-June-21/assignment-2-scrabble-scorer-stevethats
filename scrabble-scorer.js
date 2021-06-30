// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const allVowels = ["A", "E", "I", "O", "U"];

const allNotVowels = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
  let wordPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      wordPoints += Number(pointValue);
		 }
 
	  }
	}
  //console.log(letterPoints);
  //console.log(`Total points for word: ${wordPoints}`)
	return wordPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   return input.question("Enter a word to score: ");
};

let simpleScore = function (word) {
  let genScore = 0;
  for (let i = 0; i < word.length; i++) {
    genScore += 1;
  }
  //console.log(`Score for "${word}": ${genScore}`);
  return genScore;
};

let vowelBonusScore = function (word) {
  newWord = word.toUpperCase();
  let totalBonusScore = 0;
  for (let j = 0; j < newWord.length; j++) {
    for (let i = 0; i < allVowels.length; i++) {
      if (newWord[j].includes(allVowels[i])) {
        totalBonusScore += 3;
        //console.log(`Bonus Vowel for ${word[j]}: ${totalBonusScore}`)
      }
    }
    for (let l = 0; l < allNotVowels.length; l++) {
      if (newWord[j].includes(allNotVowels[l])) {
        totalBonusScore += 1;
        //console.log(`Single Point for ${word[j]}: ${totalBonusScore}`)
      }
    }
  }
  //console.log(`Score for "${word}": ${totalBonusScore}`);
  return totalBonusScore;
};

let scrabbleScore = function (word) {
  word = word.toLowerCase();
	
  let wordPoints = 0;
  
  for (let i = 0; i < word.length; i++) {
	  for (letter in newPointStructure) {
      if (letter === word[i]) {
        wordPoints += newPointStructure[letter];
      }
	  }
  }
  
	return wordPoints;
};

const scoringAlgorithms = [
  {
    name: "Simple Score", 
    description: "Each letter is worth 1 point.", 
    scoringFunction: function (word) {
      simpleScore(word)
    }
  }, 
  {
    name: "Bonus Vowels", 
    description: "Vowels are 3 pts, consonants are 1 pt.", 
    scoringFunction: function (word) {
      vowelBonusScore(word)
    }
  }, 
  {
    name: "Scrabble", 
    description: "The traditional scoring algorithm.", 
    scoringFunction: function (word) {
      scrabbleScore(word);
    }
  }
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?\n");
  console.log(
    "0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system"
  )
  let algorithmNum = input.question("Enter 0, 1, or 2: ");
  
  return scoringAlgorithms[algorithmNum];
}

function transform(object) {
  let holder = {};
  
  for (letterArray in object) {
    object[letterArray] = object[letterArray].join().toLowerCase().split(",");
  }

  let change = function (line) {
    for (let i = 0; i < object[line].length; i++) {
      holder[object[line][i]] = Number(line);
    }
  }

  change ("1");
  change ("2");
  change ("3");
  change ("4");
  change ("5");
  change ("8");
  change ("10");
  
  return holder;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  let playerWord = initialPrompt();
  let playerAlgorithm = scorerPrompt();
  console.log(`Score for "${playerWord}": ${playerAlgorithm["scoringFunction"](playerWord)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

