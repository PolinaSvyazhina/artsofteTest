import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ICompanyDetailed } from '../../../../interfaces/company-detailed.interface';
import { FormControl } from '@angular/forms';
import { combineLatest, startWith, takeUntil, tap } from 'rxjs';
import { IFilterParams } from '../../../../interfaces/filter-params.interface';
import { DestroyService } from '../../../../utils/destroy.service';

@Component({
    selector: 'company-filter',
    templateUrl: './company-filter.component.html',
    providers: [ DestroyService ],
    styleUrls: [ './styles/company-filter.style.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyFilterComponent implements OnChanges, OnInit {

    @Input()
    public companyList!: ICompanyDetailed[];
    @Output()
    public typeFilter: EventEmitter<IFilterParams | undefined> = new EventEmitter<IFilterParams | undefined>();

    public companyTypeList: Set<string> = new Set<string>();
    public industryTypeList: Set<string> = new Set<string>();
    public filterInputByName: FormControl = new FormControl('');
    public filterSelectByType: FormControl = new FormControl(undefined);
    public filterSelectByIndustry: FormControl = new FormControl(undefined);

    constructor(
        private _destroyService: DestroyService
    ) {
    }

    public ngOnChanges(): void {
        this.companyTypeList = new Set<string>(this.getType('type'))
        this.industryTypeList = new Set<string>(this.getType('industry'))
    }

    public ngOnInit(): void {
        combineLatest([
            this.filterInputByName.valueChanges.pipe(startWith(undefined)),
            this.filterSelectByIndustry.valueChanges.pipe(startWith(undefined)),
            this.filterSelectByType.valueChanges.pipe(startWith(undefined))
        ])
            .pipe(
                tap(([ nameQuery, industryQuery, typeQuery ]) => {
                    this.typeFilter.emit(
                        {
                            nameQuery: nameQuery,
                            typeQuery: typeQuery,
                            industryQuery: industryQuery
                        }
                    )
                }),
                takeUntil(this._destroyService)
            )
            .subscribe()
    }

    private getType(key: keyof ICompanyDetailed): string[] {
        return this.companyList.map((company: ICompanyDetailed) => {
            return company[key] as string
        })
    }
}
