import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Hopdong } from 'src/app/models/hopdong';
import { HopdongServicesService } from 'src/app/services/hopdong-services.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { UserServicesService } from 'src/app/services/user-services.service';
import { User } from 'src/app/models/user.model';
import { DichvuServicesService } from 'src/app/services/dichvu-services.service';
import { Dichvu } from 'src/app/models/dichvu.model';
const moment = _moment;

@Component({
  selector: 'app-add-hopdong-dlg',
  templateUrl: './add-hopdong-dlg.component.html',
  styleUrls: ['./add-hopdong-dlg.component.scss']
})
export class AddHopdongDlgComponent implements OnInit {
  listAM: any;
  listDichvu: any;
  correctDate: string;
  addform: FormGroup;

  listHopdong: any;
  nextSohopdong: any;

  constructor(
    private hopdongServices: HopdongServicesService,
    private userServices: UserServicesService,
    private dichvuServices: DichvuServicesService,
    public dialogRef: MatDialogRef<AddHopdongDlgComponent>
  ) {}

  ngOnInit() {
    this.setForm();
    this.getListAM();
    this.getListDichvu();
    // this.getListHopdong();
  }

  setForm() {
    this.addform = new FormGroup({
      id: new FormControl(''),
      ngayhopdong: new FormControl(''),
      sohopdong: new FormControl(''),
      tieudekhung: new FormControl(''),
      tenkhachhang: new FormControl(''),
      dichvuhopdong: new FormControl(''),
      doanhthudukien: new FormControl(''),
      nvphattrien: new FormControl(''),
      ghichu: new FormControl('')
    });
  }

  getListAM() {
    this.userServices.getList().subscribe(data => {
      this.listAM = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      });
    });
  }

  getListDichvu() {
    this.dichvuServices.getList().subscribe(data => {
      this.listDichvu = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Dichvu;
      });
    });
  }

  getListHopdong() {
    this.hopdongServices.getList().subscribe(data => {
      this.listHopdong = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Hopdong;
      });
    });

    // if (this.listHopdong.length > 0) {
    //   console.log('ok');
    // } else {
    //   console.log('not ok');
    // }
  }

  formatDate_Picker(value: any) {
    const days = moment(value).date();
    const month = moment(value).month();
    const year = moment(value).year();

    this.correctDate = days + '/' + (month + 1) + '/' + year;
    // this.correctDate = year + '-' + (month + 1) + '-' + days;
    return this.correctDate;
  }

  adddlg() {
    this.addform.value.ngayhopdong = this.formatDate_Picker(
      this.addform.value.ngayhopdong
    );

    try {
      this.hopdongServices.add(this.addform.value);
      this.dialogRef.close('canceled');
    } catch (err) {
      this.dialogRef.close(err);
    }
  }
}
