import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: 'cabinet',
        loadChildren: () => import('./children/cabinet/cabinet.module').then((m) => m.CabinetModule)
    },
    {
        path: '',
        redirectTo: 'cabinet',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}
