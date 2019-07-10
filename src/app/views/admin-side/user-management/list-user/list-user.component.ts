import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatSort,
  MatSnackBar
} from '@angular/material';
import { AddUserDlgComponent } from '../add-user-dlg/add-user-dlg.component';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  events: string[] = [];
  opened: boolean;

  listUser: User[];
  dataSource = new MatTableDataSource<User>();

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userServices: UserServicesService
  ) {}

  displayedColumns: string[] = [
    'STT',
    'hoten',
    'gioitinh',
    'nsinh',
    'sdt',
    'email',
    'actions'
  ];
  // tslint:disable-next-line: no-use-before-declare
  // dataSource = new MatTableDataSource<User>(this.listUser);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getListUser();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getListUser() {
    this.userServices.getList().subscribe(data => {
      this.dataSource.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      });
    });

    this.dataSource.paginator = this.paginator;
  }

  openAddUser() {
    const dialogRef = this.dialog.open(AddUserDlgComponent, {
      width: '800px',
      height: '380px',
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

  resetPass(data: User) {
    try {
      this.userServices.resetPass(data);
      this.snackBar.open('Cập nhật mật khẩu thành công!', 'Đóng');
    } catch (error) {
      this.snackBar.open('Lỗi! Vui lòng kiểm tra lại', 'Đóng');
      console.log(error);
    }
  }

  deleteDoc(data: User) {
    try {
      this.userServices.delete(data);
      this.snackBar.open('Xóa thành công!', 'Đóng');
    } catch (error) {
      this.snackBar.open('Lỗi! Vui lòng kiểm tra lại', 'Đóng');
      console.log(error);
    }
  }
}
