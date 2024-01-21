import { Injectable } from "@angular/core";
import { CompanyDataService } from "./company-data.service";
import { BehaviorSubject, map, Observable, of, switchMap, take, tap } from "rxjs";
import { ICompanyDetailed } from "../../../interfaces/company-detailed.interface";

@Injectable()

export class CompanyManagerService {

    private _companyList$: BehaviorSubject<ICompanyDetailed[]> = new BehaviorSubject<ICompanyDetailed[]>([])

    constructor(
        private _companyDataService: CompanyDataService
    ) {
    }

    public getCompanyById(id: number): ICompanyDetailed | null {
        const companyList: ICompanyDetailed[] = this._companyList$.value;

        return companyList.find((company: ICompanyDetailed) => {
            return company.id === id
        }) ?? null
    }

    public getCompanyList(count: number, skip: number): Observable<ICompanyDetailed[]> {
        return this._companyList$
            .pipe(
                switchMap((company: ICompanyDetailed[]) => {
                    if (company.length >= count + skip) {
                        return of(company)
                    }
                    return this.updateCompanyList()
                }),
                map((company: ICompanyDetailed[]) => {
                    return company.slice(skip, skip + count)
                })
            )
    }

    private updateCompanyList(): Observable<ICompanyDetailed[]> {
        return this._companyDataService.getCompaniesInfo(100)
            .pipe(
                tap((data: ICompanyDetailed[]) => {
                    this._companyList$.next([ ...this._companyList$.value, ...data ])
                }),
                map(() => this._companyList$.value),
                take(1)
            )
    }
}
