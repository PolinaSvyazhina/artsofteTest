import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./layout/layout-component";
import {CompanyListPage} from "./pages/company-list/company-list.page";
import {CompanyDetailPage} from "./pages/company-detail/company-detail.page";
import {CompanyYandexMap} from "./pages/company-yandex-map/company-yandex-map";
import {CompanyDataService} from "./services/company-data.service";
import {CompanyItemComponent} from "./components/company-item/company-item.component";
import {CompanyListComponent} from "./components/company-list/company-list.component";
import {CommonModule} from "@angular/common";
import {CompanyManagerService} from "./services/company-manager.service";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'list',
        component: CompanyListPage
      },
      {
        path: 'detail/:id',
        component: CompanyDetailPage
      },
      {
        path: 'map',
        component: CompanyYandexMap
      },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  declarations: [
    LayoutComponent,
    CompanyListPage,
    CompanyDetailPage,
    CompanyYandexMap,
    CompanyItemComponent,
    CompanyListComponent

  ],
  providers: [
    CompanyDataService,
    CompanyManagerService
  ],
})

export class CabinetModule {

}
