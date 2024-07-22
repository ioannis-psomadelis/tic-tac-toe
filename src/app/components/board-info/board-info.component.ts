import { Component, inject } from '@angular/core'
import { BoardFacade } from '../../+state/board.facade'

@Component({
    selector: 'app-board-info',
    standalone: true,
    imports: [],
    templateUrl: './board-info.component.html',
    styleUrl: './board-info.component.scss',
})
export class BoardInfoComponent {
    boardFacade = inject(BoardFacade)
    tableSize = [2, 3, 4, 5, 6, 7, 8, 9, 10]

    boardSize: [number, number] = [3, 3]

    handleBoardSizeChange(event: Event) {
        const target = event.target as HTMLSelectElement
        this.boardSize = [parseInt(target.value), parseInt(target.value)]
    }

    startGame() {
        this.boardFacade.resetGame()
        this.boardFacade.setBoard(this.boardSize)
        this.boardFacade.setCurrentPlayer(this.setRandomPlayer() as 'X' | 'O')
        debugger
    }

    setRandomPlayer() {
        const player = ['X', 'O']
        return player[Math.round(Math.random())]
    }
}
