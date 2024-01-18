import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICompanyDetailedInterfaceResponseModel} from "../../../interfaces/company-detailed-interface-response.model";
import {ICompanyDetailed} from "../../../interfaces/company-detailed.interface";

@Injectable(

)

export class CompanyDataService {
  constructor(
    private _httpClient: HttpClient
  ) {
  }

  public getCompaniesInfo(size: number): Observable<ICompanyDetailed[]> {
    const params: HttpParams = new HttpParams().set('size', size)
    return this._httpClient.get<ICompanyDetailedInterfaceResponseModel[]>
      ("https://random-data-api.com/api/company/random_company", {params: params})
  }
}
