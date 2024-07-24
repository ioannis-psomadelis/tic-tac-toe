//Common
import { Component, inject, input } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { NgClass } from '@angular/common'

//State + interfaces
import { BoardFacade } from '../../+state/board.facade'
import { BoardState } from '../../+state/board.state'

//Components UI
import { InfoBoxComponent } from '../../shared/ui/info-box/info-box.component'
import { Utils } from '../../shared/utils/utils'
import { BoardSelectionFormComponent } from './board-selection-form/board-selection-form.component'

@Component({
    selector: 'app-board-info',
    standalone: true,
    imports: [
        InfoBoxComponent,
        ReactiveFormsModule,
        NgClass,
        BoardSelectionFormComponent,
    ],
    templateUrl: './board-info.component.html',
    styleUrl: './board-info.component.scss',
})
export class BoardInfoComponent {
    boardFacade = inject(BoardFacade)

    //Inputs
    canChangeGame = input.required<boolean>()
    canCreateGame = input.required<boolean>()
    boardSize = input.required<BoardState['boardSize']>()

    handleStartGame(event: number): void {
        this.handleChangeBoardSize(event)
        this.boardFacade.setCurrentPlayer(Utils.setRandomPlayer() as 'X' | 'O')
    }

    handleChangeBoardSize(event: number): void {
        this.boardFacade.setBoard(event)
    }
}
