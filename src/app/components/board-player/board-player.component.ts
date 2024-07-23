import { Component, inject, input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BoardState } from '../../+state/board.state'
import { InfoBoxComponent } from '../../shared/ui/info-box/info-box.component'

@Component({
    selector: 'app-board-player',
    standalone: true,
    imports: [CommonModule, InfoBoxComponent],
    templateUrl: './board-player.component.html',
    styleUrl: './board-player.component.scss',
})
export class BoardPlayerComponent {
    currentPlayer = input.required<BoardState['currentPlayer']>()
    winner = input.required<BoardState['winner']>()
}
