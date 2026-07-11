import { Component, ElementRef, inject, OnInit, signal, Signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user-service';
import { LoginUserModel } from '../../core/models/interfaces/User.Model';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {

  isFormOpen: boolean = false;
  userForm!: FormGroup;
  userSrv = inject(UserService);

  @ViewChild('searchTem') searchDropdown!: ElementRef;

  userList: WritableSignal<LoginUserModel[]> = signal<LoginUserModel[]>([])
  loggedUser: LoginUserModel =  this.userSrv.loggedUserData;

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm(); 
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      fullName: [''],
      email: [''],
      mobileNo: [''],
      password: [''],
      roleName: [''],
      isActive: [false],
    });
  }
  toggleFormVisibility() {
    this.isFormOpen = !this.isFormOpen;
  }

  onSearch() {
    debugger;
    const selectRole =  this.searchDropdown.nativeElement.value;
    this.userSrv.filterUsers(selectRole).subscribe({
      next:(res:LoginUserModel[])=>{
        this.userList.set(res)
      }
    })
  }

  onReset() {
    this.searchDropdown.nativeElement.value = '';
    this.getAllUsers()
  }
  

  getAllUsers() {
    this.userSrv.getAllUsers().subscribe({
      next:(res:LoginUserModel[])=>{
        this.userList.set(res)
      }
    })
  }

  onSaveUser() {
    const formValue  = this.userForm.value;
    this.userSrv.createUser(formValue).subscribe({
      next:(resposne: LoginUserModel) =>{
        alert("User Create Succes")
        this.getAllUsers();
      }
    })
  }
}
