let positions = document.getElementsByClassName('col-1')

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

    let game = new Game;
    let gameMap = game.gameMap;

    for(let i = 0; i < pieces.length; i++){

        let horizontal = pieces[i].position[0]
        let vertical = pieces[i].position[1]

        gameMap[horizontal][vertical].occupyingPiece = {
            HTML : gameMap[horizontal][vertical].occupyingPiece,
            JS:  pieces[i]
        }
    }

    // console.log(wPawn2.getPossibleMoves(gameMap))
    // console.log(wKnight2.getPossibleMoves(gameMap))
    // console.log(bRook1.getPossibleMoves(gameMap))
    // console.log(wQueen.getPossibleMoves(gameMap))
    // console.log(wKing.getPossibleMoves(gameMap))
    // console.log(wBishop1.getPossibleMoves(gameMap))

    renderGame(gameMap)
   
}

let renderColor = () => {
    let white = true
    let ctr = 0
    for(element of positions){
        if(white && ctr < 7){
            document.getElementById(`${element.id}`).style.backgroundColor = 'black'
            white = false
            ctr++
        } else if(!white && ctr < 7) {
            document.getElementById(`${element.id}`).style.backgroundColor = 'white'
            white = true
            ctr++
        } else if (white && ctr == 7){
            document.getElementById(`${element.id}`).style.backgroundColor = 'black'
            ctr = 0
        } else if (!white && ctr == 7){
            document.getElementById(`${element.id}`).style.backgroundColor = 'white'
            ctr = 0
        }
    }
}

let reRenderGame = (gameMap) => {
    for(position of positions){
        try{
        position.removeEventListener('click', move)
        position.removeEventListener('click', show)
        } catch(err) {
            console.log(err)
        }
    }
    renderGame(gameMap)
}

let renderGame = (gameMap) => {

    renderColor()
    let selectedPiece = {}

    for(let i = 0; i < positions.length; i++){
        console.log(positions.length)
        let horizontal = positions[i].id[0]
        let vertical = positions[i].id[1]

        if(gameMap[horizontal][vertical].occupyingPiece !== null){
            positions[i].innerHTML = gameMap[horizontal][vertical].occupyingPiece.HTML
            positions[i].addEventListener('click', function show (e) {
                this.removeEventListener('click', show)
                selectedPiece = gameMap[horizontal][vertical].occupyingPiece.JS
                renderColor()
                let possibleMoves = gameMap[horizontal][vertical].occupyingPiece.JS.getPossibleMoves(gameMap)
                console.log(possibleMoves)
                for(let j = 0; j < possibleMoves.length; j++){
                    document.getElementById(`${possibleMoves[j]}`).style.backgroundColor = 'yellow';
                    document.getElementById(`${possibleMoves[j]}`).addEventListener('click', function move (e){
                        let newGameMap = selectedPiece.setNewPosition(gameMap, e.target.id)
                        reRenderGame(newGameMap)
                    })
                }
            })
        } else {
            positions[i].innerHTML = '';
        }
    }
    
}

generateGame()
