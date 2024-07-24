import { Component, inject, input, output } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms'
import { NgClass } from '@angular/common'

@Component({
    selector: 'app-board-selection-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgClass],
    templateUrl: './board-selection-form.component.html',
    styleUrl: './board-selection-form.component.scss',
})
export class BoardSelectionFormComponent {
    tableSizes = [2, 3, 4, 5, 6, 7, 8, 9, 10]

    //Getters
    get boardSize(): number {
        return this.boardSizeForm.get('boardSize')?.value
    }

    //Injects
    fb = inject(FormBuilder)

    //Form
    boardSizeForm!: FormGroup

    //Inputs
    canChangeGame = input.required<boolean>()
    canCreateGame = input.required<boolean>()

    //Outputs
    startGame = output<number>()
    changeBoardSize = output<number>()

    ngOnInit() {
        this.initForm()
    }

    onChangeBoardSize(event: number): void {
        this.changeBoardSize.emit(event)
    }

    onStartGame() {
        this.startGame.emit(this.boardSize)
    }

    initForm() {
        this.boardSizeForm = this.fb.group({
            boardSize: [3],
        })
    }
}
