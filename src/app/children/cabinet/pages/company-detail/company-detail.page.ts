import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {BehaviorSubject, filter, map, of, switchMap, take, tap} from "rxjs";
import {ICompanyDetailed} from "../../../../interfaces/company-detailed.interface";
import {CompanyManagerService} from "../../services/company-manager.service";

@Component({
  templateUrl: './company-detail.page.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyDetailPage implements OnInit {

  private set companyId(id: number) {
    this._companyId = id
  }

  private get companyId(): number {
    return this._companyId
  }

  private _companyId!: number;

  private companyModel$: BehaviorSubject<ICompanyDetailed | null> = new BehaviorSubject<ICompanyDetailed | null>(null);

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _companyManagerServices: CompanyManagerService
  ) {
    this._activatedRoute.paramMap
      .pipe(
        tap((param: ParamMap) => {
          this.companyId = Number(param.get('id'))
        }),
        take(1)
      ).subscribe()
  }

  public ngOnInit() {
    this._companyManagerServices.companyList$
      .pipe(
        map(() => {
          return this._companyManagerServices.getCompanyById(this.companyId)
        }),
        filter((company: ICompanyDetailed | null): company is ICompanyDetailed => !!company),
        tap((company: ICompanyDetailed) => {
          this.companyModel$.next(company)
        })
      ).subscribe()
  }
}
