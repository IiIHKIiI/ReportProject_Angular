import { Routes } from '@angular/router';
import { ListUserComponent } from '../user-management/list-user/list-user.component';
import { ListDichvuComponent } from '../dicvu-management/list-dichvu/list-dichvu.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: 'nguoi-dung',
    component: ListUserComponent
  },
  {
    path: 'dich-vu',
    component: ListDichvuComponent
  }
];
