import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userId: string = '';
  userDetails: any;
  editUserForm: FormGroup = new FormGroup({});
  dataLoaded: boolean = false;
  pageLoad : boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.pageLoad= true;

    this.dataLoaded = false;
    this.activatedRoute.params.subscribe((data) => {
      this.userId = data['id'];
    });
    

    if (this.userId) {
      this.userService
        .viewUser(this.userId)
        .toPromise()
        .then((data) => {
          this.userDetails = data;
          console.log(this.userDetails);
          this.editUserForm = this.formBuilder.group({
            username: new FormControl(this.userDetails.name),
            email: new FormControl(this.userDetails.email),
            phone: new FormControl(this.userDetails.phone),
          });
          this.pageLoad= false;
          this.dataLoaded = true;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  updateUser() {
    this.pageLoad= true;
    this.userService.updateUser(this.userId, this.editUserForm.value).subscribe(
      (data) => {
        this.pageLoad= false;
        this._snackBar.open('User Updated Successcully');
      },
      (err) => {
        this.pageLoad= false;
        this._snackBar.open('Unable to Update User');
      }
    );
  }
}
