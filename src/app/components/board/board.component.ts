import { Component, inject, OnInit, output } from '@angular/core'
import { CellComponent } from '../cell/cell.component'
import { CommonModule, NgFor, NgStyle } from '@angular/common'
import { BoardFacade } from '../../+state/board.facade'
import { Subject, takeUntil } from 'rxjs'

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
    boardContent$ = this.boardFacade.boardContent$
    currentPlayer$ = this.boardFacade.currentPlayer$
    private destroy$ = new Subject<void>()

    ngOnInit(): void {
        // Subscribe to boardContent$ to react to changes
        this.boardContent$
            .pipe(takeUntil(this.destroy$))
            .subscribe((boardContent) => {
                debugger
                console.log(boardContent)
            })
    }

    handleSquareClick(row: number, col: number): void {
        this.boardFacade.playerMove([row, col])
    }
}
