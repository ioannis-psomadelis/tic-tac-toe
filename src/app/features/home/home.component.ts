import { Component, inject } from '@angular/core'
import { BoardComponent } from '../../components/board/board.component'
import { BoardFacade } from '../../+state/board.facade'
import { AsyncPipe } from '@angular/common'
import { BoardInfoComponent } from '../../components/board-info/board-info.component'
import { BoardPlayerComponent } from '../../components/board-player/board-player.component'

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
export class HomeComponent {}
