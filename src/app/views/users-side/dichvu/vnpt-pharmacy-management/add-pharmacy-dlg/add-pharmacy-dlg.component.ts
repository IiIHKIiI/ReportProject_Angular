import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PharmacyServicesService } from 'src/app/services/pharmacy-services.service';
import { MatDialogRef } from '@angular/material';
import { Donvi } from 'src/app/models/donvi.model';

@Component({
  selector: 'app-add-pharmacy-dlg',
  templateUrl: './add-pharmacy-dlg.component.html',
  styleUrls: ['./add-pharmacy-dlg.component.scss']
})
export class AddPharmacyDlgComponent implements OnInit {
  addform: FormGroup;
  listPharmacy: any;
  listDonvi: Donvi[] = [
    { id: '1', tendonvi: 'An Phú' },
    { id: '2', tendonvi: 'Châu Đốc' },
    { id: '3', tendonvi: 'Châu Phú' },
    { id: '4', tendonvi: 'Chợ Mới' },
    { id: '5', tendonvi: 'Châu Thành' },
    { id: '6', tendonvi: 'Long Xuyên' },
    { id: '7', tendonvi: 'Phú Tân' },
    { id: '8', tendonvi: 'Tân Châu' },
    { id: '9', tendonvi: 'Thoại Sơn' },
    { id: '10', tendonvi: 'Tịnh Biên' },
    { id: '11', tendonvi: 'Tri Tôn' },
    { id: '12', tendonvi: 'TCDN' }
  ];
  listLoai: any;
  constructor(
    private pharmacyServices: PharmacyServicesService,
    public dialogRef: MatDialogRef<AddPharmacyDlgComponent>
  ) {}

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.addform = new FormGroup({
      id: new FormControl(''),
      donvi: new FormControl(''),
      tenntqt: new FormControl(''),
      loai: new FormControl(''),
      taikhoanphar: new FormControl(''),
      taikhoanlienthong: new FormControl(''),
      trangthai: new FormControl(''),
      maqg: new FormControl(''),
      gpdkkd: new FormControl(''),
      ghichu: new FormControl('')
    });
  }

  adddlg() {
    console.log(this.addform.value);

    try {
      this.pharmacyServices.add(this.addform.value);
      this.dialogRef.close('canceled');
    } catch (err) {
      this.dialogRef.close(err);
    }
  }
}
