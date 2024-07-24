import { Component, OnInit, inject, input, output } from '@angular/core'
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms'
import { NgClass } from '@angular/common'
import { BoardFacade } from '../../../+state/board.facade'
import { BoardState } from '../../../+state/board.state'

@Component({
    selector: 'app-board-selection-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgClass],
    templateUrl: './board-selection-form.component.html',
    styleUrl: './board-selection-form.component.scss',
})
export class BoardSelectionFormComponent implements OnInit {
    tableSizes = [2, 3, 4, 5, 6, 7, 8, 9, 10]

    //Getters
    get boardSizeField(): FormControl {
        return this.boardSizeForm.get('boardSize') as FormControl
    }

    //Injects
    fb = inject(FormBuilder)
    boardFacade = inject(BoardFacade)

    //Form
    boardSizeForm!: FormGroup

    //Inputs
    canChangeGame = input.required<boolean>()
    canCreateGame = input.required<boolean>()
    boardSize = input.required<BoardState['boardSize']>()

    //Outputs
    startGame = output<number>()
    changeBoardSize = output<number>()

    ngOnInit() {
        this.initForm()
        if (this.boardSize() && this.boardSize() !== null) {
            this.getBoardSizeFromState(this.boardSize())
        }
    }

    onChangeBoardSize(event: number): void {
        this.changeBoardSize.emit(event)
    }

    onStartGame() {
        this.startGame.emit(this.boardSizeField.value)
    }

    initForm() {
        this.boardSizeForm = this.fb.group({
            boardSize: [3],
        })
    }

    getBoardSizeFromState(boardSize: BoardState['boardSize']) {
        if (boardSize) {
            this.boardSizeField.patchValue(boardSize[0])
        }
    }
}
