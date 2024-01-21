import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    templateUrl: './layout-component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [ './styles/layout-component.style.scss' ]
})

export class LayoutComponent {
}
