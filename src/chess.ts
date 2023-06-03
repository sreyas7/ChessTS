class Chess {
  private player: Player;
  private squares: Square[];

  constructor(player: Player, squares: Square[]) {
    this.player = player;
    this.squares = squares;
  }

  getSquares(): Square[] {
    return this.squares;
  }

  getSquaresCopy(): Square[] {
    return this.squares.map((square) => square.hasPiece ? { ...square, piece: {...square.piece} } : {...square});
  }

  getPlayer() {
    return this.player;
  }

  changePlayer() {
    this.player = this.player === "one" ? "two" : "one";
  }

  getTop(rank: number, file: number, multiple: boolean, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    const moves: number[][] = [];
    let row = rank, col = file;
    if(row === 1) return [];
    if(squares[this.getIndex(row-1, col)].hasPiece) return squares[this.getIndex(row-1, col)].piece!.player !== player ? [[row-1, col]] : [];
    if(multiple) {
      while(row > 1) {
        if(squares[this.getIndex(row-1, col)].hasPiece) break;
        moves.push([row-1, col]);
        row -= 1;
      }
      return row === 1 ? moves : squares[this.getIndex(row-1, col)].piece!.player !== player ? [[row-1, col], ...moves] : moves;
    }
    return [[row-1, col]];
  }

  getBottom(rank: number, file: number, multiple: boolean, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    const moves: number[][] = [];
    let row = rank, col = file;
    if(row === 8) return [];
    if(squares[this.getIndex(row+1, col)].hasPiece) return squares[this.getIndex(row+1, col)].piece!.player !== player ? [[row+1, col]] : [];
    if(multiple) {
      while(row < 8) {
        if(squares[this.getIndex(row+1, col)].hasPiece) break;
        moves.push([row+1, col]);
        row += 1;
      }
      return row === 8 ? moves : squares[this.getIndex(row+1, col)].piece!.player !== player ? [[row+1, col], ...moves] : moves;
    }
    return [[row+1, col]];
  }

  getLeft(rank: number, file: number, multiple: boolean, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    const moves: number[][] = [];
    let row = rank, col = file;
    if(col === 1) return [];
    if(squares[this.getIndex(row, col-1)].hasPiece) return squares[this.getIndex(row, col-1)].piece!.player !== player ? [[row, col-1]] : [];
    if(multiple) {
      while(col > 1) {
        if(squares[this.getIndex(row, col-1)].hasPiece) break;
        moves.push([row, col-1]);
        col -= 1;
      }
      return col === 1 ? moves : squares[this.getIndex(row, col-1)].piece!.player !== player ? [[row, col-1], ...moves] : moves;
    }
    return [[row, col-1]];
  }

  getRight(rank: number, file: number, multiple: boolean, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    const moves: number[][] = [];
    let row = rank, col = file;
    if(col === 8) return [];
    if(squares[this.getIndex(row, col+1)].hasPiece) return squares[this.getIndex(row, col+1)].piece!.player !== player ? [[row, col+1]] : [];
    if(multiple) {
      while(col < 8) {
        if(squares[this.getIndex(row, col+1)].hasPiece) break;
        moves.push([row, col+1]);
        col += 1;
      }
      return col === 8 ? moves : squares[this.getIndex(row, col+1)].piece!.player !== player ? [[row, col+1], ...moves] : moves;
    }
    return [[row, col+1]];
  }

  getTopRight(rank: number, file: number, multiple: boolean, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    const moves: number[][] = [];
    let row = rank, col = file;
    if(row === 1 || col === 8) return [];
    if(squares[this.getIndex(row-1, col+1)].hasPiece) return squares[this.getIndex(row-1, col+1)].piece!.player !== player ? [[row-1, col+1]] : [];
    if(multiple) {
      while(row > 1 && col < 8) {
        if(squares[this.getIndex(row-1, col+1)].hasPiece) break;
        moves.push([row-1, col+1]);
        row -= 1, col += 1;
      }
      return row === 1 || col === 8 ? moves : squares[this.getIndex(row-1, col+1)].piece!.player !== player ? [[row-1, col+1], ...moves] : moves;
    }
    return [[row-1, col+1]];
  }

  getTopLeft(rank: number, file: number, multiple: boolean, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    const moves: number[][] = [];
    let row = rank, col = file;
    if(row === 1 || col === 1) return [];
    if(squares[this.getIndex(row-1, col-1)].hasPiece) return squares[this.getIndex(row-1, col-1)].piece!.player !== player ? [[row-1, col-1]] : [];
    if(multiple) {
      while(row > 1 && col > 1) {
        if(squares[this.getIndex(row-1, col-1)].hasPiece) break;
        moves.push([row-1, col-1]);
        row -= 1, col -= 1;
      }
      return row === 1 || col === 1 ? moves : squares[this.getIndex(row-1, col-1)].piece!.player !== player ? [[row-1, col-1], ...moves] : moves;
    }
    return [[row-1, col-1]];
  }

  getBottomRight(rank: number, file: number, multiple: boolean, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    const moves: number[][] = [];
    let row = rank, col = file;
    if(row === 8 || col === 8) return [];
    if(squares[this.getIndex(row+1, col+1)].hasPiece) return squares[this.getIndex(row+1, col+1)].piece!.player !== player ? [[row+1, col+1]] : [];
    if(multiple) {
      while(row < 8 && col < 8) {
        if(squares[this.getIndex(row+1, col+1)].hasPiece) break;
        moves.push([row+1, col+1]);
        row += 1, col += 1;
      }
      return row === 8 || col === 8 ? moves : squares[this.getIndex(row+1, col+1)].piece!.player !== player ? [[row+1, col+1], ...moves] : moves;
    }
    return [[row+1, col+1]];
  }

  getBottomLeft(rank: number, file: number, multiple: boolean, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    const moves: number[][] = [];
    let row = rank, col = file;
    if(row === 8 || col === 1) return [];
    if(squares[this.getIndex(row+1, col-1)].hasPiece) return squares[this.getIndex(row+1, col-1)].piece!.player !== player ? [[row+1, col-1]] : [];
    if(multiple) {
      while(row < 8 && col > 1) {
        if(squares[this.getIndex(row+1, col-1)].hasPiece) break;
        moves.push([row+1, col-1]);
        row += 1, col -= 1;
      }
      return row === 8 || col === 1 ? moves : squares[this.getIndex(row+1, col-1)].piece!.player !== player ? [[row+1, col-1], ...moves] : moves;
    }
    return [[row+1, col-1]];
  }

  getMovesForQueen(rank: number, file: number, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    return [
      ...this.getTop(rank, file, true, player, squares),
      ...this.getBottom(rank, file, true, player, squares),
      ...this.getLeft(rank, file, true, player, squares),
      ...this.getRight(rank, file, true, player, squares),
      ...this.getTopRight(rank, file, true, player, squares), 
      ...this.getTopLeft(rank, file, true, player, squares),
      ...this.getBottomRight(rank, file, true, player, squares),
      ...this.getBottomLeft(rank, file, true, player, squares),
    ];
  }

  getMovesForKing(rank: number, file: number, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    return [
      ...this.getTop(rank, file, false, player, squares),
      ...this.getBottom(rank, file, false, player, squares),
      ...this.getLeft(rank, file, false, player, squares),
      ...this.getRight(rank, file, false, player, squares),
      ...this.getTopRight(rank, file, false, player, squares), 
      ...this.getTopLeft(rank, file, false, player, squares),
      ...this.getBottomRight(rank, file, false, player, squares),
      ...this.getBottomLeft(rank, file, false, player, squares),
    ];
  }

  getMovesForBishop(rank: number, file: number, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    return [
      ...this.getTopRight(rank, file, true, player, squares), 
      ...this.getTopLeft(rank, file, true, player, squares),
      ...this.getBottomRight(rank, file, true, player, squares),
      ...this.getBottomLeft(rank, file, true, player, squares),
    ];
  }

  getMovesForRook(rank: number, file: number, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    return [
      ...this.getTop(rank, file, true, player, squares),
      ...this.getBottom(rank, file, true, player, squares),
      ...this.getLeft(rank, file, true, player, squares),
      ...this.getRight(rank, file, true, player, squares),
    ];
  }

  getMovesForKnight(rank: number, file: number, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    const moves: number[][] = [];
    
    if(this.getIndex(rank+1, file+2) !== -1 && (!squares[this.getIndex(rank+1, file+2)].hasPiece || squares[this.getIndex(rank+1, file+2)].hasPiece && squares[this.getIndex(rank+1, file+2)].piece!.player !== player)) moves.push([rank+1, file+2]);
    if(this.getIndex(rank+1, file-2) !== -1 && (!squares[this.getIndex(rank+1, file-2)].hasPiece || squares[this.getIndex(rank+1, file-2)].hasPiece && squares[this.getIndex(rank+1, file-2)].piece!.player !== player)) moves.push([rank+1, file-2]);

    if(this.getIndex(rank+2, file-1) !== -1 && (!squares[this.getIndex(rank+2, file-1)].hasPiece || squares[this.getIndex(rank+2, file-1)].hasPiece && squares[this.getIndex(rank+2, file-1)].piece!.player !== player)) moves.push([rank+2, file-1]);
    if(this.getIndex(rank+2, file+1) !== -1 && (!squares[this.getIndex(rank+2, file+1)].hasPiece || squares[this.getIndex(rank+2, file+1)].hasPiece && squares[this.getIndex(rank+2, file+1)].piece!.player !== player)) moves.push([rank+2, file+1]);
    
    if(this.getIndex(rank-2, file+1) !== -1 && (!squares[this.getIndex(rank-2, file+1)].hasPiece || squares[this.getIndex(rank-2, file+1)].hasPiece && squares[this.getIndex(rank-2, file+1)].piece!.player !== player)) moves.push([rank-2, file+1]);
    if(this.getIndex(rank-2, file-1) !== -1 && (!squares[this.getIndex(rank-2, file-1)].hasPiece || squares[this.getIndex(rank-2, file-1)].hasPiece && squares[this.getIndex(rank-2, file-1)].piece!.player !== player)) moves.push([rank-2, file-1]);

    if(this.getIndex(rank-1, file+2) !== -1 && (!squares[this.getIndex(rank-1, file+2)].hasPiece || squares[this.getIndex(rank-1, file+2)].hasPiece && squares[this.getIndex(rank-1, file+2)].piece!.player !== player)) moves.push([rank-1, file+2]);
    if(this.getIndex(rank-1, file-2) !== -1 && (!squares[this.getIndex(rank-1, file-2)].hasPiece || squares[this.getIndex(rank-1, file-2)].hasPiece && squares[this.getIndex(rank-1, file-2)].piece!.player !== player)) moves.push([rank-1, file-2]);

    return moves;
  }

  getMovesForPawn(rank: number, file: number, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    const moves: number[][] = [];
    if(player === "one") {
      if(this.getIndex(rank+1, file+1) !== -1 && squares[this.getIndex(rank+1, file+1)].hasPiece && squares[this.getIndex(rank+1, file+1)].piece!.player !== player) moves.push([rank+1, file+1]);
      if(this.getIndex(rank+1, file-1) !== -1 && squares[this.getIndex(rank+1, file-1)].hasPiece && squares[this.getIndex(rank+1, file-1)].piece!.player !== player) moves.push([rank+1, file-1]);
      if(this.getIndex(rank+1, file) !== -1 && !squares[this.getIndex(rank+1, file)].hasPiece) {
        moves.push([rank+1, file]);
        if(rank === 2) if(!squares[this.getIndex(rank+2, file)].hasPiece) moves.push([rank+2, file]);
      }
    } else {
      if(this.getIndex(rank-1, file+1) !== -1 && squares[this.getIndex(rank-1, file+1)].hasPiece && squares[this.getIndex(rank-1, file+1)].piece!.player !== player) moves.push([rank-1, file+1]);
      if(this.getIndex(rank-1, file-1) !== -1 && squares[this.getIndex(rank-1, file-1)].hasPiece && squares[this.getIndex(rank-1, file-1)].piece!.player !== player) moves.push([rank-1, file-1]);
      if(this.getIndex(rank-1, file) !== -1 && !squares[this.getIndex(rank-1, file)].hasPiece) {
        moves.push([rank-1, file]);
        if(rank === 7) if(!squares[this.getIndex(rank-2, file)].hasPiece) moves.push([rank-2, file]);
      }
    }
    return moves;
  }

  getMoves(rank: number, file: number, player?: Player, squares?: Square[]): number[][] {
    if(player === undefined) player = this.player;
    if(squares === undefined) squares = this.squares;
    
    const square = squares[this.getIndex(rank, file)];
    switch(square.piece!.name) {
      case "queen": return this.getMovesForQueen(square.rank, square.file, player, squares);
      case "king": return this.getMovesForKing(square.rank, square.file, player, squares);
      case "bishop": return this.getMovesForBishop(square.rank, square.file, player, squares);
      case "knight": return this.getMovesForKnight(square.rank, square.file, player, squares);
      case "rook": return this.getMovesForRook(square.rank, square.file, player, squares);
      case "pawn": return this.getMovesForPawn(square.rank, square.file, player, squares);
      default: return [];
    }
  }

  getFilteredMoves(rank: number, file: number): number[][] {
    // make each of that move, if the king is in danger, remove that move
    const moves = this.getMoves(rank, file);
    const opponent: Player = this.player === "one" ? "two" : "one";
    const unfeasible: number[] = [];
    for(let i = 0; i < moves.length; i++) {
      const updatedSquares: Square[] = this.getSquaresCopy();
      this.makeMove(this.getIndex(rank, file) , this.getIndex(moves[i][0], moves[i][1]), updatedSquares);
      const playerKingSquare: Square = updatedSquares.filter((updatedSquare) => updatedSquare.hasPiece && updatedSquare.piece.player === this.player && updatedSquare.piece.name === "king")[0];
      const opponentSquares = updatedSquares.filter((updatedSquare) => updatedSquare.hasPiece && updatedSquare.piece.player === opponent);
      for(let opponentSquare of opponentSquares) {
        const opponentMoves: number[][] = this.getMoves(opponentSquare.rank, opponentSquare.file, opponent, updatedSquares);
        for(let opponentMove of opponentMoves) {
          if(opponentMove[0] === playerKingSquare.rank && opponentMove[1] === playerKingSquare.file) unfeasible.push(i);
        }
      }
    }
    return moves.filter((move, index) => unfeasible.indexOf(index) === -1);
  }

  makeMove(from : number, to: number, squares?: Square[]) {
    if(squares === undefined) squares = this.squares;
    squares[to] = { ...squares[to], hasPiece: true, isActive: false, piece: {...squares[from].piece!} };
    squares[from] = { ...squares[from], hasPiece: false, isActive: false, piece: null };
  }

  getIndex(rank: number, file: number): number {
    return rank >= 1 && rank <= 8 && file >= 1 && file <= 8 ? 8*(rank-1) + (file-1) : -1;
  }

  isOver(): boolean {
    const playerSquares = this.squares.filter((square) => square.hasPiece && square.piece.player === this.player);
    for(let playerSquare of playerSquares) {
      const filteredMoves = this.getFilteredMoves(playerSquare.rank, playerSquare.file);
      if(filteredMoves.length > 0) return false;
    }
    return true;
  }

  activate(moves: number[][]) {
    for(let move of moves) {
      this.squares[this.getIndex(move[0], move[1])].isActive = true;
    }
  }

  deactivate(moves: number[][]) {
    for(let move of moves) {
      this.squares[this.getIndex(move[0], move[1])].isActive = false;
    }
  }
}

function handleSquareClick(this: HTMLElement, ev: MouseEvent) {
  if(selectedSquare === null) {
    if(this.classList.contains(chess.getPlayer())) {
      selectedSquare = [+this.getAttribute("rank")!, +this.getAttribute("file")!];
      moves = chess.getFilteredMoves(selectedSquare[0], selectedSquare[1]);
      chess.activate([selectedSquare, ...moves]);
      console.log(selectedSquare, moves);
    }
  } else {
    if(selectedSquare[0] === +this.getAttribute("rank")! && selectedSquare[1] === +this.getAttribute("file")!) {
      chess.deactivate([selectedSquare, ...moves!]);
      selectedSquare = null;
    } else if(this.classList.contains(chess.getPlayer())) {
      chess.deactivate([selectedSquare, ...moves!]);
      selectedSquare = [+this.getAttribute("rank")!, +this.getAttribute("file")!];
      moves = chess.getFilteredMoves(selectedSquare[0], selectedSquare[1]);
      chess.activate([selectedSquare, ...moves]);
    } else {
      for(let move of moves!) {
        if(+this.getAttribute("rank")! === move[0] && +this.getAttribute("file")! === move[1]) {
          chess.makeMove(chess.getIndex(selectedSquare[0], selectedSquare[1]), chess.getIndex(move[0], move[1]));
          chess.changePlayer(); 
          break;
        }
      }
      chess.deactivate([selectedSquare, ...moves!]);
      selectedSquare = null;
      moves = null;
    }
  }
  render(board, chess.getSquares());
  if(chess.isOver()) location.reload();
}

function render(board: HTMLElement, squares: Square[]) {
  board.innerHTML = "";
  squares.forEach((square) => {
    const s = document.createElement("div");
    s.classList.add("square");
    s.setAttribute("rank", `${square.rank}`);
    s.setAttribute("file", `${square.file}`);
    if(square.hasPiece) {
      s.classList.add(square.piece.player);
      s.innerHTML = square.piece.content;
    }
    if(square.isActive) s.classList.add("active");

    if(square.rank%2 === 1) {
      square.file%2 === 1 ? s.classList.add("white") : s.classList.add("black");
    } else {
      square.file%2 === 1 ? s.classList.add("black") : s.classList.add("white");
    }

    board.appendChild(s);
  });

  board.querySelectorAll<HTMLElement>(".square").forEach((square) => {
    square.addEventListener("click", handleSquareClick);
  });
}

const board = document.querySelector<HTMLElement>("#chess-board")!;
const chess = new Chess("one", squares);
let selectedSquare: number[] | null = null;
let moves: number[][] | null = null;

render(board, chess.getSquares());
