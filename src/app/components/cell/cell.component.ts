import { Component, inject, input, output } from '@angular/core'
import { BoardFacade } from '../../+state/board.facade'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-cell',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cell.component.html',
    styleUrl: './cell.component.scss',
})
export class CellComponent {
    boardFacade = inject(BoardFacade)

    currentPlayer$ = this.boardFacade.currentPlayer$
    currentPlayer!: 'X' | 'O' | null

    value = input.required<'X' | 'O' | null>()
    clicked = output<void>()
    // @Output() click = new EventEmitter<void>();

    ngOnInit() {
        this.boardFacade.currentPlayer$.subscribe((player) => {
            this.currentPlayer = player
        })
        // this.currentPlayer$.subscribe((player) => {
        //     console.log(player)
        // })
    }

    onClick() {
        debugger
        if (this.currentPlayer === null) {
            return
        }
        this.clicked.emit()
    }
}
