import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'actions'];
  dataSource = ELEMENT_DATA;


  pageLoad : boolean = false;
  listUsers: User[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.pageLoad = true;
    this.userService.listUsers().subscribe((data) => {
      this.listUsers = data;
      this.pageLoad = false;
    });
   
  }
}
