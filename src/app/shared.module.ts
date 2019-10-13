import { NgModule } from '@angular/core';
import { LoginDialogComponent } from './views/login-dialog/login-dialog.component';
import { MatModule } from './mat.module';
import { ConfirmDialogComponent } from './views/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [MatModule],
  declarations: [LoginDialogComponent, ConfirmDialogComponent],
  exports: [LoginDialogComponent, ConfirmDialogComponent]
})
export class SharedModule {}
