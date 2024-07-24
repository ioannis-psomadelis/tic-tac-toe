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

    //facade
    boardSize$ = this.boardFacade.boardSize$
    boardContent$ = this.boardFacade.boardContent$
    winPath$ = this.boardFacade.winPath$

    //use local vars using state interfaces
    boardContent!: BoardState['boardContent']
    winPath!: BoardState['winPath']

    //Inputs
    canCreateGame = input.required<boolean>()
    winner = input.required<BoardState['winner']>()
    currentPlayer = input.required<BoardState['currentPlayer']>()

    ngOnInit(): void {
        //feed to child and helper
        this.boardContent$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((boardContent) => {
                this.boardContent = boardContent
                console.log(this.boardContent)
            })
        this.winPath$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((winPath) => {
                this.winPath = winPath
                console.log(this.winPath)
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
            this.currentPlayer() === null
        )
    }

    returnWinnerCells(row: number, col: number): boolean {
        if (this.winPath && (this.winner() === 'X' || this.winner() === 'O')) {
            return this.winPath.some(([r, c]) => r === row && c === col)
        } else {
            return false
        }
    }
}
