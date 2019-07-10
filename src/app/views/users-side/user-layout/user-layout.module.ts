import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';
import { UserLayoutRoutes } from './user-layout.routing';
import { LoginDialogComponent } from '../../login-dialog/login-dialog.component';
import { SharedModule } from 'src/app/shared.module';
import { ListHopdongComponent } from '../hopdong-management/list-hopdong/list-hopdong.component';
import { AddHopdongDlgComponent } from '../hopdong-management/add-hopdong-dlg/add-hopdong-dlg.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule
  ],
  declarations: [ListHopdongComponent, AddHopdongDlgComponent],
  entryComponents: [AddHopdongDlgComponent]
})
export class UserLayoutModule {}
