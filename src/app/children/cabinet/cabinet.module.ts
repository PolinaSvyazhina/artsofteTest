import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout-component";
import { CompanyListPage } from "./pages/company-list/company-list.page";
import { CompanyDetailPage } from "./pages/company-detail/company-detail.page";
import { CompanyYandexMapPage } from "./pages/company-yandex-map/company-yandex-map.page";
import { CompanyDataService } from "./services/company-data.service";
import { CompanyItemComponent } from "./components/company-item/company-item.component";
import { CompanyListComponent } from "./components/company-list/company-list.component";
import { CommonModule } from "@angular/common";
import { CompanyManagerService } from "./services/company-manager.service";
import { CompanySortComponent } from './components/company-sort/company-sort.component';
import { CompanyFilterComponent } from './components/company-filter/company-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

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
                component: CompanyYandexMapPage
            },
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        ScrollingModule,
        AngularYandexMapsModule,
    ],
    declarations: [
        LayoutComponent,
        CompanyListPage,
        CompanyDetailPage,
        CompanyYandexMapPage,
        CompanyItemComponent,
        CompanyListComponent,
        CompanySortComponent,
        CompanyFilterComponent,
    ],
    providers: [
        CompanyDataService,
        CompanyManagerService,
    ],
})

export class CabinetModule {

}
