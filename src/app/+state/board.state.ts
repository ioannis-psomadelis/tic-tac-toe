//Board State

export interface BoardState {
    boardSize: [number, number] | null
    boardContent: ('X' | 'O' | null)[][] | null
    winner: 'X' | 'O' | 'none' | null
    path: [number, number] | null
    currentPlayer: 'X' | 'O' | null
    winPath: [number, number] | null
}

export const initialState: BoardState = {
    boardSize: null,
    boardContent: null,
    winner: null,
    path: null,
    currentPlayer: null,
    winPath: null,
}
