import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  MatSort,
  MatTableDataSource,
  MatDialog,
  MatSnackBar,
  MatPaginator
} from '@angular/material';
import { Dichvu } from 'src/app/models/dichvu.model';
import { DichvuServicesService } from 'src/app/services/dichvu-services.service';
import { AddDichvuDlgComponent } from '../add-dichvu-dlg/add-dichvu-dlg.component';

@Component({
  selector: 'app-list-dichvu',
  templateUrl: './list-dichvu.component.html',
  styleUrls: ['./list-dichvu.component.scss']
})
export class ListDichvuComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  events: string[] = [];
  opened: boolean;

  listDichvu: Dichvu[];
  dataSource = new MatTableDataSource<Dichvu>();

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dichvuServices: DichvuServicesService
  ) {}

  displayedColumns: string[] = [
    'STT',
    'madichvu',
    'tendichvu',
    'lock',
    'actions'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getListDichvu();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getListDichvu() {
    this.dichvuServices.getList().subscribe(data => {
      this.dataSource.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Dichvu;
      });
    });

    this.dataSource.paginator = this.paginator;
  }

  openAddDichVu() {
    const dialogRef = this.dialog.open(AddDichvuDlgComponent, {
      width: '500px',
      height: '380px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'canceled') {
      } else if (result) {
        this.snackBar.open('Đã lưu!', 'Đóng');
      } else {
        this.snackBar.open('Lỗi! Vui lòng kiểm tra lại', 'Đóng');
      }
    });
  }

  lock(data: Dichvu) {
    try {
      if (data.lock) {
        data.lock = false;
        this.dichvuServices.lock(data);
        this.snackBar.open('Mở khóa thành công!', 'Đóng');
      } else {
        data.lock = true;
        this.dichvuServices.lock(data);
        this.snackBar.open('Khóa thành công!', 'Đóng');
      }
    } catch (error) {
      this.snackBar.open('Lỗi! Vui lòng kiểm tra lại', 'Đóng');
      console.log(error);
    }
  }

  deleteDoc(data: Dichvu) {
    try {
      this.dichvuServices.delete(data);
      this.snackBar.open('Xóa thành công!', 'Đóng');
    } catch (error) {
      this.snackBar.open('Lỗi! Vui lòng kiểm tra lại', 'Đóng');
      console.log(error);
    }
  }
}
