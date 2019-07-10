import { NgModule } from '@angular/core';
import { LoginDialogComponent } from './views/login-dialog/login-dialog.component';
import { MatModule } from './mat.module';

@NgModule({
  imports: [MatModule],
  declarations: [LoginDialogComponent],
  exports: [LoginDialogComponent]
})
export class SharedModule {}
