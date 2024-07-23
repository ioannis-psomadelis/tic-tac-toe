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
import { Utils } from '../shared/utils/utils'
import { GameLogicService } from '../shared/services/game-logic/game-logic.service'
import { LocalStorageService } from '../shared/services/local-storage/local-storage.service'

@Injectable({
    providedIn: 'root',
})
export class BoardFacade {
    private readonly KEY = 'tic-tac-toe'

    #store = inject(Store)
    gameLogic = inject(GameLogicService)
    localStorageService = inject(LocalStorageService)

    boardContent$: Observable<BoardState['boardContent']>
    boardSize$: Observable<BoardState['boardSize']>
    currentPlayer$: Observable<BoardState['currentPlayer']>
    winner$: Observable<BoardState['winner']>

    constructor() {
        this.boardSize$ = this.#store.select(selectBoardSize)
        this.boardContent$ = this.#store.select(selectBoard)
        this.currentPlayer$ = this.#store.select(selectCurrentPlayer)
        this.winner$ = this.#store.select(selectWinner)

        ///Init local storage
        this.loadStateFromLocalStorage()
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

        this.saveStateToLocalStorage()
    }

    setEndRound(winner: 'X' | 'O' | 'none') {
        if (winner === 'none') {
            this.#store.dispatch(boardActions.setWinner({ winner }))
        } else {
            this.#store.dispatch(boardActions.setWinner({ winner }))
        }

        this.saveStateToLocalStorage()
    }

    setCurrentPlayer(player: 'X' | 'O' | null) {
        this.#store.dispatch(boardActions.setCurrentPlayer({ player }))

        this.saveStateToLocalStorage()
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

                    const winner = this.gameLogic.checkWinner(
                        updatedBoardContent,
                        currentPlayer
                    )

                    //if winner else check draw and set current player
                    if (winner) {
                        this.setEndRound(currentPlayer)
                    } else if (this.gameLogic.checkDraw(updatedBoardContent)) {
                        debugger
                        this.setEndRound('none')
                    } else {
                        this.setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
                    }

                    this.saveStateToLocalStorage()
                }
            })
    }

    //Game logic storage
    private saveStateToLocalStorage(): void {
        this.#store
            .select(selectBoardState)
            .pipe(take(1))
            .subscribe((state) => {
                this.localStorageService.setItem(this.KEY, state)
            })
    }

    private loadStateFromLocalStorage(): void {
        const state = this.localStorageService.getItem<BoardState>(this.KEY)
        if (state) {
            this.#store.dispatch(
                boardActions.setBoardContent({
                    boardContent: state.boardContent,
                })
            )
            this.#store.dispatch(
                boardActions.setBoardSize({ boardSize: state.boardSize })
            )
            this.#store.dispatch(
                boardActions.setCurrentPlayer({ player: state.currentPlayer })
            )
            this.#store.dispatch(
                boardActions.setWinner({ winner: state.winner })
            )
        }
    }
}
