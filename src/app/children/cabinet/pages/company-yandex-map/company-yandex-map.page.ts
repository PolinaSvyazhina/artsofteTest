import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CompanyManagerService } from '../../services/company-manager.service';
import { BehaviorSubject, map, Observable, take, takeUntil, tap } from 'rxjs';
import { ICompanyDetailed } from '../../../../interfaces/company-detailed.interface';
import { DestroyService } from '../../../../utils/destroy.service';
import { tuiPure } from '@taiga-ui/cdk';

@Component({
    templateUrl: './company-yandex-map.page.html',
    styleUrls: [ './styles/company-yandex-map.style.scss' ],
    providers: [ DestroyService ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyYandexMapPage implements OnInit {
    constructor(
        private _companyManagerService: CompanyManagerService,
        private _destroyService: DestroyService
    ) {
    }

    private _currentCompanyLocation: BehaviorSubject<[ number, number ]> = new BehaviorSubject<[ number, number ]>([ 0, 0 ])

    @tuiPure
    public get currentCompanyLocation(): Observable<[ number, number ]> {
        return this._currentCompanyLocation.asObservable()
    }

    private _companyList: BehaviorSubject<ICompanyDetailed[]> = new BehaviorSubject<ICompanyDetailed[]>([])

    @tuiPure
    public get companyList(): Observable<ICompanyDetailed[]> {
        return this._companyList.asObservable()
    }

    public openBalloon(company: ICompanyDetailed): void {
        this._currentCompanyLocation.next([ company.latitude, company.longitude ])
    }

    public getMapProperties(properties: ICompanyDetailed): ymaps.IPlacemarkProperties {
        return {
            balloonContent: JSON.stringify(properties)
        }
    }

    public ngOnInit(): void {
        this.getCompany(100)
            .subscribe()
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
}
