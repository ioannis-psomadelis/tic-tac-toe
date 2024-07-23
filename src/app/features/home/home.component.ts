import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { BoardComponent } from '../../components/board/board.component'
import { BoardFacade } from '../../+state/board.facade'
import { AsyncPipe } from '@angular/common'
import { BoardInfoComponent } from '../../components/board-info/board-info.component'
import { BoardPlayerComponent } from '../../components/board-player/board-player.component'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Utils } from '../../shared/utils/utils'

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
    winner$ = this.boardFacade.winner$

    canChangeGame = true
    canCreateGame = true

    ngOnInit() {
        this.handleCanChangeGame()
    }

    handleStartGame(event: number): void {
        this.boardFacade.setBoard(event)
        this.boardFacade.setCurrentPlayer(Utils.setRandomPlayer() as 'X' | 'O')
    }

    handleCanChangeGame(): boolean {
        this.boardFacade.winner$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((winner) => {
                this.canCreateGame = winner === 'X' || winner === 'O'
            })

        this.boardFacade.currentPlayer$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((player) => {
                this.canChangeGame = !(player === 'X' || player === 'O')
            })

        debugger
        return this.canChangeGame && this.canCreateGame
    }
}
