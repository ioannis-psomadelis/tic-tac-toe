import { Component, input } from '@angular/core'

@Component({
    selector: 'app-info-box',
    standalone: true,
    imports: [],
    templateUrl: './info-box.component.html',
    styleUrl: './info-box.component.scss',
})
export class InfoBoxComponent {
    message = input.required<string>()
}
