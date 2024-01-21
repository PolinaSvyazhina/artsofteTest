import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';
import { SortOptionEnum } from '../../../../enum/sort-option.enum';
import { DestroyService } from '../../../../utils/destroy.service';

@Component({
    selector: 'company-sort',
    templateUrl: './company-sort.component.html',
    styleUrls: [ './styles/company-sort.style.scss' ],
    providers: [ DestroyService ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanySortComponent implements OnInit {
    @Output()
    public sortType: EventEmitter<SortOptionEnum | undefined> = new EventEmitter<SortOptionEnum | undefined>()

    public sortOptionSelect: FormControl = new FormControl(undefined)
    public sortOptionEnum: typeof SortOptionEnum = SortOptionEnum

    constructor(
        private _destroyService: DestroyService
    ) {
    }

    public ngOnInit(): void {
        this.sortOptionSelect.valueChanges
            .pipe(
                tap((value: SortOptionEnum | undefined) => {
                    this.sortType.emit(value)
                }),
                takeUntil(this._destroyService)
            )
            .subscribe()
    }
}
