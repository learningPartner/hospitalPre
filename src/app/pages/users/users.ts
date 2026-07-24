import { Component, ElementRef, inject, OnInit, signal, Signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user-service';
import { LoginUserModel } from '../../core/models/interfaces/User.Model';
import { FormConstant } from '../../core/constant/Form.Constant';
import { HideForRec } from '../../shared/directives/hide-for-rec';
import { MasterService } from '../../core/services/master-service';
import { CustomTable } from "../../shared/components/custom-table/custom-table";

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule, HideForRec, CustomTable],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  isFormOpen: boolean = false;
  userForm!: FormGroup;
  userSrv = inject(UserService);
  columnData: string[] = ['fullName', 'email', 'mobileNo', 'roleName'];

  @ViewChild('searchTem') searchDropdown!: ElementRef;

  userList: WritableSignal<LoginUserModel[]> = signal<LoginUserModel[]>([]);
  loggedUser: LoginUserModel = this.userSrv.loggedUserData;

  formData = FormConstant.STAFF_FORM_DATA;
  mastesrv = inject(MasterService);

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
    this.mastesrv.omSearchChnages$.subscribe({
      next: (ser: string) => {
        debugger;
      },
    });
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

  onEdit(emeidineData: any) {
    const data = {
      fullName: emeidineData.fullName,
      email: emeidineData.email,
      mobileNo: emeidineData.mobileNo,
      password: emeidineData.password,
      roleName: emeidineData.roleName,
      isActive: emeidineData.isActive,
    };
    debugger;
    this.userForm.setValue(data);
    if(!this.isFormOpen) {
       this.toggleFormVisibility();
    }
   
  }

  onStaffDelete(item:any) {
    
  }

  toggleFormVisibility() {
    this.isFormOpen = !this.isFormOpen;
  }

  onSearch() {
    debugger;
    const selectRole = this.searchDropdown.nativeElement.value;
    this.userSrv.filterUsers(selectRole).subscribe({
      next: (res: LoginUserModel[]) => {
        this.userList.set(res);
      },
    });
  }

  onReset() {
    this.searchDropdown.nativeElement.value = '';
    this.getAllUsers();
  }

  getAllUsers() {
    this.userSrv.getAllUsers().subscribe({
      next: (res: LoginUserModel[]) => {
        this.userList.set(res);
      },
    });
  }

  onSaveUser() {
    const formValue = this.userForm.value;
    this.userSrv.createUser(formValue).subscribe({
      next: (resposne: LoginUserModel) => {
        alert('User Create Succes');
        this.getAllUsers();
      },
    });
  }
}
