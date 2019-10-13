import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Pharmacy } from 'src/app/models/pharmacy';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatSnackBar
} from '@angular/material';
import { PharmacyServicesService } from 'src/app/services/pharmacy-services.service';
import { ExcelServicesService } from 'src/app/services/save-file-excel.service';
import { AddPharmacyDlgComponent } from '../add-pharmacy-dlg/add-pharmacy-dlg.component';
import { ConfirmDialogComponent } from 'src/app/views/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-pharmacy',
  templateUrl: './list-pharmacy.component.html',
  styleUrls: ['./list-pharmacy.component.scss']
})
export class ListPharmacyComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listPharmacy: Pharmacy[];
  dataSource = new MatTableDataSource<Pharmacy>();

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private pharmacyServices: PharmacyServicesService,
    private saveAs: ExcelServicesService
  ) {}

  displayedColumns: string[] = [
    'STT',
    'donvi',
    'tenntqt',
    'loai',
    'taikhoanphar',
    'taikhoanlienthong',
    'trangthai',
    'ghichu',
    'actions'
  ];

  ngOnInit() {
    this.getListPharmacy();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListPharmacy() {
    this.pharmacyServices.getList().subscribe(data => {
      this.dataSource.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Pharmacy;
      });
    });
    this.dataSource.paginator = this.paginator;
  }

  saveAsExcel() {
    const dataJson = JSON.parse(JSON.stringify(this.dataSource.data));
    console.log(dataJson);

    this.saveAs.exportAsExcelFile(dataJson, 'danhsachpharmacy');
  }

  openAddUser() {
    const dialogRef = this.dialog.open(AddPharmacyDlgComponent, {
      width: '800px',
      height: '420px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'canceled') {
      } else if (result) {
        this.snackBar.open('Đã lưu!', 'Đóng');
      } else {
        this.snackBar.open('Lỗi! Vui lòng kiểm tra lại', 'Đóng');
        console.log(result);
      }
    });
  }

  deleteDoc(data: Pharmacy) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'canceled') {
      } else if (result) {
        try {
          this.pharmacyServices.delete(data);
          this.snackBar.open('Xóa thành công!', 'Đóng');
        } catch (error) {
          this.snackBar.open('Lỗi! Vui lòng kiểm tra lại', 'Đóng');
          console.log(error);
        }
      } else {
        this.snackBar.open('Lỗi! Vui lòng kiểm tra lại', 'Đóng');
        console.log(result);
      }
    });
  }
}
