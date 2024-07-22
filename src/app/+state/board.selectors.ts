import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BoardState } from './board.state'

export const selectBoardState = createFeatureSelector<BoardState>('board')

export const selectBoard = createSelector(
    selectBoardState,
    (state) => state.boardContent
)

export const selectBoardSize = createSelector(
    selectBoardState,
    (state) => state.boardSize
)

export const selectWinner = createSelector(
    selectBoardState,
    (state) => state.winner
)

export const selectPath = createSelector(
    selectBoardState,
    (state) => state.path
)

export const selectCurrentPlayer = createSelector(
    selectBoardState,
    (state) => state.currentPlayer
)

export const selectWinPath = createSelector(
    selectBoardState,
    (state) => state.winPath
)
