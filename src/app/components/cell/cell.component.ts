import { Component, inject, input, OnInit, output } from '@angular/core'
import { BoardFacade } from '../../+state/board.facade'
import { CommonModule } from '@angular/common'
import { BoardState } from '../../+state/board.state'

@Component({
    selector: 'app-cell',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cell.component.html',
    styleUrl: './cell.component.scss',
})
export class CellComponent implements OnInit {
    boardFacade = inject(BoardFacade)

    boardContent$ = this.boardFacade.boardContent$

    value = input.required<BoardState['currentPlayer']>()
    canClick = input.required<boolean>()
    canCreateGame = input.required<boolean>()

    clicked = output<void>()
    // @Output() click = new EventEmitter<void>();

    ngOnInit() {}

    onClick() {
        this.clicked.emit()
    }
}
