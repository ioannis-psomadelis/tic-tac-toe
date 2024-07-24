import { createAction, props } from '@ngrx/store'

// Board Actions
export const boardActions = {
    setBoardSize: createAction(
        '[Board] Set Board Size',
        props<{ boardSize: [number, number] | null }>()
    ),
    setBoardContent: createAction(
        '[Board] Set Board Content',
        props<{ boardContent: ('X' | 'O' | null)[][] }>()
    ),
    setWinner: createAction(
        '[Board] Set Winner',
        props<{
            winner: 'X' | 'O' | 'none' | null
        }>()
    ),
    setWinPath: createAction(
        '[Board] Set Win Path',
        props<{ winPath: [number, number][] | null }>()
    ),
    setCurrentPlayer: createAction(
        '[Board] Set Current Player',
        props<{ player: 'X' | 'O' | null }>()
    ),
}
