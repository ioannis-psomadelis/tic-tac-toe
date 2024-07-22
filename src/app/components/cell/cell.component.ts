import { Component, input, output } from '@angular/core'

@Component({
    selector: 'app-cell',
    standalone: true,
    imports: [],
    templateUrl: './cell.component.html',
    styleUrl: './cell.component.scss',
})
export class CellComponent {
    value = input<number>()
    clicked = output<void>()
    // @Output() click = new EventEmitter<void>();

    onClick() {
        this.clicked.emit()
    }
}
