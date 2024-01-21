import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from "@angular/core";
import { ICompanyDetailed } from "../../../../interfaces/company-detailed.interface";
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'company-list',
    templateUrl: './company-list.component.html',
    styleUrls: [ './styles/company-list.style.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyListComponent implements OnChanges {
    @Input()
    public companyList!: ICompanyDetailed[]
    @Input()
    public viewMode: 'full' | 'flat' = 'full'
    @Output()
    public companySelected: EventEmitter<ICompanyDetailed> = new EventEmitter<ICompanyDetailed>()
    @Output()
    public isUpdateList: EventEmitter<void> = new EventEmitter<void>()

    private _isUpdating: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['companyList']) {
            this._isUpdating.next(false)
        }
    }

    public getIndex(idx: number): void {
        if (this.companyList.length - idx <= 15 && !this._isUpdating.value) {
            this.isUpdateList.emit(void 0)
            this._isUpdating.next(true)
        }
    }

    public chooseCompany(company: ICompanyDetailed): void {
        this.companySelected.emit(company)
    }
}
