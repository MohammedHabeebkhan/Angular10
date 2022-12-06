import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  pageLoad : boolean = false;
  addUserForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.pageLoad = true;
    this.addUserForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required,Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    })
     this.pageLoad= false;
  }

  createUser() {
    this.pageLoad = true;
    if (this.addUserForm.valid) {
      this.userService.addUser(this.addUserForm.value).subscribe(
        (data) => {
          this._snackBar.open('User Created successfully');
          this.pageLoad = false;
        },
        (err) => {
          this._snackBar.open('Unable to Create User');
          this.pageLoad = false;
        }
      );
    } else {
      this._snackBar.open('Please fill the details');
      this.pageLoad = false;
    }
  }
}
