'use strict'

var isPower = false

function changeGhostsColor() {
    var elGhosts = document.querySelectorAll('.span ghost')
    if (isPower) {
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = 'red'
        }
    }
    setTimeout(() => {
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = getRandomColor()
        }
    }, 5000);
}

function killGhost(objLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhostLocation = gGhosts[i].location
        if (objLocation.i === currGhostLocation.i
            && objLocation.j === currGhostLocation.j) {
            gGhosts.splice(i, 1)
            setTimeout(() => {
                createGhost(gBoard)
            }, 5000);
        }
    }
}