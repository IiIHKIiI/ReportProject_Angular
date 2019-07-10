import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MatModule } from 'src/app/mat.module';
import { ListUserComponent } from '../user-management/list-user/list-user.component';
import { LoginDialogComponent } from '../../login-dialog/login-dialog.component';
import { AddUserDlgComponent } from '../user-management/add-user-dlg/add-user-dlg.component';
import { ListDichvuComponent } from '../dicvu-management/list-dichvu/list-dichvu.component';
import { AddDichvuDlgComponent } from '../dicvu-management/add-dichvu-dlg/add-dichvu-dlg.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule
  ],
  declarations: [
    ListUserComponent,
    AddUserDlgComponent,
    ListDichvuComponent,
    AddDichvuDlgComponent
  ],
  exports: [LoginDialogComponent],
  entryComponents: [AddUserDlgComponent, AddDichvuDlgComponent]
})
export class AdminLayoutModule {}
