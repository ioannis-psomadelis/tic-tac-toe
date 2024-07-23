import { Component, inject, input, OnInit, output } from '@angular/core'
import { BoardFacade } from '../../+state/board.facade'
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms'
import { Utils } from '../../shared/utils'
import { NgClass } from '@angular/common'

@Component({
    selector: 'app-board-info',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass],
    templateUrl: './board-info.component.html',
    styleUrl: './board-info.component.scss',
})
export class BoardInfoComponent implements OnInit {
    boardFacade = inject(BoardFacade)
    tableSizes = [2, 3, 4, 5, 6, 7, 8, 9, 10]

    //Injects
    fb = inject(FormBuilder)

    //Form
    boardSizeForm!: FormGroup

    //Inputs
    canChangeGame = input.required<boolean>()

    //Outputs
    startGame = output<number>()

    ngOnInit() {
        this.initForm()
    }

    onStartGame() {
        const size = this.boardSizeForm.get('boardSize')?.value
        this.startGame.emit(size)
    }

    initForm() {
        this.boardSizeForm = this.fb.group({
            boardSize: [3],
        })
    }
}
