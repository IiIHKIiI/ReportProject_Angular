import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';
import { UserLayoutRoutes } from './user-layout.routing';
import { SharedModule } from 'src/app/shared.module';
import { ListHopdongComponent } from '../hopdong-management/list-hopdong/list-hopdong.component';
import { AddHopdongDlgComponent } from '../hopdong-management/add-hopdong-dlg/add-hopdong-dlg.component';
import { ListPharmacyComponent } from '../dichvu/vnpt-pharmacy-management/list-pharmacy/list-pharmacy.component';
import { AddPharmacyDlgComponent } from '../dichvu/vnpt-pharmacy-management/add-pharmacy-dlg/add-pharmacy-dlg.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule
  ],
  declarations: [
    ListHopdongComponent,
    AddHopdongDlgComponent,
    ListPharmacyComponent,
    AddPharmacyDlgComponent
  ],
  entryComponents: [AddHopdongDlgComponent, AddPharmacyDlgComponent]
})
export class UserLayoutModule {}
