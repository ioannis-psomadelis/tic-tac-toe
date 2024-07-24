import { createAction, props } from '@ngrx/store'

// Board Actions
export const boardActions = {
    setBoardSize: createAction(
        '[Board] Set Board Size',
        props<{ boardSize: [number, number] | null }>()
    ),
    //Maybe move to playerActions
    setBoardContent: createAction(
        '[Board] Set Board Content',
        props<{ boardContent: ('X' | 'O' | null)[][] }>()
    ),

    //Winner -> maybe remove path?
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
    //Maybe Remove
    playerMove: createAction(
        '[Board] Player Move',
        props<{ move: [number, number] }>()
    ),
}
