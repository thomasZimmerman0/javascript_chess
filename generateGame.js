let positions = document.getElementsByClassName('col-1')
let game = new Game;
let gameMap = game.gameMap;
let selectedPiece = ""

let generateGame = () => {

    let pieces = [ 
        bRook1 = new Rook('a8', 'black'),
        bKnight1 = new Knight('b8', 'black'),
        bBishop1 = new Bishop('c8', 'black'),
        bQueen = new Queen('d8', 'black'),
        bKing = new King('e8', 'black'),
        bBishop2 = new Bishop('f8', 'black'),
        bKnight2 = new Knight('g8', 'black'),
        bRook2 = new Rook('h8', 'black'),
        bPawn1 = new Pawn('a7', 'black'),
        bPawn2 = new Pawn('b7', 'black'),
        bPawn3 = new Pawn('c7', 'black'),
        bPawn4 = new Pawn('d7', 'black'),
        bPawn5 = new Pawn('e7', 'black'),
        bPawn6 = new Pawn('f7', 'black'),
        bPawn7 = new Pawn('g7', 'black'),
        bPawn8 = new Pawn('h7', 'black'),
        
        wRook1 = new Rook('a1', 'white'),
        wKnight1 = new Knight('b1', 'white'),
        wBishop1 = new Bishop('c1', 'white'),
        wQueen = new Queen('d1', 'white'),
        wKing = new King('e1', 'white'),
        wBishop2 = new Bishop('f1', 'white'),
        wKnight2 = new Knight('g1', 'white'),
        wRook2 = new Rook('h1', 'white'),
        wPawn1 = new Pawn('a2', 'white'),
        wPawn2 = new Pawn('b2', 'white'),
        wPawn3 = new Pawn('c2', 'white'),
        wPawn4 = new Pawn('d2', 'white'),
        wPawn5 = new Pawn('e2', 'white'),
        wPawn6 = new Pawn('f2', 'white'),
        wPawn7 = new Pawn('g2', 'white'),
        wPawn8 = new Pawn('h2', 'white'),
    ]

    for(let i = 0; i < pieces.length; i++){

        let horizontal = pieces[i].position[0]
        let vertical = pieces[i].position[1]

        gameMap[horizontal][vertical].occupyingPiece = {
            HTML : gameMap[horizontal][vertical].occupyingPiece,
            JS:  pieces[i]
        }
    }

    renderGame()
   
}

let renderColor = () => {
    let white = true
    let ctr = 0
    for(element of positions){
        if(white && ctr < 7){
            element.style.backgroundColor = 'black'
            white = false
            ctr++
        } else if(!white && ctr < 7) {
            element.style.backgroundColor = 'white'
            white = true
            ctr++
        } else if (white && ctr == 7){
            element.style.backgroundColor = 'black'
            ctr = 0
        } else if (!white && ctr == 7){
            element.style.backgroundColor = 'white'
            ctr = 0
        }
    }
}

let reRenderGame = (gameMap) => {
    for(position of positions){
        position.classList.remove('potential-move')
        position.innerHTML = ""
    }
    selectedPiece = ""
    renderGame(gameMap)
}

let renderGame = () => {

    renderColor()

    for(position of positions){
        let horizontal = position.id[0]
        let vertical = position.id[1]
        if(gameMap[horizontal][vertical].occupyingPiece !== null){
            position.innerHTML = gameMap[horizontal][vertical].occupyingPiece.HTML
        }
    }
}

for(let i = 0; i < positions.length; i++){

    positions[i].addEventListener('click', (event)=>{
        let horizontal = positions[i].id[0]
        let vertical = positions[i].id[1]
        renderColor()

        if(gameMap[horizontal][vertical].occupyingPiece !== null  && !selectedPiece){
            console.log('first')
            for(position of positions){
                position.classList.remove('potential-move')
            }
            console.log(horizontal)
            console.log(vertical)
            let possibleMoves = gameMap[horizontal][vertical].occupyingPiece.JS.getPossibleMoves(gameMap)
            for(move of possibleMoves){
                document.getElementById(`${move}`).style.backgroundColor = 'yellow'
                document.getElementById(`${move}`).classList.add('potential-move')
                selectedPiece = event.target.id
            }
        }
            
        if(event.target.classList.contains('potential-move')){
            
            let newGameMap = gameMap[selectedPiece[0]][selectedPiece[1]].occupyingPiece.JS.setNewPosition(gameMap, event.target.id)
            
            reRenderGame(newGameMap)
        }
    })
}

generateGame()
