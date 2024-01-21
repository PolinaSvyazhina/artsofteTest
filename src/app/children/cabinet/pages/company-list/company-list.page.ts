import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable, startWith, Subject, take, takeUntil, tap } from 'rxjs';
import { ICompanyDetailed } from '../../../../interfaces/company-detailed.interface';
import { CompanyManagerService } from '../../services/company-manager.service';
import { IFilterParams } from '../../../../interfaces/filter-params.interface';
import { SortOptionEnum } from '../../../../enum/sort-option.enum';
import { DestroyService } from '../../../../utils/destroy.service';
import { tuiPure } from '@taiga-ui/cdk';

@Component({
    templateUrl: './company-list.page.html',
    styleUrls: [ './styles/company-list.style.scss' ],
    providers: [ DestroyService ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyListPage implements OnInit {

    private _sortType$: Subject<SortOptionEnum | undefined> = new Subject<SortOptionEnum | undefined>();
    private _filter$: Subject<IFilterParams | undefined> = new Subject<IFilterParams | undefined>();
    private _companyList: BehaviorSubject<ICompanyDetailed[]> = new BehaviorSubject<ICompanyDetailed[]>([])

    constructor(
        private _companyManagerService: CompanyManagerService,
        private _destroyService: DestroyService
    ) {
    }

    @tuiPure
    public get companiesOriginInfo(): Observable<ICompanyDetailed[]> {
        return this._companyList
    }

    @tuiPure
    public get companiesInfo(): Observable<ICompanyDetailed[]> {
        return combineLatest([
            this._companyList,
            this._sortType$.pipe(startWith(undefined)),
            this._filter$.pipe(startWith(undefined))
        ])
            .pipe(
                map(([ companies, type, filter ]: [ ICompanyDetailed[], SortOptionEnum | undefined, IFilterParams | undefined ]) => {
                    let renderList: ICompanyDetailed[] = [ ...companies ]

                    if (filter) {
                        renderList = this.filterByQuery(filter, renderList)
                    }

                    return this.sortListByType(renderList, type)
                }),
                takeUntil(this._destroyService)
            )
    }

    public ngOnInit(): void {
        this.getCompany(50)
            .subscribe()
    }

    public sortTypeSelected(type: SortOptionEnum | undefined): void {
        this._sortType$.next(type)
    }

    public filterByQuery(filter: IFilterParams, list: ICompanyDetailed[]): ICompanyDetailed[] {
        let companyList: ICompanyDetailed[] = [ ...list ];

        if (filter.industryQuery) {
            companyList = companyList.filter((company: ICompanyDetailed) =>
                company.industry === filter.industryQuery)
        }

        if (filter.nameQuery && filter.nameQuery !== '') {
            companyList = companyList.filter((company: ICompanyDetailed) =>
                company.business_name.toLowerCase()
                    .includes(filter.nameQuery!.toLowerCase()))
        }

        if (filter.typeQuery) {
            companyList = companyList.filter((company: ICompanyDetailed) =>
                company.type === filter.typeQuery)
        }

        return companyList
    }

    public filterQuerySelected(filter: IFilterParams | undefined): void {
        this._filter$.next(filter)
    }

    public requestUpdate(): void {
        this.getCompany()
            .pipe(
                take(1)
            )
            .subscribe()
    }

    private getCompany(size: number = 30): Observable<void> {
        return this._companyManagerService.getCompanyList(size, this._companyList.value.length)
            .pipe(
                tap((data: ICompanyDetailed[]) => {
                    this._companyList.next([ ...this._companyList.value, ...data ])
                }),
                map(() => void 0),
                takeUntil(this._destroyService)
            );
    }

    private sortListByType(companyList: ICompanyDetailed[], type: SortOptionEnum | undefined): ICompanyDetailed[] {
        if (type === undefined) {
            return companyList
        }

        let key: keyof ICompanyDetailed;

        switch (type) {
            case 'byName':
                key = 'business_name'
                break;
            case 'byType':
                key = 'type'
                break;
            case 'byIndustry':
                key = 'industry'
                break;
        }

        return companyList.sort((a: ICompanyDetailed, b: ICompanyDetailed): number => {
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[key] > b[key]) {
                return 1;
            }
            return 0;
        })
    }

}
