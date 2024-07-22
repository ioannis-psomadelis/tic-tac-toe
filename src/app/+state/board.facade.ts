import { inject, Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { boardActions } from './board.actions'
import {
    selectBoardSize,
    selectCurrentPlayer,
    selectWinner,
    selectBoardState,
    selectBoard,
} from './board.selectors'
import { BoardState } from './board.state'

@Injectable({
    providedIn: 'root',
})
export class BoardFacade {
    #store = inject(Store)

    board$: Observable<BoardState['boardContent']>
    boardSize$: Observable<BoardState['boardSize']>
    currentPlayer$: Observable<BoardState['currentPlayer']>
    winner$: Observable<BoardState['winner']>

    constructor() {
        this.boardSize$ = this.#store.select(selectBoardSize)
        this.board$ = this.#store.select(selectBoard)
        this.currentPlayer$ = this.#store.select(selectCurrentPlayer)
        this.winner$ = this.#store.select(selectWinner)
    }

    setBoard(boardSize: [number, number]) {
        this.#store.dispatch(boardActions.setBoardSize({ boardSize }))
        this.#store.dispatch(boardActions.setBoardContent({ boardContent: [] }))
    }

    resetGame(size: number = 3) {
        const emptyBoard: ('X' | 'O' | null)[][] = Array.from(
            { length: size },
            () => Array(size).fill(null)
        )
        debugger
        this.#store.dispatch(
            boardActions.setBoardContent({ boardContent: emptyBoard })
        )
        this.#store.dispatch(
            boardActions.resetGame({ boardSize: [size, size] })
        )
        this.#store.dispatch(
            boardActions.setBoardSize({ boardSize: [size, size] })
        )
        this.#store.dispatch(boardActions.setCurrentPlayer({ player: null }))
    }

    setEndRound(winner: 'X' | 'O' | 'none') {
        if (winner === 'none') {
            this.#store.dispatch(boardActions.setWinner({ winner }))
        } else {
            this.#store.dispatch(boardActions.setWinner({ winner }))
        }
    }

    setCurrentPlayer(player: 'X' | 'O' | null) {
        this.#store.dispatch(boardActions.setCurrentPlayer({ player }))
    }

    playerMove(move: [number, number]) {
        this.#store.select(selectBoardState).subscribe((state) => {
            const { boardContent, currentPlayer } = state
            const [row, col] = move
            debugger
            if (
                boardContent &&
                boardContent[row][col] === null &&
                currentPlayer
            ) {
                boardContent[row][col] = currentPlayer

                //set board move
                this.#store.dispatch(
                    boardActions.setBoardContent({ boardContent: boardContent })
                )

                //check winner
                const winner = this.checkWinner(
                    boardContent,
                    currentPlayer,
                    row,
                    col
                )

                //if winner else check draw and set current player
                if (winner) {
                    // this.setWinner(currentPlayer, winner)
                } else if (this.checkDraw(boardContent)) {
                    this.setEndRound('none')
                } else {
                    this.setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
                }
            }
        })
    }

    private checkWinner(
        board: ('X' | 'O' | null)[][],
        player: 'X' | 'O',
        row: number,
        col: number
    ): [number, number][] | null {
        const size = board.length
        const winLength = 5 // length of sequence needed to win

        const directions = [
            [
                [0, 1],
                [0, -1],
            ], // horizontal
            [
                [1, 0],
                [-1, 0],
            ], // vertical
            [
                [1, 1],
                [-1, -1],
            ], // diagonal \
            [
                [1, -1],
                [-1, 1],
            ], // diagonal /
        ]

        for (const direction of directions) {
            let count = 1
            const path: [number, number][] = [[row, col]]

            for (const [dx, dy] of direction) {
                for (let i = 1; i < winLength; i++) {
                    const newRow = row + dx * i
                    const newCol = col + dy * i
                    if (
                        newRow >= 0 &&
                        newRow < size &&
                        newCol >= 0 &&
                        newCol < size &&
                        board[newRow][newCol] === player
                    ) {
                        count++
                        path.push([newRow, newCol])
                    } else {
                        break
                    }
                }
            }

            if (count >= winLength) {
                return path
            }
        }

        return null
    }

    private checkDraw(board: ('X' | 'O' | null)[][]): boolean {
        return board.every((row) => row.every((cell) => cell !== null))
    }
}
