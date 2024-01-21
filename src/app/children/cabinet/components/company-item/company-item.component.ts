import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ICompanyDetailed } from "../../../../interfaces/company-detailed.interface";

@Component({
    selector: 'company-item',
    templateUrl: './company-item.component.html',
    styleUrls: [ './styles/company-item.style.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyItemComponent {
    @Input()
    public company!: ICompanyDetailed
    @Input()
    public viewMode: 'full' | 'flat' = 'full'
}
