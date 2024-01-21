import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { BehaviorSubject, filter, Observable, of, take, takeUntil, tap } from "rxjs";
import { ICompanyDetailed } from "../../../../interfaces/company-detailed.interface";
import { CompanyManagerService } from "../../services/company-manager.service";
import { DestroyService } from '../../../../utils/destroy.service';
import { tuiPure } from '@taiga-ui/cdk';

@Component({
    templateUrl: './company-detail.page.html',
    styleUrls: [ './styles/company-detail.style.scss' ],
    providers: [ DestroyService ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyDetailPage implements OnInit {
    private companyModel$: BehaviorSubject<ICompanyDetailed | null> = new BehaviorSubject<ICompanyDetailed | null>(null);

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _companyManagerServices: CompanyManagerService,
        private _destroyService: DestroyService
    ) {
        this._activatedRoute.paramMap
            .pipe(
                tap((param: ParamMap) => {
                    this.companyId = Number(param.get('id'))
                }),
                take(1)
            ).subscribe()
    }

    @tuiPure
    public get companyModel(): Observable<ICompanyDetailed | null> {
        return this.companyModel$.asObservable()
    }

    private _companyId!: number;

    private get companyId(): number {
        return this._companyId
    }

    private set companyId(id: number) {
        this._companyId = id
    }

    public ngOnInit(): void {
        of(this._companyManagerServices.getCompanyById(this.companyId))
            .pipe(
                tap((company: ICompanyDetailed | null) => {
                    if (company === null) {
                        this._router.navigate([ '/cabinet/list' ])
                    }
                }),
                filter((company: ICompanyDetailed | null): company is ICompanyDetailed => !!company),
                tap((company: ICompanyDetailed) => {
                    this.companyModel$.next(company)
                }),
                takeUntil(this._destroyService)
            ).subscribe()
    }
}
