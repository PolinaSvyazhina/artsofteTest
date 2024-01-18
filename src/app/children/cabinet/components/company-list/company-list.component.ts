import {ChangeDetectionStrategy, Component} from "@angular/core";
import {memoize} from "@angular/cli/src/utilities/memoize";
import {map, Observable, take} from "rxjs";
import {ICompanyDetailed} from "../../../../interfaces/company-detailed.interface";
import {CompanyManagerService} from "../../services/company-manager.service";

@Component({
  selector: 'test-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyListComponent {

  @memoize
  public get companiesInfo(): Observable<ICompanyDetailed[]>{
    return this._companyManagerService.companyList$
      .pipe(
        map((companies:ICompanyDetailed[]) => {
          return companies
        }),
        take(1)
      )
  }


  constructor(
    private _companyManagerService: CompanyManagerService
  ) {
  }
}
