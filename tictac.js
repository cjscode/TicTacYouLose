let wins = localStorage.getItem("_W") ? localStorage.getItem("_W") : 0
let losses = localStorage.getItem("_L") ? localStorage.getItem("_L") : 0
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let iterations = 0
function winning(current) {
    if (current[0] == current[1] && current[1] == current[2] && current[0] != 0) {
        return current[0]
    } else if (current[3] == current[4] && current[4] == current[5] && current[3] != 0) {
        return current[3]
    } else if (current[6] == current[7] && current[7] == current[8] && current[6] != 0) {
        return current[6]
    } else if (current[0] == current[4] && current[4] == current[8] && current[0] != 0) {
        return current[0]
    } else if (current[2] == current[4] && current[4] == current[6] && current[2] != 0) {
        return current[2]
    } else if (current[1] == current[4] && current[4] == current[7] && current[1] != 0) {
        return current[1]
    } else if (current[2] == current[5] && current[5] == current[8] && current[2] != 0) {
        return current[2]
    } else if (current[0] == current[3] && current[3] == current[6] && current[0] != 0) {
        return current[0]
    }
    return 0
}
function returnbotmovescore(current, movespot) {
    current[movespot] = 2
    let movescore = 0
    for (let i = 0; i < 9; i++) {
        if (current[i] == 0) {
            current[i] = 1
            let check = winning(current)
            if (check == 1) {
                movescore -= 10
            } else if (check == 2) {
                movescore += 10
            }
            current[i] = 0
        }
    }
    current[movespot] = 0
    return movescore
}
function makebotmove() {
    iterations += 1
    if (board[4] == 0) {
        board[4] = 2
        document.querySelector("#spot4").classList.add("black")
        return
    }
    let movescores = []
    for (let i = 0; i < 9; i++) {
        if (board[i] == 0) {
            movescores[i] = returnbotmovescore(board, i)
        }
    }
    let highidx = 0
    let highnum = -11
    movescores.forEach((v, i) => {
        if (v >= highnum) {
            highnum = v
            highidx = i
        }
    })
    board[highidx] = 2
    document.querySelector(`#spot${highidx}`).classList.add("black")
}
function reset() {
    localStorage.setItem("_W",wins)
    localStorage.setItem("_L",losses)
    document.querySelector("#wl").innerHTML = `Wins: ${wins} - Losses: ${losses}`
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    document.querySelectorAll(".spot").forEach((v) => {
        v.classList.remove(v.classList.contains("white") ? "white" : "black")
    })
    iterations = 0
}
reset()
function makeplayermove(idx) {
    if (board[idx] == 0 && iterations < 9 && !(winning(board) == 1 || winning(board) == 2)) {
        iterations += 1
        document.querySelector(`#spot${idx}`).classList.add("white")
        board[idx] = 1
        if (iterations > 8) {
            setTimeout(() => {
                alert("Tie!")
                reset()
            }, 750)
            return
        }
        if (winning(board) == 0) {
            makebotmove()
            if (winning(board) == 1) {
                setTimeout(() => {
                    alert("You won!")
                    wins++
                    reset()
                }, 750)
                return
            } else if (winning(board) == 2) {
                setTimeout(() => {
                    alert("The Algorithm won!")
                    losses++
                    reset()
                }, 750)
                return
            }
        } else if (winning(board) == 1) {
            setTimeout(() => {
                alert("You won!")
                wins++
                reset()
            }, 750)
            return
        } else if (winning(board) == 2) {
            setTimeout(() => {
                alert("The Algorithm won!")
                losses++
                reset()
            }, 750)
            return
        }
    }
}
document.querySelectorAll(".spot").forEach((v, i) => {
    v.style.left = `${(i % 3) * 30}vmin`
    v.addEventListener("click", () => {
        makeplayermove(i)
    })
})