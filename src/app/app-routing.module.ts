import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { WelcomPageComponent } from './views/welcom-page/welcom-page.component';
import { AdminLayoutComponent } from './views/admin-side/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './views/users-side/user-layout/user-layout.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomPageComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:
          './views/admin-side/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:
          './views/users-side/user-layout/user-layout.module#UserLayoutModule'
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
