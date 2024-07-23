import { Component, input } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
    selector: 'app-info-box',
    standalone: true,
    imports: [NgClass],
    templateUrl: './info-box.component.html',
    styleUrl: './info-box.component.scss',
})
export class InfoBoxComponent {
    severity = input.required<
        'success' | 'info' | 'warning' | 'error' | 'danger'
    >()
    message = input.required<string>()
}
