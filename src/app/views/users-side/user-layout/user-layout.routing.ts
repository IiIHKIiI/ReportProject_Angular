import { Routes } from '@angular/router';
import { ListHopdongComponent } from '../hopdong-management/list-hopdong/list-hopdong.component';
import { ListPharmacyComponent } from '../dichvu/vnpt-pharmacy-management/list-pharmacy/list-pharmacy.component';

export const UserLayoutRoutes: Routes = [
  {
    path: 'hop-dong',
    component: ListHopdongComponent
  },
  {
    path: 'dich-vu/pharmacy',
    component: ListPharmacyComponent
  }
];
