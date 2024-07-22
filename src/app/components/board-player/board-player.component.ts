import { Component, inject } from '@angular/core'
import { BoardFacade } from '../../+state/board.facade'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-board-player',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './board-player.component.html',
    styleUrl: './board-player.component.scss',
})
export class BoardPlayerComponent {
    boardFacade = inject(BoardFacade)
    player$ = this.boardFacade.currentPlayer$
}
