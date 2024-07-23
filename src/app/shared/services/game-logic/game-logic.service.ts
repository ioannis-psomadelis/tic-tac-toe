import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class GameLogicService {
    constructor() {}

    checkWinner(
        boardContent: ('X' | 'O' | null)[][],
        player: 'X' | 'O'
    ): boolean {
        // Check rows and columns for a winner
        debugger
        for (let i = 0; i < boardContent.length; i++) {
            let row_count = 0
            let col_count = 0
            for (let j = 0; j < boardContent.length; j++) {
                if (boardContent[i][j] === player) row_count++
                if (boardContent[j][i] === player) col_count++
            }
            if (
                row_count === boardContent.length ||
                col_count === boardContent.length
            )
                return true
        }

        // Check diagonals for a winner
        let count = 0
        let anti_count = 0
        for (let i = 0; i < boardContent.length; i++) {
            if (boardContent[i][i] === player) count++
            if (boardContent[i][boardContent.length - i - 1] === player)
                anti_count++
            if (
                count === boardContent.length ||
                anti_count === boardContent.length
            )
                return true
        }
        return false
    }
}
