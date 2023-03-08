class Game {

    pieceElements = {
        wKing: '&#9812;',
        wQueen: '&#9813;',
        wRook: '&#9814;',
        wBishop: '&#9815;',
        wKnight: '&#9816;',
        wPawn: '&#9817;',
        bKing: '&#9818;',
        bQueen: '&#9819;',
        bRook: '&#9820;',
        bBishop: '&#9821;',
        bKnight: '&#9822;',
        bPawn: '&#9823;',
    }

    gameMap = {
        a : {
            1 : {
                    name : 'a1',
                    occupyingPiece: this.pieceElements.wRook
                },
            2 : {
                    name : 'a2',
                    occupyingPiece: this.pieceElements.wPawn
                },
            3 : {
                    name : 'a3',
                    occupyingPiece: null
                },
            4 : {
                    name : 'a4',
                    occupyingPiece: null
                },
            5 : {
                    name : 'a5',
                    occupyingPiece: null
                },
            6 : {
                    name : 'a6',
                    occupyingPiece: null
                },
            7 : {
                    name : 'a7',
                    occupyingPiece: this.pieceElements.bPawn
                },
            8 : {
                    name : 'a8',
                    occupyingPiece: this.pieceElements.bRook
                }
            
        },
        b : {
            1 : {
                    name : 'b1',
                    occupyingPiece: this.pieceElements.wKnight
                },
            2 : {
                    name : 'b2',
                    occupyingPiece: this.pieceElements.wPawn
                },
            3 : {
                    name : 'b3',
                    occupyingPiece: null
                },
            4 : {
                    name : 'b4',
                    occupyingPiece: null
                },
            5 : {
                    name : 'b5',
                    occupyingPiece: null
                },
            6 : {
                    name : 'b6',
                    occupyingPiece: null
                },
            7 : {
                    name : 'b7',
                    occupyingPiece: this.pieceElements.bPawn
                },
            8 : {
                    name : 'b8',
                    occupyingPiece: this.pieceElements.bKnight
                }
            
        },
        c : {
            1 : {
                    name : 'c1',
                    occupyingPiece: this.pieceElements.wBishop
                },
            2 : {
                    name : 'c2',
                    occupyingPiece: this.pieceElements.wPawn
                },
            3 : {
                    name : 'c3',
                    occupyingPiece: null
                },
            4 : {
                    name : 'c4',
                    occupyingPiece: null
                },
            5 : {
                    name : 'c5',
                    occupyingPiece: null
                },
            6 : {
                    name : 'c6',
                    occupyingPiece: null
                },
            7 : {
                    name : 'c7',
                    occupyingPiece: this.pieceElements.bPawn
                },
            8 : {
                    name : 'c8',
                    occupyingPiece: this.pieceElements.bBishop
                }
            
        },
        d : {
            1 : {
                    name : 'd1',
                    occupyingPiece: this.pieceElements.wQueen                },
            2 : {
                    name : 'd2',
                    occupyingPiece: this.pieceElements.wPawn
                },
            3 : {
                    name : 'd3',
                    occupyingPiece: null
                },
            4 : {
                    name : 'd4',
                    occupyingPiece: null
                },
            5 : {
                    name : 'd5',
                    occupyingPiece: null
                },
            6 : {
                    name : 'd6',
                    occupyingPiece: null
                },
            7 : {
                    name : 'd7',
                    occupyingPiece: this.pieceElements.bPawn
                },
            8 : {
                    name : 'd8',
                    occupyingPiece: this.pieceElements.bQueen
                }
            
        },
        e : {
            1 : {
                    name : 'e1',
                    occupyingPiece: this.pieceElements.wKing
                },
            2 : {
                    name : 'e2',
                    occupyingPiece: this.pieceElements.wPawn
                },
            3 : {
                    name : 'e3',
                    occupyingPiece: null
                },
            4 : {
                    name : 'e4',
                    occupyingPiece: null
                },
            5 : {
                    name : 'e5',
                    occupyingPiece: null
                },
            6 : {
                    name : 'e6',
                    occupyingPiece: null
                },
            7 : {
                    name : 'e7',
                    occupyingPiece: this.pieceElements.bPawn
                },
            8 : {
                    name : 'e8',
                    occupyingPiece: this.pieceElements.bKing
                }
            
        },
        f : {
            1 : {
                    name : 'f1',
                    occupyingPiece: this.pieceElements.wBishop
                },
            2 : {
                    name : 'f2',
                    occupyingPiece: this.pieceElements.wPawn
                },
            3 : {
                    name : 'f3',
                    occupyingPiece: null
                },
            4 : {
                    name : 'f4',
                    occupyingPiece: null
                },
            5 : {
                    name : 'f5',
                    occupyingPiece: null
                },
            6 : {
                    name : 'f6',
                    occupyingPiece: null
                },
            7 : {
                    name : 'f7',
                    occupyingPiece: this.pieceElements.bPawn
                },
            8 : {
                    name : 'f8',
                    occupyingPiece: this.pieceElements.bBishop
                }
            
        },
        g : {
            1 : {
                    name : 'g1',
                    occupyingPiece: this.pieceElements.wKnight
                },
            2 : {
                    name : 'g2',
                    occupyingPiece: this.pieceElements.wPawn
                },
            3 : {
                    name : 'g3',
                    occupyingPiece: null
                },
            4 : {
                    name : 'g4',
                    occupyingPiece: null
                },
            5 : {
                    name : 'g5',
                    occupyingPiece: null
                },
            6 : {
                    name : 'g6',
                    occupyingPiece: null
                },
            7 : {
                    name : 'g7',
                    occupyingPiece: this.pieceElements.bPawn
                },
            8 : {
                    name : 'g8',
                    occupyingPiece: this.pieceElements.bKnight
                }
            
        },
        h : {
            1 : {
                    name : 'h1',
                    occupyingPiece: this.pieceElements.wRook
                },
            2 : {
                    name : 'h2',
                    occupyingPiece: this.pieceElements.wPawn
                },
            3 : {
                    name : 'h3',
                    occupyingPiece: null
                },
            4 : {
                    name : 'h4',
                    occupyingPiece: null
                },
            5 : {
                    name : 'h5',
                    occupyingPiece: null
                },
            6 : {
                    name : 'h6',
                    occupyingPiece: null
                },
            7 : {
                    name : 'h7',
                    occupyingPiece: this.pieceElements.bPawn
                },
            8 : {
                    name : 'h8',
                    occupyingPiece: this.pieceElements.bRook
                }
        }
    }
}