import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs'; 
import { GlobalConstant } from '../constant/GlobalConstant';
import { LoginUserModel } from '../models/interfaces/User.Model';
import { UserModel } from '../models/classes/User.Model';

@Service()
export class UserService {
  
  http = inject(HttpClient);
  
  loggedUserData!: LoginUserModel;

  //behaviopur Subject

  constructor(){
    debugger;
    this.assignLoogedUser();
  }

  assignLoogedUser() {
    const loggedUSer=  sessionStorage.getItem(GlobalConstant.LOGGED_USER_SEESION_KEY);
    if(loggedUSer) {
      this.loggedUserData =  JSON.parse(loggedUSer)
    }
  }

  onLogin(loginObj: any): Observable<LoginUserModel> {
    return this.http.post<LoginUserModel>(environment.API_URL + GlobalConstant.API_METHODS.LOGIN, loginObj);
  }

  createUser(userObj: UserModel) : Observable<LoginUserModel> {
    return this.http.post<LoginUserModel>(environment.API_URL + GlobalConstant.API_METHODS.CREATE_USER, userObj)
  }

  getAllUsers() : Observable<LoginUserModel[]> {
    return this.http.get<LoginUserModel[]>(environment.API_URL + GlobalConstant.API_METHODS.CREATE_USER)
  }

  filterUsers(searchText: string) : Observable<LoginUserModel[]> {
    return this.http.get<LoginUserModel[]>(environment.API_URL + GlobalConstant.API_METHODS.FILTER_USER + searchText)
  }
}
