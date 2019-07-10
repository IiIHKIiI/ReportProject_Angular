import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  MatSort,
  MatTableDataSource,
  MatDialog,
  MatSnackBar,
  MatPaginator
} from '@angular/material';
import { Hopdong } from 'src/app/models/hopdong';
import { HopdongServicesService } from 'src/app/services/hopdong-services.service';
import { AddHopdongDlgComponent } from '../add-hopdong-dlg/add-hopdong-dlg.component';

@Component({
  selector: 'app-list-hopdong',
  templateUrl: './list-hopdong.component.html',
  styleUrls: ['./list-hopdong.component.scss']
})
export class ListHopdongComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  events: string[] = [];
  opened: boolean;

  listHopdong: Hopdong[];
  dataSource = new MatTableDataSource<Hopdong>();

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private hopdongServices: HopdongServicesService
  ) {}

  displayedColumns: string[] = [
    'STT',
    'sohopdong',
    'ngayhopdong',
    'tenkhachhang',
    'dichvuhopdong',
    'nvphattrien',
    'doanhthudukien',
    'ghichu',
    'actions'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getListHopdong();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getListHopdong() {
    this.hopdongServices.getList().subscribe(data => {
      this.dataSource.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Hopdong;
      });
    });

    this.dataSource.paginator = this.paginator;
  }

  openAddUser() {
    const dialogRef = this.dialog.open(AddHopdongDlgComponent, {
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

  deleteDoc(data: Hopdong) {
    try {
      this.hopdongServices.delete(data);
      this.snackBar.open('Xóa thành công!', 'Đóng');
    } catch (error) {
      this.snackBar.open('Lỗi! Vui lòng kiểm tra lại', 'Đóng');
      console.log(error);
    }
  }
}
