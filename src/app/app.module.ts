import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './mat.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { WelcomPageComponent } from './views/welcom-page/welcom-page.component';
import { LoginDialogComponent } from './views/login-dialog/login-dialog.component';
import { AdminLayoutComponent } from './views/admin-side/admin-layout/admin-layout.component';
import { AdminLayoutModule } from './views/admin-side/admin-layout/admin-layout.module';
import {
  MAT_LABEL_GLOBAL_OPTIONS,
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS
} from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { UserLayoutModule } from './views/users-side/user-layout/user-layout.module';
import { UserLayoutComponent } from './views/users-side/user-layout/user-layout.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    WelcomPageComponent,
    AdminLayoutComponent,
    UserLayoutComponent
    // LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatModule,
    ReactiveFormsModule,
    FormsModule,
    AdminLayoutModule,
    UserLayoutModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

    AppRoutingModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
