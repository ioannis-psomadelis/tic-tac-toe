//Common
import { Component, DestroyRef, inject, input, OnInit } from '@angular/core'
import { CommonModule, NgFor, NgStyle } from '@angular/common'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

//Component
import { CellComponent } from '../cell/cell.component'

//State
import { BoardFacade } from '../../+state/board.facade'
import { BoardState } from '../../+state/board.state'

@Component({
    selector: 'app-board',
    standalone: true,
    imports: [CommonModule, NgStyle, NgFor, CellComponent],
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
    boardFacade = inject(BoardFacade)
    destroyRef = inject(DestroyRef)

    boardSize$ = this.boardFacade.boardSize$
    boardContent$ = this.boardFacade.boardContent$
    currentPlayer$ = this.boardFacade.currentPlayer$
    winner$ = this.boardFacade.winner$

    //use local vars using state interfaces
    boardContent!: BoardState['boardContent']
    currentPlayer!: BoardState['currentPlayer']

    canCreateGame = input.required<boolean>()

    ngOnInit(): void {
        //feed to child and helper
        this.boardContent$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((boardContent) => {
                this.boardContent = boardContent
                console.log(this.boardContent)
            })
        this.currentPlayer$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((currentPlayer) => {
                this.currentPlayer = currentPlayer
                console.log(this.currentPlayer)
            })
    }

    handleSquareClick(row: number, col: number): void {
        if (!this.canClick(row, col)) {
            return
        }
        this.boardFacade.playerMove([row, col])
    }

    canClick(row: number, col: number): boolean {
        //check if cell is empty or current player to disable click
        return !(
            this.boardContent?.[row]?.[col] === 'X' ||
            this.boardContent?.[row]?.[col] === 'O' ||
            this.currentPlayer === null
        )
    }
}
