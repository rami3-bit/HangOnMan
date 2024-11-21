const leaderboard = document.querySelector('.leaderboard-container')
const LeaderboardCloseButton = document.querySelector(`.leaderboard-close-button`)
const LeaderboardButton = document.querySelector(`#leaderboard-button`)

LeaderboardButton.addEventListener('click', () => {
	leaderboard.classList.remove('hidden')
})

LeaderboardCloseButton.addEventListener('click', () => {
	leaderboard.classList.add('hidden')
})