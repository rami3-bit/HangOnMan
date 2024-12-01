// -----------------Deklarera variabler----------------
const leaderboard = document.querySelector('.whole-leaderboard')
const LeaderboardCloseButton = document.querySelector('.leaderboard-close-button')
const LeaderboardHomeButton = document.querySelector('.leaderboard-home-button')
const mainMenu = document.querySelector('.main-menu')
const leaderboardList = document.querySelector('.leaderboard-list')
const LeaderboardGameButton = document.querySelector('.game-leaderboard-btn')
const startButton = document.querySelector('.start')
const gameContainer = document.querySelector(`.game-container`)
const sortButtons = Array.from(document.querySelectorAll('.leaderboard-sort-button'))

let previousTab = null

 // Visa spesific flick och gömma andra

 function showTab(tabToShow) {
	// gömma alla andra
	mainMenu.classList.add("hidden")
	gameContainer.classList.add("hidden")
	leaderboard.classList.add("hidden")

	// Visa den önskade flick
	tabToShow.classList.remove("hidden")
}

// Öppna Leaderboard från "main-menu"
LeaderboardHomeButton.addEventListener("click", () => {
	previousTab = mainMenu // Deklarerar "main-menu" som previusTab
	showTab(leaderboard)
})

// Öppna Leaderboard från "game-container"
LeaderboardGameButton.addEventListener("click", () => {
	previousTab = gameContainer // Deklarerar "game-container" som previusTab
	showTab(leaderboard)
})

// Stänger leaderboard previousTab
LeaderboardCloseButton.addEventListener("click", () => {
	if (previousTab) {
		showTab(previousTab) // Återställer föregående flick
	}
})

// game start --- changing tab from start to game---

startButton.addEventListener('click', () => {
	gameContainer.classList.remove('hidden')
	mainMenu.classList.add('hidden')
})


// -------------Sorteringsordning, stigande-----------
let sortOrder = {
	result: true,
	time: true,
	date: true,
}

// -----------Funktionen för konvertering av sträng------------
const parseListItem = (itemText) => {
	const stats = itemText.split(', ')
	return {
		name: stats[0],
		mistakes: parseInt(stats[1].split(': ')[1]),
		wordLength: parseInt(stats[2].split(': ')[1]),
		date: new Date(stats[3]),
		time: parseInt(stats[4].split(' ')[0]),
		status: stats[5],
	}
}

// ----------Sorteringsfunktion-----------------
const sortLeaderboard = (criteria) => {
	const items = Array.from(leaderboardList.children)

	// Separera "Empty" poster
	const emptyItems = items.filter(item => item.textContent.includes('Empty'))
	const dataItems = items.filter(item => !item.textContent.includes('Empty'))

	// Sortera datainnehåll
	const sortedItems = dataItems.sort((a, b) => {
		const aData = parseListItem(a.textContent)
		const bData = parseListItem(b.textContent)

		if (criteria === 'result') {
			return sortOrder.result
				? aData.mistakes - bData.mistakes || bData.wordLength - aData.wordLength
				: bData.mistakes - aData.mistakes || aData.wordLength - bData.wordLength
		}

		if (criteria === 'time') {
			return sortOrder.time ? aData.time - bData.time : bData.time - aData.time
		}

		if (criteria === 'date') {
			return sortOrder.date ? aData.date - bData.date : bData.date - aData.date
		}
	})

	// ------Växla sorteringsordning---------
	sortOrder[criteria] = !sortOrder[criteria]

	// --Rensar listan och lämnar tillbaks bsorterade poster och "Empty"--
	leaderboardList.innerHTML = ''
	sortedItems.concat(emptyItems).forEach(item => leaderboardList.appendChild(item))

}

// ------------eventlisteners för sort knappar------------
sortButtons.forEach(button => {
	button.addEventListener('click', (event) => {
		const criteria = event.target.classList.contains('result')
			? 'result'
			: event.target.classList.contains('time')
			? 'time'
			: 'date'
		sortLeaderboard(criteria)
	})
})