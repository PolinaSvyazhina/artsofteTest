import {Injectable} from "@angular/core";
import {CompanyDataService} from "./company-data.service";
import {BehaviorSubject, find, map, Observable, take, tap} from "rxjs";
import {ICompanyDetailed} from "../../../interfaces/company-detailed.interface";

@Injectable()

export class CompanyManagerService {

  constructor(
    private _companyDataService: CompanyDataService
  ) {
    this.getCompanyList()
  }

  private _companyList$: BehaviorSubject<ICompanyDetailed[]> = new BehaviorSubject<ICompanyDetailed[]>([])

  private getCompanyList(): void {
    this._companyDataService.getCompaniesInfo(100)
      .pipe(
        tap((data: ICompanyDetailed[]) => {
          this._companyList$.next(data)
        }),
        take(1)
      ).subscribe()
  }

  public get companyList$(): Observable<ICompanyDetailed[]> {
    return this._companyList$.asObservable()
  }

  public getCompanyById(id: number): ICompanyDetailed | null {
    const companyList: ICompanyDetailed[] = this._companyList$.value;

    return companyList.find((company: ICompanyDetailed) => {
      return company.id === id
    }) ?? null
  }
}
