import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MatSelectModule } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatSelectModule, ButtonModule, InputTextModule, DropdownModule],
    exports: [MatButtonModule, MatSelectModule, ButtonModule, InputTextModule, DropdownModule]
})
/**@ignore */
export class TableStylingModule {}
