import { inject, Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, take } from 'rxjs'
import { boardActions } from './board.actions'
import {
    selectBoardSize,
    selectCurrentPlayer,
    selectWinner,
    selectBoardState,
    selectBoard,
} from './board.selectors'
import { BoardState } from './board.state'
import { Utils } from '../shared/utils'

@Injectable({
    providedIn: 'root',
})
export class BoardFacade {
    #store = inject(Store)

    boardContent$: Observable<BoardState['boardContent']>
    boardSize$: Observable<BoardState['boardSize']>
    currentPlayer$: Observable<BoardState['currentPlayer']>
    winner$: Observable<BoardState['winner']>

    constructor() {
        this.boardSize$ = this.#store.select(selectBoardSize)
        this.boardContent$ = this.#store.select(selectBoard)
        this.currentPlayer$ = this.#store.select(selectCurrentPlayer)
        this.winner$ = this.#store.select(selectWinner)
    }

    setBoard(boardSize: number) {
        const emptyBoardContent = Utils.createEmptyBoard(boardSize)
        this.#store.dispatch(
            boardActions.setBoardContent({ boardContent: emptyBoardContent })
        )
        this.#store.dispatch(
            boardActions.setBoardSize({ boardSize: [boardSize, boardSize] })
        )
        this.#store.dispatch(
            boardActions.resetGame({ boardSize: [boardSize, boardSize] })
        )
        this.#store.dispatch(boardActions.setCurrentPlayer({ player: null }))
        debugger
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
        this.#store
            .select(selectBoardState)
            .pipe(take(1))
            .subscribe((state) => {
                const { boardContent, currentPlayer } = state
                const [row, col] = move

                if (boardContent && currentPlayer) {
                    debugger
                    const updatedBoardContent = boardContent.map(
                        (rowArray, rowIndex) =>
                            rowIndex === row
                                ? rowArray.map((cell, colIndex) =>
                                      colIndex === col ? currentPlayer : cell
                                  )
                                : rowArray
                    )

                    //set board move
                    this.#store.dispatch(
                        boardActions.setBoardContent({
                            boardContent: updatedBoardContent,
                        })
                    )

                    //check winner
                    const winner = this.checkWinner(
                        updatedBoardContent,
                        currentPlayer,
                        row,
                        col
                    )

                    //if winner else check draw and set current player
                    if (winner) {
                        // this.setWinner(currentPlayer, winner)
                    } else if (this.checkDraw(updatedBoardContent)) {
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
