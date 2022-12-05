'use strict'

const WALL = '#'
const FOOD = '.'
const SUPER_FOOD = '💪🏽'
const CHERRY = '🍒'
const EMPTY = ' '

const gGame = {
    score: 0,
    isOn: false
}

var gBoard

function onInit() {
    gBoard = buildBoard()
    checkVictory(gBoard)
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    setInterval(addCherry, 15000)
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            if (i === 1 && j === 1 || i === 1 && j === 8 ||
                i === 8 && j === 8 || i === 8 && j === 1) {
                board[i][j] = SUPER_FOOD
            }
        }
    }
    return board
}

function addCherry() {
    var emptyCells = getEmptyCells()
    var idx = getRandomIntInclusive(0, emptyCells.length)
    var emptyCell = emptyCells.splice(idx, 1)[0]
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, '🍒')
}

function updateScore(diff) {
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score
    checkVictory()
}

function gameOver() {
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    const elLosing = document.querySelector('.losing-message')
    elLosing.style.display = 'flex'
}

function restartButton() {
    const elLosing = document.querySelector('.losing-message')
    elLosing.style.display = 'none'
    const elWinning = document.querySelector('.winning-message')
    elWinning.style.display = 'none'
    gGame.score = 0
    gGhosts = []
    onInit()
}

function checkVictory() {
    var foodCounter = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell === FOOD) {
                foodCounter++
            }
        }
    }
    if (foodCounter === 1) {
        const elWinning = document.querySelector('.winning-message')
        elWinning.style.display = 'flex'
    }
}