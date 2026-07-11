export class LoginModel {
  projectName: string;
  email: string;
  password: string;

  constructor() {
    this.projectName = '';
    this.email = '';
    this.password = '';
  }
}

export class UserModel {
  fullName: string;
  email: string;
  mobileNo: string;
  password: string;
  roleName: string;
  isActive: boolean;

  constructor() {
    this.fullName = '';
    this.email = '';
    this.mobileNo = '';
    this.password = '';
    this.roleName = '';
    this.isActive = false;
  }
}
