import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MAT_DATE_LOCALE
} from '@angular/material';
import { LoginDialogComponent } from 'src/app/views/login-dialog/login-dialog.component';
import { Donvi } from 'src/app/models/donvi.model';
import { DonviServicesService } from 'src/app/services/donvi-services.service';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { UserServicesService } from 'src/app/services/user-services.service';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-add-user-dlg',
  templateUrl: './add-user-dlg.component.html',
  styleUrls: ['./add-user-dlg.component.scss']
})
export class AddUserDlgComponent implements OnInit {
  ListDonVi: any;
  User: Observable<User>;
  correctDate: string;
  addform: FormGroup;
  constructor(
    private donviServices: DonviServicesService,
    private userServices: UserServicesService,
    public dialogRef: MatDialogRef<AddUserDlgComponent>
  ) {}

  ngOnInit() {
    this.getListDonVi();
    this.setForm();
  }

  setForm() {
    this.addform = new FormGroup({
      id: new FormControl(''),
      manv: new FormControl(''),
      hotennv: new FormControl(''),
      gioitinh: new FormControl(''),
      nsinh: new FormControl(''),
      sdt: new FormControl(''),
      donvi: new FormControl(''),
      email: new FormControl('')
    });
  }

  getListDonVi() {
    this.donviServices.getListDonVi().subscribe(data => {
      this.ListDonVi = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Donvi;
      });
    });
  }

  formatDate_Picker(value: any) {
    const days = moment(value).date();
    const month = moment(value).month();
    const year = moment(value).year();

    this.correctDate = days + '/' + (month + 1) + '/' + year;
    // this.correctDate = year + '-' + (month + 1) + '-' + days;
    return this.correctDate;
  }

  adduser() {
    this.addform.value.nsinh = this.formatDate_Picker(this.addform.value.nsinh);
    try {
      this.userServices.add(this.addform.value);
      this.dialogRef.close('canceled');
    } catch (err) {
      this.dialogRef.close(err);
    }
  }
}
