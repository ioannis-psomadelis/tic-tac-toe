import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { BoardComponent } from '../../components/board/board.component'
import { BoardFacade } from '../../+state/board.facade'
import { AsyncPipe } from '@angular/common'
import { BoardInfoComponent } from '../../components/board-info/board-info.component'
import { BoardPlayerComponent } from '../../components/board-player/board-player.component'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Utils } from '../../shared/utils'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        BoardComponent,
        BoardInfoComponent,
        BoardPlayerComponent,
        AsyncPipe,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    boardFacade = inject(BoardFacade)
    destroyRef = inject(DestroyRef)
    currentPlayer$ = this.boardFacade.currentPlayer$
    boardSize$ = this.boardFacade.boardSize$
    canChangeGame = true

    ngOnInit() {
        this.handleCanChangeGame()
    }

    handleStartGame(event: number): void {
        debugger
        this.boardFacade.setBoard(event)

        this.boardFacade.setCurrentPlayer(Utils.setRandomPlayer() as 'X' | 'O')
    }

    handleCanChangeGame(): boolean {
        debugger
        this.boardFacade.currentPlayer$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((player) => {
                return (this.canChangeGame = !(
                    player === 'X' || player === 'O'
                ))
            })
        return this.canChangeGame
    }
}
