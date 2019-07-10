import { Component, OnInit } from '@angular/core';
import { AddUserDlgComponent } from '../../user-management/add-user-dlg/add-user-dlg.component';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { DichvuServicesService } from 'src/app/services/dichvu-services.service';

@Component({
  selector: 'app-add-dichvu-dlg',
  templateUrl: './add-dichvu-dlg.component.html',
  styleUrls: ['./add-dichvu-dlg.component.scss']
})
export class AddDichvuDlgComponent implements OnInit {
  addform: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddUserDlgComponent>,
    private dichvuServices: DichvuServicesService
  ) {}

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.addform = new FormGroup({
      madichvu: new FormControl(''),
      tendichvu: new FormControl(''),
      kyhieuhd: new FormControl(''),
      lock: new FormControl('true')
    });
  }

  add() {
    try {
      this.dichvuServices.add(this.addform.value);
      this.dialogRef.close('canceled');
    } catch (err) {
      this.dialogRef.close(err);
    }
    console.log(this.addform.value);
  }
}
