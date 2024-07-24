//Board State

export interface BoardState {
    boardSize: [number, number]
    boardContent: ('X' | 'O' | null)[][]
    winner: 'X' | 'O' | 'none' | null
    winPath: [number, number][] | null
    currentPlayer: 'X' | 'O' | null
}

export const initialState: BoardState = {
    boardSize: [3, 3],
    boardContent: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    winner: null,
    winPath: null,
    currentPlayer: null,
}
