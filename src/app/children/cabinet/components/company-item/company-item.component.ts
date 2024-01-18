import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {ICompanyDetailed} from "../../../../interfaces/company-detailed.interface";

@Component({
  selector: 'company-item',
  templateUrl: './company-item.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyItemComponent {
  @Input()
  public company!: ICompanyDetailed

  constructor() {
  }
}
