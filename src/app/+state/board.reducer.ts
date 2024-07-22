import { createReducer, on } from '@ngrx/store'
import { boardActions } from './board.actions'
import { initialState } from './board.state'

export const boardReducer = createReducer(
    initialState,
    on(boardActions.setBoardSize, (state, { boardSize }) => ({
        ...state,
        boardSize,
    })),
    on(boardActions.resetGame, (state) => ({
        ...state,
        boardSize: initialState.boardSize,
        winner: null,
        path: null,
    })),
    on(boardActions.setWinner, (state, { winner }) => ({
        ...state,
        winner,
    })),
    on(boardActions.setCurrentPlayer, (state, { player }) => ({
        ...state,
        currentPlayer: player,
    })),
    on(boardActions.playerMove, (state, { move }) => ({
        ...state,
        move,
    }))
)
