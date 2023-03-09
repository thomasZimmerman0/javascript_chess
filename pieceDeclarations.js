const tranLetterToNumber = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 5,
    'f': 6,
    'g': 7,
    'h': 8,
}
const tranNumberToLetter = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
    8: 'h',

}

class Piece {

    captured = false;

    vertical = null;
    horizontal = null;

    constructor(position, color) {
        this.position = position;
        this.color = color;
    }

    getNewPosition(moveSet, moveType, spaces) {
        spaces = spaces || 0;
        this.horizontal = parseInt(tranLetterToNumber[this.position[0]])
        this.vertical = parseInt(this.position[1])
        if (spaces == 0) {
            this.horizontal += moveSet[moveType][1]
            this.vertical += moveSet[moveType][0]
        } else {
            this.horizontal += moveSet[moveType](spaces)[1]
            this.vertical += moveSet[moveType](spaces)[0]
        }
        return tranNumberToLetter[this.horizontal] + this.vertical
    }

    setNewPosition(gameMap, newPosition){
        if(this.constructor.name == 'Pawn' && this.firstMove == true){
            this.firstMove = false
        }
        this.setHorizontalVertical()
        let HV = this.getHorizontalVerticalForPossible(newPosition)
        let holdPiece = gameMap[this.horizontal][this.vertical].occupyingPiece
        gameMap[this.horizontal][this.vertical].occupyingPiece = null
        gameMap[HV.horizontal][HV.vertical].occupyingPiece = holdPiece
        this.position = newPosition

        return gameMap
    }

    setHorizontalVertical() {
        this.horizontal = this.position[0];
        this.vertical = this.position[1];
    }

    getHorizontalVerticalForPossible(pPosition) {
        if(pPosition.length >= 3){
            return { horizontal: 'z', vertical: 99 }
        }
        return { horizontal: pPosition[0], vertical: pPosition[1] };
    }

    buildPossibleMovesArray(moves) {
        let builtMovesArray = [];
        for (let i = 0; i < moves.length; i++) {
            if (moves[i] != null && moves[i] != undefined) {
                builtMovesArray.push(moves[i])
            }
        }
        return builtMovesArray;
    }

    possibleMoveLoop(gameMap, moveName, movesArr){
        for(let i = 0; i < 7 ; i++){
            movesArr.push(this.addPossibleMove(moveName, i + 1))
            if(movesArr[movesArr.length -1] == null) break;
            let HV = this.getHorizontalVerticalForPossible(movesArr[movesArr.length -1])
            if(gameMap[HV.horizontal][HV.vertical].occupyingPiece != null){
                if(gameMap[HV.horizontal][HV.vertical].occupyingPiece.JS.color != this.color){
                    break
                } else
                    movesArr.pop()
                    break;
            }
         }

         return movesArr
    }

    getPossibleMoves(gameMap) {

        let possibleMoves = [];
        let moves = [];

        switch (this.constructor.name) {
            case 'Pawn':
                moves.push(this.addPossibleMove(gameMap, 'captureLeftUp'))
                moves.push(this.addPossibleMove(gameMap, 'captureRightUp'))
                moves.push(this.addPossibleMove(gameMap, 'captureLeftDown'))
                moves.push(this.addPossibleMove(gameMap, 'captureRightDown'))
                moves.push(this.addPossibleMove(gameMap, 'advanceUp'))
                moves.push(this.addPossibleMove(gameMap, 'advanceUpTwo'))
                moves.push(this.addPossibleMove(gameMap, 'advanceDown'))
                moves.push(this.addPossibleMove(gameMap, 'advanceDownTwo'))
                possibleMoves = this.buildPossibleMovesArray(moves)
                break;
            case 'Knight':
                moves.push(this.addPossibleMove(gameMap, 'upRight'))
                moves.push(this.addPossibleMove(gameMap, 'rightUp'))
                moves.push(this.addPossibleMove(gameMap, 'rightDown'))
                moves.push(this.addPossibleMove(gameMap, 'downRight'))
                moves.push(this.addPossibleMove(gameMap, 'downLeft'))
                moves.push(this.addPossibleMove(gameMap, 'leftDown'))
                moves.push(this.addPossibleMove(gameMap, 'leftUp'))
                moves.push(this.addPossibleMove(gameMap, 'upLeft'))
                possibleMoves = this.buildPossibleMovesArray(moves)
                break;
            case 'Bishop':
                moves = this.possibleMoveLoop(gameMap, 'leftUp', moves)
                moves = this.possibleMoveLoop(gameMap, 'leftDown', moves)
                moves = this.possibleMoveLoop(gameMap, 'rightUp', moves)
                moves = this.possibleMoveLoop(gameMap, 'rightDown', moves)
                possibleMoves = this.buildPossibleMovesArray(moves)
                break;
            case 'Rook':
                moves = this.possibleMoveLoop(gameMap, 'left', moves)
                moves = this.possibleMoveLoop(gameMap, 'right', moves)
                moves = this.possibleMoveLoop(gameMap, 'up', moves)
                moves = this.possibleMoveLoop(gameMap, 'down', moves)
                possibleMoves = this.buildPossibleMovesArray(moves)
                break;
            case 'Queen':
                moves = this.possibleMoveLoop(gameMap, 'left', moves)
                moves = this.possibleMoveLoop(gameMap, 'right', moves)
                moves = this.possibleMoveLoop(gameMap, 'up', moves)
                moves = this.possibleMoveLoop(gameMap, 'down', moves)
                moves = this.possibleMoveLoop(gameMap, 'leftUp', moves)
                moves = this.possibleMoveLoop(gameMap, 'leftDown', moves)
                moves = this.possibleMoveLoop(gameMap, 'rightUp', moves)
                moves = this.possibleMoveLoop(gameMap, 'rightDown', moves)
                possibleMoves = this.buildPossibleMovesArray(moves)
                break;
            case 'King':
                moves.push(this.addPossibleMove('up'))
                moves.push(this.addPossibleMove('down'))
                moves.push(this.addPossibleMove('left'))
                moves.push(this.addPossibleMove('right'))
                moves.push(this.addPossibleMove('leftUp'))
                moves.push(this.addPossibleMove('leftDown'))
                moves.push(this.addPossibleMove('rightUp'))
                moves.push(this.addPossibleMove('rightDown'))
                possibleMoves = this.buildPossibleMovesArray(moves)
                break;
        }

        return possibleMoves
    }
}

class Knight extends Piece {

    knightsMoves = {
        upRight: [2, 1],
        rightUp: [1, 2],
        rightDown: [-1, 2],
        downRight: [-2, 1],
        downLeft: [-2, -1],
        leftDown: [-1, -2],
        leftUp: [1, -2],
        upLeft: [2, -1],
    };

    addPossibleMove(gameMap, moveName) {
        let checkMove = this.getNewPosition(this.knightsMoves, moveName, 0)
        let HV = this.getHorizontalVerticalForPossible(checkMove)
        if (!tranLetterToNumber[HV.horizontal] || !tranNumberToLetter[HV.vertical]) {
            return null;
        }
        if(gameMap[HV.horizontal][HV.vertical].occupyingPiece == null){
            return checkMove
        }
        if(gameMap[HV.horizontal][HV.vertical].occupyingPiece.JS.color == 'black' && this.color == 'white' || gameMap[HV.horizontal][HV.vertical].occupyingPiece.JS.color == 'white' && this.color == 'black'){
            return checkMove
        } else {
            return null
        }
    }

}

class Bishop extends Piece {

    bishopsMoves = {
        leftUp: function (spaces) { return [spaces, -spaces] },
        leftDown: function (spaces) { return [-spaces, -spaces] },
        rightUp: function (spaces) { return [spaces, spaces] },
        rightDown: function (spaces) { return [-spaces, spaces] }
    }

    addPossibleMove(moveName, spaces){
        let checkMove = this.getNewPosition(this.bishopsMoves, moveName, spaces)
        let HV = this.getHorizontalVerticalForPossible(checkMove)
        if (!tranLetterToNumber[HV.horizontal] || !tranNumberToLetter[HV.vertical]){
            return null;
        }
        return checkMove;
    }

}

class Rook extends Piece {

    rooksMoves = {
        up: function (spaces) { return [spaces, 0] },
        down: function (spaces) { return [-spaces, 0] },
        left: function (spaces) { return [0, -spaces] },
        right: function (spaces) { return [0, spaces] }
    }

    addPossibleMove(moveName, spaces) {
        let checkMove = this.getNewPosition(this.rooksMoves, moveName, spaces)
        let HV = this.getHorizontalVerticalForPossible(checkMove)
        if (!tranLetterToNumber[HV.horizontal] || !tranNumberToLetter[HV.vertical]) {
            return null;
        }
        return checkMove
    }

}

class Pawn extends Piece {

    firstMove = true

    pawnsMoves = {
        captureLeftUp: [1, -1],
        caputreRightUp: [1, 1],
        captureLeftDown: [-1, -1],
        captureRightDown: [-1, 1],
        advanceUp: [1, 0],
        advanceUpTwo: [2, 0],
        advanceDown: [-1, 0],
        advanceDownTwo: [-2, 0]
    }

    addPossibleMove(gameMap, moveName) {
        let checkMove = this.getNewPosition(this.pawnsMoves, moveName, 0)
        let HV = this.getHorizontalVerticalForPossible(checkMove)
        if (!tranLetterToNumber[HV.horizontal] || !tranNumberToLetter[HV.vertical]) {
            return null;
        }
        if (moveName == 'captureLeftUp' || moveName == 'captureRightUp') {
            if (gameMap[HV.horizontal][HV.vertical].occupyingPiece != null){
                if(gameMap[HV.horizontal][HV.vertical].occupyingPiece.JS.color == 'black'){
                    return checkMove
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        if (moveName == 'advanceUp') {
            if (gameMap[HV.horizontal][HV.vertical].occupyingpiece == null && this.color == 'white') {
                return checkMove;
            } else {
                return null;
            }
        }
        if (moveName == 'advanceUpTwo') {
            if (gameMap[HV.horizontal][HV.vertical].occupyingpiece == null && this.color == 'white' && this.firstMove) {
                return checkMove;
            } else {
                return null;
            }
        }
        if (moveName == 'captureLeftDown' || moveName == 'captureRightDown') {
            if (gameMap[HV.horizontal][HV.vertical].occupyingPiece != null && gameMap[HV.horizontal][HV.vertical].occupyingPiece.JS.color == 'white' && this.color == 'black') {
                return checkMove
            } else {
                return null;
            }
        }
        if (moveName == 'advanceDown') {
            if (gameMap[HV.horizontal][HV.vertical].occupyingpiece == null &&  this.color == 'black') {
                return checkMove;
            } else {
                return null;
            }
        }
        if (moveName == 'advanceDownTwo') {
            if (gameMap[HV.horizontal][HV.vertical].occupyingpiece == null && this.color == 'black' && this.firstMove) {
                return checkMove;
            } else {
                return null;
            }
        }
    }
}

class Queen extends Piece {

    queensMoves = {
        up: function (spaces) { return [spaces, 0] },
        down: function (spaces) { return [-spaces, 0] },
        left: function (spaces) { return [0, -spaces] },
        right: function (spaces) { return [0, spaces] },
        leftUp: function (spaces) { return [spaces, -spaces] },
        leftDown: function (spaces) { return [-spaces, -spaces] },
        rightUp: function (spaces) { return [spaces, spaces] },
        rightDown: function (spaces) { return [-spaces, spaces] }
    }

    addPossibleMove(moveName, spaces){
        let checkMove = this.getNewPosition(this.queensMoves, moveName, spaces)
        let HV = this.getHorizontalVerticalForPossible(checkMove)
        if (!tranLetterToNumber[HV.horizontal] || !tranNumberToLetter[HV.vertical]) {
            console.log('in return null')
            return null;
        }
        console.log('returning-check-move')
        return checkMove
    }
}

class King extends Piece {

    kingsMoves = {
        up: [1, 0],
        down: [-1, 0],
        left: [0, -1],
        right: [0, 1],
        leftUp: [1, -1],
        leftDown: [-1, -1],
        rightUp: [1, 1],
        rightDown: [-1, 1]
    }

    addPossibleMove(moveName){
        let checkMove = this.getNewPosition(this.kingsMoves, moveName, 0)
        let HV = this.getHorizontalVerticalForPossible(checkMove)
        if (!tranLetterToNumber[HV.horizontal] || !tranNumberToLetter[HV.vertical]) {
            return null;
        }
        return checkMove
    }
}




