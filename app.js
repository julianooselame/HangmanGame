let wordList = [
	'JAVA',
	'JAVASCRIPT',
	'PYTHON',
	'PHP',
	'HTML',
	'CSS',
	'RUBY',
	'LUA',
	'FORTRAN',
	'COBOL',
	'MATLAB',
	'GROOVY',
	'DELPHI',
	'PERL',
	'SWIFT',
	'KOTLIN',
	'SQL',
	'TYPESCRIPT',
	'JULIA',
	'HASKELL'
];

let startGame = document.getElementById('btnstart');

let inputGuess = document.getElementById('guessinput');
let buttonGo = document.getElementById('btngo');

let played = document.getElementById('playedletters');
played.innerText = '';

let chosenWord = '';

let numTries = 0;

let spot = '';

let playedString = '';

let triesNumber = document.getElementById('left');

let wordLetters = [];
let blankSpaces = [];

startGame.addEventListener('click', function() {
	clearAll();
	gameStart(word);
});

buttonGo.addEventListener('click', function() {
	let word = document.getElementById('word');
	if (inputGuess.value !== '') {
		spot = '';
		for (let i = 0; i < wordLetters.length; i++) {
			if (inputGuess.value.toUpperCase() === wordLetters[i]) {
				blankSpaces.splice(i, 1);
				blankSpaces.splice(i, 0, inputGuess.value.toUpperCase());
				spot += blankSpaces[i] + ' ';
			} else {
				spot += blankSpaces[i] + ' ';
			}
		}

		playedString += inputGuess.value.toUpperCase() + ' ';
		played.innerText = playedString;
		word.innerText = spot;
		inputGuess.value = '';
		numTries -= 1;
		triesNumber.innerText = numTries;

		if (arraysMatch(blankSpaces, wordLetters)) {
			document.getElementById('btngo').disabled = true;
			setTimeout(() => {
				alert('GANHOU!');
			}, 500);
		} else if (numTries === 0) {
			document.getElementById('btngo').disabled = true;
			setTimeout(() => {
				alert('PERDEU!');
			}, 500);
		}
	} else {
		alert('Digite uma Letra!!!');
	}

	word.innerText = spot;
});

playedString = '';
played.innerText = '';

function gameStart() {
	let word = document.getElementById('word');
	buttonGo.disabled = false;

	played.innerText = playedString;

	chosenWord = chooseWord();
	console.log(chosenWord);

	for (let i = 0; i < chosenWord.length; i++) {
		wordLetters.push(chosenWord.charAt(i));
		blankSpaces.push('_');
	}

	numTries = chosenWord.length + 3;

	triesNumber.innerText = numTries;

	spot = writeSpaces(chosenWord);
	word.innerText = spot;
}

function writeSpaces(chosenWord) {
	let spot = '';
	for (let i = 0; i < chosenWord.length; i++) {
		spot += blankSpaces[i] + ' ';
	}

	return spot;
}

function arraysMatch(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;

	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	return true;
}

function clearAll() {
	wordLetters = [];
	blankSpaces = [];
	playedString = '';
	played.innerText = '';
	spot = '';
	word = spot;
}

function chooseWord() {
	let chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
	return chosenWord;
}
