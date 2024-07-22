import { Component, inject, OnInit } from '@angular/core'
import { CellComponent } from '../cell/cell.component'
import { CommonModule, NgFor, NgStyle } from '@angular/common'
import { BoardFacade } from '../../+state/board.facade'

@Component({
    selector: 'app-board',
    standalone: true,
    imports: [CommonModule, NgStyle, NgFor, CellComponent],
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
    boardFacade = inject(BoardFacade)
    boardSize$ = this.boardFacade.boardSize$
    currentPlayer$ = this.boardFacade.currentPlayer$
    winner$ = this.boardFacade.winner$

    ngOnInit() {
        this.initBoard()
    }

    initBoard() {}

    handleSquareClick(row: number, col: number) {
        debugger
        this.boardFacade.playerMove([row, col])
    }

    decideWinner() {}

    handleResetGame() {
        // this.resetGame.emit()
        this.initBoard()
    }
}
