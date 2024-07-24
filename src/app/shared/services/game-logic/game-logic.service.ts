import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class GameLogicService {
    constructor() {}

    checkWinner(
        boardContent: ('X' | 'O' | null)[][],
        player: 'X' | 'O'
    ): { winner: boolean; path: [number, number][] } {
        let path: [number, number][] = []

        // Check rows and columns for a winner
        for (let i = 0; i < boardContent.length; i++) {
            let row_count = 0
            let col_count = 0
            path = []
            for (let j = 0; j < boardContent.length; j++) {
                if (boardContent[i][j] === player) {
                    row_count++
                    path.push([i, j])
                }
                if (boardContent[j][i] === player) {
                    col_count++
                }
            }
            if (row_count === boardContent.length) return { winner: true, path }
            path = []
            for (let j = 0; j < boardContent.length; j++) {
                if (boardContent[j][i] === player) {
                    path.push([j, i])
                }
            }
            if (col_count === boardContent.length) return { winner: true, path }
        }

        // Check diagonals for a winner
        let count = 0
        let anti_count = 0
        path = []
        for (let i = 0; i < boardContent.length; i++) {
            if (boardContent[i][i] === player) {
                count++
                path.push([i, i])
            }
            if (boardContent[i][boardContent.length - i - 1] === player) {
                anti_count++
            }
        }
        if (count === boardContent.length) return { winner: true, path }

        path = []
        for (let i = 0; i < boardContent.length; i++) {
            if (boardContent[i][boardContent.length - i - 1] === player) {
                path.push([i, boardContent.length - i - 1])
            }
        }

        if (anti_count === boardContent.length) return { winner: true, path }

        return { winner: false, path: [] }
    }

    checkDraw(boardContent: ('X' | 'O' | null)[][]): boolean {
        for (let i = 0; i < boardContent.length; i++) {
            for (let j = 0; j < boardContent[0].length; j++) {
                if (boardContent[i][j] === null) {
                    return false
                }
            }
        }
        return true
    }
}
